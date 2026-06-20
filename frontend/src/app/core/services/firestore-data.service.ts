import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
} from '@angular/fire/firestore';
import { Observable, combineLatest, map, of, switchMap } from 'rxjs';

import { AuthService } from './auth.service';
import { VaccineStatus } from '../../shared/enums/vaccine-status.enum';
import { Campaign } from '../../shared/interfaces/campaign.interface';
import { Child } from '../../shared/interfaces/child.interface';
import { FamilySummary } from '../../shared/interfaces/family-summary.interface';
import { ChildSummary } from '../../shared/interfaces/child-summary.interface';
import { Vaccine } from '../../shared/interfaces/vaccine.interface';
import { VaccineRecord } from '../../shared/interfaces/vaccine-record.interface';

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
}
