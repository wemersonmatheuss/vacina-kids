import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, map, startWith, Subject, switchMap } from 'rxjs';

import { FirestoreDataService } from '../../../../core/services/firestore-data.service';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';
import { SkeletonLoaderComponent } from '../../../../shared/components/skeleton-loader/skeleton-loader.component';
import { VaccineStatusBadgeComponent } from '../../../../shared/components/vaccine-status-badge/vaccine-status-badge.component';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import {
  formatRecommendedAge,
  formatVaccineDate,
  getRecordBadgeType,
} from '../../../../shared/utils/vaccine-record.util';
import { toLoadState } from '../../../../shared/utils/load-state.util';

@Component({
  selector: 'app-vaccine-details',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    RouterLink,
    EmptyStateComponent,
    ErrorStateComponent,
    SkeletonLoaderComponent,
    VaccineStatusBadgeComponent,
    SvgIconComponent,
  ],
  templateUrl: './vaccine-details.component.html',
  styleUrls: ['./vaccine-details.component.scss'],
})
export class VaccineDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly firestoreData = inject(FirestoreDataService);
  private readonly reload$ = new Subject<void>();

  readonly vaccineDetailsState$ = combineLatest([
    this.route.paramMap,
    this.reload$.pipe(startWith(undefined)),
  ]).pipe(
    switchMap(([params]) => {
      const childId = params.get('childId') ?? '';
      const vaccineId = params.get('vaccineId') ?? '';

      return toLoadState(
        combineLatest([
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
        ),
        'Não foi possível carregar os detalhes da vacina.'
      );
    })
  );

  formatRecommendedAge = formatRecommendedAge;
  formatVaccineDate = formatVaccineDate;
  getRecordBadgeType = getRecordBadgeType;

  retryLoad(): void {
    this.reload$.next();
  }
}
