import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  writeBatch,
} from '@angular/fire/firestore';
import { Observable, combineLatest, from, map, of, switchMap } from 'rxjs';

import { AuthService } from './auth.service';
import { VaccineStatus } from '../../shared/enums/vaccine-status.enum';
import { Campaign } from '../../shared/interfaces/campaign.interface';
import { Child } from '../../shared/interfaces/child.interface';
import { ChildFormData } from '../../shared/interfaces/child-form.interface';
import { FamilySummary } from '../../shared/interfaces/family-summary.interface';
import { ChildSummary } from '../../shared/interfaces/child-summary.interface';
import { Vaccine } from '../../shared/interfaces/vaccine.interface';
import { VaccineRecord } from '../../shared/interfaces/vaccine-record.interface';
import { VaccineRecordWithVaccine } from '../../shared/interfaces/vaccine-record-with-vaccine.interface';

@Injectable({
  providedIn: 'root',
})
export class FirestoreDataService {
  private readonly firestore = inject(Firestore);
  private readonly authService = inject(AuthService);

  getChildren(): Observable<Child[]> {
    return this.authService.user$.pipe(
      switchMap((user) => {
        if (!user) {
          return of([]);
        }

        const childrenRef = collection(
          this.firestore,
          `users/${user.uid}/children`
        );

        return collectionData(childrenRef, { idField: 'id' }).pipe(
          map((items) =>
            items.map(
              (item) =>
                ({
                  id: item['id'],
                  name: item['name'],
                  birthDate: new Date(item['birthDate']),
                  gender: item['gender'],
                  photoUrl: item['photoUrl'] ?? undefined,
                }) satisfies Child
            )
          )
        );
      })
    );
  }

  getVaccineRecords(): Observable<VaccineRecord[]> {
    return this.authService.user$.pipe(
      switchMap((user) => {
        if (!user) {
          return of([]);
        }

        const recordsRef = collection(
          this.firestore,
          `users/${user.uid}/vaccineRecords`
        );

        return collectionData(recordsRef, { idField: 'id' }).pipe(
          map((items) =>
            items.map(
              (item) =>
                ({
                  id: item['id'],
                  childId: item['childId'],
                  vaccineId: item['vaccineId'],
                  dueDate: new Date(item['dueDate']),
                  appliedDate: item['appliedDate']
                    ? new Date(item['appliedDate'])
                    : undefined,
                  status: item['status'] as VaccineStatus,
                }) satisfies VaccineRecord
            )
          )
        );
      })
    );
  }

  getVaccines(): Observable<Vaccine[]> {
    const vaccinesRef = collection(this.firestore, 'vaccines');

    return collectionData(vaccinesRef, { idField: 'id' }).pipe(
      map((items) =>
        items.map(
          (item) =>
            ({
              id: item['id'],
              name: item['name'],
              description: item['description'],
              recommendedAgeInMonths: item['recommendedAgeInMonths'],
            }) satisfies Vaccine
        )
      )
    );
  }

  getCampaigns(): Observable<Campaign[]> {
    const campaignsRef = collection(this.firestore, 'campaigns');

    return collectionData(campaignsRef, { idField: 'id' }).pipe(
      map((items) =>
        items.map(
          (item) =>
            ({
              id: item['id'],
              title: item['title'],
              description: item['description'],
              startDate: new Date(item['startDate']),
              endDate: new Date(item['endDate']),
              targetAudience: item['targetAudience'],
            }) satisfies Campaign
        )
      )
    );
  }

  getChildSummaries(): Observable<ChildSummary[]> {
    return this.getChildren().pipe(
      switchMap((children) =>
        this.getVaccineRecords().pipe(
          map((records) =>
            children.map((child) => {
              const childRecords = records.filter(
                (record) => record.childId === child.id
              );

              return {
                child,
                completedVaccines: childRecords.filter(
                  (record) => record.status === VaccineStatus.COMPLETED
                ).length,
                totalVaccines: childRecords.length,
                overdueCount: childRecords.filter(
                  (record) => record.status === VaccineStatus.OVERDUE
                ).length,
                pendingCount: childRecords.filter(
                  (record) => record.status === VaccineStatus.PENDING
                ).length,
              };
            })
          )
        )
      )
    );
  }

  getVaccinationRate(): Observable<number> {
    return this.getVaccineRecords().pipe(
      map((records) => {
        if (records.length === 0) {
          return 0;
        }

        const completed = records.filter(
          (record) => record.status === VaccineStatus.COMPLETED
        ).length;

        return Math.round((completed / records.length) * 100);
      })
    );
  }

