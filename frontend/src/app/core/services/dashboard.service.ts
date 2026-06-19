import { Injectable } from '@angular/core';

import { CAMPAIGNS_MOCK } from '../mock-data/campaigns.mock';
import { CHILDREN_MOCK } from '../mock-data/children.mock';
import { VACCINE_RECORDS_MOCK } from '../mock-data/vaccine-records.mock';
import { VACCINES_MOCK } from '../mock-data/vaccines.mock';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  getChildren() {
    return CHILDREN_MOCK;
  }

  getVaccines() {
    return VACCINES_MOCK;
  }

  getVaccineRecords() {
    return VACCINE_RECORDS_MOCK;
  }

  getCampaigns() {
    return CAMPAIGNS_MOCK;
  }
}