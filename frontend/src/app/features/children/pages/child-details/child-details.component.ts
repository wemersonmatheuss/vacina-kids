import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';

import { FirestoreDataService } from '../../../../core/services/firestore-data.service';
import {
  getChildAgeLabel,
  getChildInitials,
  getVaccinationProgressPercent,
  getVaccineStatusBadgeType,
} from '../../../../shared/utils/child-summary.util';
import { VaccineStatusBadgeComponent } from '../../../../shared/components/vaccine-status-badge/vaccine-status-badge.component';
import { VaccinationProgressIndicatorComponent } from '../../../../shared/components/vaccination-progress-indicator/vaccination-progress-indicator.component';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-child-details',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    RouterLink,
    VaccineStatusBadgeComponent,
    VaccinationProgressIndicatorComponent,
    SvgIconComponent,
  ],
  templateUrl: './child-details.component.html',
  styleUrls: ['./child-details.component.scss'],
})
export class ChildDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly firestoreData = inject(FirestoreDataService);

  readonly childSummary$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const childId = params.get('id') ?? '';
      return this.firestoreData.getChildSummaryById(childId);
    })
  );

  getChildInitials = getChildInitials;
  getChildAgeLabel = getChildAgeLabel;
  getVaccinationProgressPercent = getVaccinationProgressPercent;
  getVaccineStatusBadgeType = getVaccineStatusBadgeType;
}
