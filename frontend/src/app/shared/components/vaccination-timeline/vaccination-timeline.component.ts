import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { VaccineRecordWithVaccine } from '../../interfaces/vaccine-record-with-vaccine.interface';
import {
  formatVaccineDate,
  getAppliedVaccineRecords,
} from '../../utils/vaccine-record.util';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-vaccination-timeline',
  standalone: true,
  imports: [CommonModule, RouterLink, SvgIconComponent],
  templateUrl: './vaccination-timeline.component.html',
  styleUrls: ['./vaccination-timeline.component.scss'],
})
export class VaccinationTimelineComponent {
  @Input({ required: true }) childId!: string;
  @Input({ required: true }) records!: VaccineRecordWithVaccine[];

  formatVaccineDate = formatVaccineDate;

  get appliedRecords(): VaccineRecordWithVaccine[] {
    return getAppliedVaccineRecords(this.records);
  }
}
