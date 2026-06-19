import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Campaign } from '../../interfaces/campaign.interface';
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

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).format(date);
  }
}
