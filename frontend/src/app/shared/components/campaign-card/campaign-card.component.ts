import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Campaign } from '../../interfaces/campaign.interface';
import { isCampaignActive } from '../../utils/campaign.util';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-campaign-card',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss'],
})
export class CampaignCardComponent {
  @Input({ required: true }) campaign!: Campaign;
  private readonly router = inject(Router);

  get isActive(): boolean {
    return isCampaignActive(this.campaign);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).format(date);
  }

  openDetails(): void {
    this.router.navigate(['/campanhas', this.campaign.id]);
  }
}
