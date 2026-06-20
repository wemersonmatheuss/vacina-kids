import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  VaccineStatusBadgeType,
  VACCINE_STATUS_BADGE_LABELS,
} from '../../enums/vaccine-status-badge.enum';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-vaccine-status-badge',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './vaccine-status-badge.component.html',
  styleUrls: ['./vaccine-status-badge.component.scss'],
})
export class VaccineStatusBadgeComponent {
  @Input({ required: true }) status!: VaccineStatusBadgeType;
  @Input() showIcon = true;

  readonly badgeLabels = VACCINE_STATUS_BADGE_LABELS;

  get iconName(): string {
    switch (this.status) {
      case VaccineStatusBadgeType.OVERDUE:
        return 'documento-atencao';
      case VaccineStatusBadgeType.PENDING:
        return 'calendario';
      default:
        return 'check-escudo';
    }
  }

  get iconColor(): string {
    switch (this.status) {
      case VaccineStatusBadgeType.OVERDUE:
        return '#FDA769';
      case VaccineStatusBadgeType.PENDING:
        return '#FEC868';
      default:
        return '#ABC270';
    }
  }
}
