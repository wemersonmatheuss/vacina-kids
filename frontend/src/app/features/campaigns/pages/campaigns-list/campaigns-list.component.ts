import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map, Subject } from 'rxjs';

import { FirestoreDataService } from '../../../../core/services/firestore-data.service';
import { Campaign } from '../../../../shared/interfaces/campaign.interface';
import { CampaignCardComponent } from '../../../../shared/components/campaign-card/campaign-card.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';
import { FeaturedCampaignBannerComponent } from '../../../../shared/components/featured-campaign-banner/featured-campaign-banner.component';
import { SkeletonLoaderComponent } from '../../../../shared/components/skeleton-loader/skeleton-loader.component';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import {
  getActiveCampaigns,
  getFeaturedCampaign,
} from '../../../../shared/utils/campaign.util';
import { createReloadableLoadState } from '../../../../shared/utils/load-state.util';

@Component({
  selector: 'app-campaigns-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    RouterLink,
    CampaignCardComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    FeaturedCampaignBannerComponent,
    SkeletonLoaderComponent,
    SvgIconComponent,
  ],
  templateUrl: './campaigns-list.component.html',
  styleUrls: ['./campaigns-list.component.scss'],
})
export class CampaignsListComponent {
  private readonly firestoreData = inject(FirestoreDataService);
  private readonly reload$ = new Subject<void>();

  readonly campaignsState$ = createReloadableLoadState(
    this.reload$,
    () =>
      this.firestoreData.getCampaigns().pipe(
        map((campaigns) =>
          [...campaigns].sort(
            (left, right) =>
              new Date(right.startDate).getTime() -
              new Date(left.startDate).getTime()
          )
        )
      ),
    'Não foi possível carregar as campanhas.'
  );

  getActiveCampaigns(campaigns: Campaign[]) {
    return getActiveCampaigns(campaigns);
  }

  getFeaturedCampaign(campaigns: Campaign[]) {
    return getFeaturedCampaign(campaigns);
  }

  retryLoad(): void {
    this.reload$.next();
  }
}
