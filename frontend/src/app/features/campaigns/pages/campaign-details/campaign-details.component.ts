import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';

import { FirestoreDataService } from '../../../../core/services/firestore-data.service';
import { Campaign } from '../../../../shared/interfaces/campaign.interface';
import { isCampaignActive } from '../../../../shared/utils/campaign.util';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-campaign-details',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink, SvgIconComponent],
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss'],
})
export class CampaignDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly firestoreData = inject(FirestoreDataService);

  readonly campaign$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const id = params.get('id') ?? '';
      return this.firestoreData.getCampaignById(id);
    })
  );

  isActive = isCampaignActive;

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }
}

