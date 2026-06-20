import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ChildSummary } from '../../interfaces/child-summary.interface';
import {
  getChildAgeLabel,
  getChildInitials,
  getVaccinationProgressPercent,
  getVaccineStatusBadgeType,
} from '../../utils/child-summary.util';
import { VaccineStatusBadgeComponent } from '../vaccine-status-badge/vaccine-status-badge.component';
import { VaccinationProgressIndicatorComponent } from '../vaccination-progress-indicator/vaccination-progress-indicator.component';

@Component({
  selector: 'app-child-status-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    VaccineStatusBadgeComponent,
    VaccinationProgressIndicatorComponent,
  ],
  templateUrl: './child-status-card.component.html',
  styleUrls: ['./child-status-card.component.scss'],
})
export class ChildStatusCardComponent {
  @Input({ required: true }) summary!: ChildSummary;
  @Input() linkToDetails = true;

  get initials(): string {
    return getChildInitials(this.summary.child.name);
  }

  get ageLabel(): string {
    return getChildAgeLabel(this.summary.child.birthDate);
  }

  get progressPercent(): number {
    return getVaccinationProgressPercent(this.summary);
  }

  get statusType() {
    return getVaccineStatusBadgeType(this.summary);
  }
}
