import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { combineLatest, map } from 'rxjs';

import { FirestoreDataService } from '../../../../core/services/firestore-data.service';
import { FamilySummaryComponent } from '../../../../shared/components/family-summary/family-summary.component';
import { CampaignCardComponent } from '../../../../shared/components/campaign-card/campaign-card.component';
import { FeaturedCampaignBannerComponent } from '../../../../shared/components/featured-campaign-banner/featured-campaign-banner.component';
import { ChildStatusCardComponent } from '../../../../shared/components/child-status-card/child-status-card.component';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { getFeaturedCampaign } from '../../../../shared/utils/campaign.util';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FamilySummaryComponent,
    CampaignCardComponent,
    FeaturedCampaignBannerComponent,
    ChildStatusCardComponent,
    SvgIconComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private readonly firestoreData = inject(FirestoreDataService);

  readonly dashboardData$ = combineLatest({
    familySummary: this.firestoreData.getFamilySummary(),
    childSummaries: this.firestoreData.getChildSummaries(),
    campaigns: this.firestoreData.getCampaigns(),
    overdueCount: this.firestoreData.getOverdueCount(),
  }).pipe(
    map((data) => ({
      ...data,
      featuredCampaign: getFeaturedCampaign(data.campaigns),
    }))
  );

  readonly colors = {
    primary: '#ABC270',
    secondary: '#FEC868',
    warning: '#FDA769',
    dark: '#473C33',
  };
}
