import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';

import { FirestoreDataService } from '../../../../core/services/firestore-data.service';
import {
  formatRecommendedAge,
  formatVaccineDate,
  getRecordBadgeType,
} from '../../../../shared/utils/vaccine-record.util';
import { VaccineStatusBadgeComponent } from '../../../../shared/components/vaccine-status-badge/vaccine-status-badge.component';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-vaccine-details',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    RouterLink,
    VaccineStatusBadgeComponent,
    SvgIconComponent,
  ],
  templateUrl: './vaccine-details.component.html',
  styleUrls: ['./vaccine-details.component.scss'],
})
export class VaccineDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly firestoreData = inject(FirestoreDataService);

  readonly vaccineDetails$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const childId = params.get('childId') ?? '';
      const vaccineId = params.get('vaccineId') ?? '';

      return combineLatest([
        this.firestoreData.getChildById(childId),
        this.firestoreData.getVaccineById(vaccineId),
        this.firestoreData.getChildVaccineRecord(childId, vaccineId),
      ]).pipe(
        map(([child, vaccine, record]) => ({
          childId,
          child,
          vaccine,
          record,
        }))
      );
    })
  );

  formatRecommendedAge = formatRecommendedAge;
  formatVaccineDate = formatVaccineDate;
  getRecordBadgeType = getRecordBadgeType;
}
