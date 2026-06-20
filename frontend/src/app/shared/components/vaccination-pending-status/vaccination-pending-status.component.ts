import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { VaccineRecordWithVaccine } from '../../interfaces/vaccine-record-with-vaccine.interface';
import {
  formatVaccineDate,
  getFutureVaccineRecords,
  getOverdueVaccineRecords,
  getRecordBadgeType,
} from '../../utils/vaccine-record.util';
import { VaccineStatusBadgeComponent } from '../vaccine-status-badge/vaccine-status-badge.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-vaccination-pending-status',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    VaccineStatusBadgeComponent,
    SvgIconComponent,
  ],
  templateUrl: './vaccination-pending-status.component.html',
  styleUrls: ['./vaccination-pending-status.component.scss'],
})
export class VaccinationPendingStatusComponent {
  @Input({ required: true }) childId!: string;
  @Input({ required: true }) records!: VaccineRecordWithVaccine[];

  formatVaccineDate = formatVaccineDate;
  getRecordBadgeType = getRecordBadgeType;

  get overdueRecords(): VaccineRecordWithVaccine[] {
    return getOverdueVaccineRecords(this.records);
  }

  get futureRecords(): VaccineRecordWithVaccine[] {
    return getFutureVaccineRecords(this.records);
  }

  get hasPendingItems(): boolean {
    return this.overdueRecords.length > 0 || this.futureRecords.length > 0;
  }
}
