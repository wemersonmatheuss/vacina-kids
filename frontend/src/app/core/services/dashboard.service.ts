import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FirestoreDataService } from './firestore-data.service';
import { ChildSummary } from '../../shared/interfaces/child-summary.interface';
import { Campaign } from '../../shared/interfaces/campaign.interface';
import { Child } from '../../shared/interfaces/child.interface';
import { Vaccine } from '../../shared/interfaces/vaccine.interface';
import { VaccineRecord } from '../../shared/interfaces/vaccine-record.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private readonly firestoreData: FirestoreDataService) {}

  getChildren(): Observable<Child[]> {
    return this.firestoreData.getChildren();
  }

  getVaccines(): Observable<Vaccine[]> {
    return this.firestoreData.getVaccines();
  }

  getVaccineRecords(): Observable<VaccineRecord[]> {
    return this.firestoreData.getVaccineRecords();
  }

  getCampaigns(): Observable<Campaign[]> {
    return this.firestoreData.getCampaigns();
  }

  getChildSummaries(): Observable<ChildSummary[]> {
    return this.firestoreData.getChildSummaries();
  }

  getVaccinationRate(): Observable<number> {
    return this.firestoreData.getVaccinationRate();
  }

  getOverdueCount(): Observable<number> {
    return this.firestoreData.getOverdueCount();
  }
}
