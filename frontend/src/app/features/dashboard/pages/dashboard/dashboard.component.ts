import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { combineLatest, map, startWith, Subject, switchMap } from 'rxjs';

import { FirestoreDataService } from '../../../../core/services/firestore-data.service';
import { CampaignCardComponent } from '../../../../shared/components/campaign-card/campaign-card.component';
import { ChildStatusCardComponent } from '../../../../shared/components/child-status-card/child-status-card.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';
import { FamilySummaryComponent } from '../../../../shared/components/family-summary/family-summary.component';
import { FeaturedCampaignBannerComponent } from '../../../../shared/components/featured-campaign-banner/featured-campaign-banner.component';
import { SkeletonLoaderComponent } from '../../../../shared/components/skeleton-loader/skeleton-loader.component';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { getFeaturedCampaign } from '../../../../shared/utils/campaign.util';
import { toLoadState } from '../../../../shared/utils/load-state.util';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    CampaignCardComponent,
    ChildStatusCardComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    FamilySummaryComponent,
    FeaturedCampaignBannerComponent,
    SkeletonLoaderComponent,
    SvgIconComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private readonly firestoreData = inject(FirestoreDataService);
  private readonly reload$ = new Subject<void>();

  readonly dashboardState$ = this.reload$.pipe(
    startWith(undefined),
    switchMap(() =>
      toLoadState(
        combineLatest({
          familySummary: this.firestoreData.getFamilySummary(),
          childSummaries: this.firestoreData.getChildSummaries(),
          campaigns: this.firestoreData.getCampaigns(),
          overdueCount: this.firestoreData.getOverdueCount(),
        }).pipe(
          map((data) => ({
            ...data,
            featuredCampaign: getFeaturedCampaign(data.campaigns),
          }))
        ),
        'Não foi possível carregar o início.'
      )
    )
  );

  readonly colors = {
    primary: '#ABC270',
    secondary: '#FEC868',
    warning: '#FDA769',
    dark: '#473C33',
  };

  retryLoad(): void {
    this.reload$.next();
  }
}
