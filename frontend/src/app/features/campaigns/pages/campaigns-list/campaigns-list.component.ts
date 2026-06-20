import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

import { FirestoreDataService } from '../../../../core/services/firestore-data.service';
import { CampaignCardComponent } from '../../../../shared/components/campaign-card/campaign-card.component';
import { FeaturedCampaignBannerComponent } from '../../../../shared/components/featured-campaign-banner/featured-campaign-banner.component';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import {
  getActiveCampaigns,
  getFeaturedCampaign,
} from '../../../../shared/utils/campaign.util';

@Component({
  selector: 'app-campaigns-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    CampaignCardComponent,
    FeaturedCampaignBannerComponent,
    SvgIconComponent,
  ],
  templateUrl: './campaigns-list.component.html',
  styleUrls: ['./campaigns-list.component.scss'],
})
export class CampaignsListComponent {
  private readonly firestoreData = inject(FirestoreDataService);

  readonly campaigns$ = this.firestoreData.getCampaigns().pipe(
    map((campaigns) =>
      [...campaigns].sort(
        (left, right) =>
          new Date(right.startDate).getTime() - new Date(left.startDate).getTime()
      )
    )
  );

  readonly activeCampaigns$ = this.campaigns$.pipe(
    map((campaigns) => getActiveCampaigns(campaigns))
  );

  readonly featuredCampaign$ = this.campaigns$.pipe(
    map((campaigns) => getFeaturedCampaign(campaigns))
  );
}
