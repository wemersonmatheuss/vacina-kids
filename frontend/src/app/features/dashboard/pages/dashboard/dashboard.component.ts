import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { combineLatest } from 'rxjs';

import { FirestoreDataService } from '../../../../core/services/firestore-data.service';

import { SummaryCardComponent } from '../../../../shared/components/summary-card/summary-card.component';
import { CampaignCardComponent } from '../../../../shared/components/campaign-card/campaign-card.component';
import { ChildCardComponent } from '../../../../shared/components/child-card/child-card.component';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    SummaryCardComponent,
    CampaignCardComponent,
    ChildCardComponent,
    SvgIconComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private readonly firestoreData = inject(FirestoreDataService);

  readonly childSummaries$ = this.firestoreData.getChildSummaries();
  readonly campaigns$ = this.firestoreData.getCampaigns();
  readonly vaccinationRate$ = this.firestoreData.getVaccinationRate();
  readonly overdueCount$ = this.firestoreData.getOverdueCount();

  readonly dashboardData$ = combineLatest({
    childSummaries: this.childSummaries$,
    campaigns: this.campaigns$,
    vaccinationRate: this.vaccinationRate$,
    overdueCount: this.overdueCount$,
  });

  readonly colors = {
    primary: '#ABC270',
    secondary: '#FEC868',
    warning: '#FDA769',
    dark: '#473C33',
  };
}
