import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  writeBatch,
} from '@angular/fire/firestore';
import { Observable, from, map, switchMap } from 'rxjs';

import { CAMPAIGNS_MOCK } from '../mock-data/campaigns.mock';
import { CHILDREN_MOCK } from '../mock-data/children.mock';
import { VACCINE_RECORDS_MOCK } from '../mock-data/vaccine-records.mock';
import { VACCINES_MOCK } from '../mock-data/vaccines.mock';

@Injectable({
  providedIn: 'root',
})
export class SeedService {
  private readonly firestore = inject(Firestore);

  seedUserDataIfNeeded(userId: string): Observable<void> {
    const childrenRef = collection(this.firestore, `users/${userId}/children`);

    return from(getDocs(childrenRef)).pipe(
      switchMap((snapshot) => {
        if (!snapshot.empty) {
          return from(Promise.resolve());
        }

        return from(this.seedUserCollections(userId));
      })
    );
  }

  private async seedUserCollections(userId: string): Promise<void> {
    await this.seedGlobalDataIfNeeded();

    const batch = writeBatch(this.firestore);

    for (const child of CHILDREN_MOCK) {
      const childRef = doc(this.firestore, `users/${userId}/children/${child.id}`);
      batch.set(childRef, {
        name: child.name,
        birthDate: child.birthDate.toISOString(),
        gender: child.gender,
        photoUrl: child.photoUrl ?? null,
      });
    }

    for (const record of VACCINE_RECORDS_MOCK) {
      const recordRef = doc(
        this.firestore,
        `users/${userId}/vaccineRecords/${record.id}`
      );
      batch.set(recordRef, {
        childId: record.childId,
        vaccineId: record.vaccineId,
        dueDate: record.dueDate.toISOString(),
        appliedDate: record.appliedDate?.toISOString() ?? null,
        status: record.status,
      });
    }

    await batch.commit();
  }

  private async seedGlobalDataIfNeeded(): Promise<void> {
    const vaccinesRef = doc(this.firestore, 'meta/vaccines');
    const vaccinesMeta = await getDoc(vaccinesRef);

    if (!vaccinesMeta.exists()) {
      const batch = writeBatch(this.firestore);

      for (const vaccine of VACCINES_MOCK) {
        const vaccineRef = doc(this.firestore, `vaccines/${vaccine.id}`);
        batch.set(vaccineRef, {
          name: vaccine.name,
          description: vaccine.description,
          recommendedAgeInMonths: vaccine.recommendedAgeInMonths,
        });
      }

      for (const campaign of CAMPAIGNS_MOCK) {
        const campaignRef = doc(this.firestore, `campaigns/${campaign.id}`);
        batch.set(campaignRef, {
          title: campaign.title,
          description: campaign.description,
          startDate: campaign.startDate.toISOString(),
          endDate: campaign.endDate.toISOString(),
          targetAudience: campaign.targetAudience,
        });
      }

      batch.set(vaccinesRef, { seeded: true });
      await batch.commit();
    }
  }
}