  getOverdueCount(): Observable<number> {
    return this.getVaccineRecords().pipe(
      map(
        (records) =>
          records.filter((record) => record.status === VaccineStatus.OVERDUE)
            .length
      )
    );
  }

  getPendingVaccinesCount(): Observable<number> {
    return this.getVaccineRecords().pipe(
      map(
        (records) =>
          records.filter((record) => record.status !== VaccineStatus.COMPLETED)
            .length
      )
    );
  }

  getFamilySummary(): Observable<FamilySummary> {
    return combineLatest({
      childSummaries: this.getChildSummaries(),
      campaigns: this.getCampaigns(),
      pendingVaccines: this.getPendingVaccinesCount(),
    }).pipe(
      map(({ childSummaries, campaigns, pendingVaccines }) => ({
        totalChildren: childSummaries.length,
        pendingVaccines,
        activeCampaigns: campaigns.length,
      }))
    );
  }

  getChildSummaryById(childId: string): Observable<ChildSummary | null> {
    return this.getChildSummaries().pipe(
      map(
        (summaries) =>
          summaries.find((summary) => summary.child.id === childId) ?? null
      )
    );
  }

  getChildById(childId: string): Observable<Child | null> {
    return this.getChildren().pipe(
      map((children) => children.find((child) => child.id === childId) ?? null)
    );
  }

  getVaccineById(vaccineId: string): Observable<Vaccine | null> {
    return this.getVaccines().pipe(
      map((vaccines) => vaccines.find((vaccine) => vaccine.id === vaccineId) ?? null)
    );
  }

  getChildVaccineRecords(childId: string): Observable<VaccineRecordWithVaccine[]> {
    return combineLatest([this.getVaccineRecords(), this.getVaccines()]).pipe(
      map(([records, vaccines]) => {
        const vaccineMap = new Map(vaccines.map((vaccine) => [vaccine.id, vaccine]));

        return records
          .filter((record) => record.childId === childId)
          .map((record) => {
            const vaccine = vaccineMap.get(record.vaccineId);

            if (!vaccine) {
              return null;
            }

            return { ...record, vaccine };
          })
          .filter((record): record is VaccineRecordWithVaccine => record !== null);
      })
    );
  }

  getChildVaccineRecord(
    childId: string,
    vaccineId: string
  ): Observable<VaccineRecord | null> {
    return this.getVaccineRecords().pipe(
      map(
        (records) =>
          records.find(
            (record) =>
              record.childId === childId && record.vaccineId === vaccineId
          ) ?? null
      )
    );
  }

  addChild(data: ChildFormData): Observable<string> {
    return from(this.addChildAsync(data));
  }

  updateChild(childId: string, data: ChildFormData): Observable<void> {
    return from(this.updateChildAsync(childId, data));
  }

  deleteChild(childId: string): Observable<void> {
    return from(this.deleteChildAsync(childId));
  }

  private async addChildAsync(data: ChildFormData): Promise<string> {
    const userId = this.authService.getCurrentUserId();

    if (!userId) {
      throw new Error('Usuário não autenticado.');
    }

    const childrenRef = collection(
      this.firestore,
      `users/${userId}/children`
    );

    const docRef = await addDoc(childrenRef, {
      name: data.name.trim(),
      birthDate: new Date(data.birthDate).toISOString(),
      gender: data.gender,
      photoUrl: null,
    });

    return docRef.id;
  }

  private async updateChildAsync(
    childId: string,
    data: ChildFormData
  ): Promise<void> {
    const userId = this.authService.getCurrentUserId();

    if (!userId) {
      throw new Error('Usuário não autenticado.');
    }

    const childRef = doc(this.firestore, `users/${userId}/children/${childId}`);

    await updateDoc(childRef, {
      name: data.name.trim(),
      birthDate: new Date(data.birthDate).toISOString(),
      gender: data.gender,
    });
  }

  private async deleteChildAsync(childId: string): Promise<void> {
    const userId = this.authService.getCurrentUserId();

    if (!userId) {
      throw new Error('Usuário não autenticado.');
    }

    const batch = writeBatch(this.firestore);
    const recordsRef = collection(
      this.firestore,
      `users/${userId}/vaccineRecords`
    );
    const recordsSnapshot = await getDocs(recordsRef);

    recordsSnapshot.forEach((recordDoc) => {
      if (recordDoc.data()['childId'] === childId) {
        batch.delete(recordDoc.ref);
      }
    });

    batch.delete(
      doc(this.firestore, `users/${userId}/children/${childId}`)
    );

    await batch.commit();
  }
}
