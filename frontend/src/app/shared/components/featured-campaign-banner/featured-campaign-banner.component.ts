import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Campaign } from '../../interfaces/campaign.interface';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-featured-campaign-banner',
  standalone: true,
  imports: [CommonModule, RouterLink, SvgIconComponent],
  templateUrl: './featured-campaign-banner.component.html',
  styleUrls: ['./featured-campaign-banner.component.scss'],
})
export class FeaturedCampaignBannerComponent {
  @Input({ required: true }) campaign!: Campaign;
  @Input() showLink = true;

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }
}
