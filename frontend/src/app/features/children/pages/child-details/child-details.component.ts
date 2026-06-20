import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { combineLatest, map, startWith, Subject, switchMap } from 'rxjs';

import { FirestoreDataService } from '../../../../core/services/firestore-data.service';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';
import { SkeletonLoaderComponent } from '../../../../shared/components/skeleton-loader/skeleton-loader.component';
import { VaccinationPendingStatusComponent } from '../../../../shared/components/vaccination-pending-status/vaccination-pending-status.component';
import { VaccinationProgressIndicatorComponent } from '../../../../shared/components/vaccination-progress-indicator/vaccination-progress-indicator.component';
import { VaccinationTimelineComponent } from '../../../../shared/components/vaccination-timeline/vaccination-timeline.component';
import { VaccineStatusBadgeComponent } from '../../../../shared/components/vaccine-status-badge/vaccine-status-badge.component';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import {
  getChildAgeLabel,
  getChildInitials,
  getVaccinationProgressPercent,
  getVaccineStatusBadgeType,
} from '../../../../shared/utils/child-summary.util';
import { toLoadState } from '../../../../shared/utils/load-state.util';

@Component({
  selector: 'app-child-details',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    RouterLink,
    EmptyStateComponent,
    ErrorStateComponent,
    SkeletonLoaderComponent,
    VaccineStatusBadgeComponent,
    VaccinationProgressIndicatorComponent,
    VaccinationTimelineComponent,
    VaccinationPendingStatusComponent,
    SvgIconComponent,
  ],
  templateUrl: './child-details.component.html',
  styleUrls: ['./child-details.component.scss'],
})
export class ChildDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly firestoreData = inject(FirestoreDataService);
  private readonly reload$ = new Subject<void>();

  isDeleting = false;
  deleteErrorMessage = '';

  readonly childDetailsState$ = combineLatest([
    this.route.paramMap,
    this.reload$.pipe(startWith(undefined)),
  ]).pipe(
    switchMap(([params]) => {
      const childId = params.get('id') ?? '';

      return toLoadState(
        combineLatest([
          this.firestoreData.getChildSummaryById(childId),
          this.firestoreData.getChildVaccineRecords(childId),
        ]).pipe(
          map(([summary, vaccineRecords]) => ({
            childId,
            summary,
            vaccineRecords,
          }))
        ),
        'Não foi possível carregar os detalhes da criança.'
      );
    })
  );

  getChildInitials = getChildInitials;
  getChildAgeLabel = getChildAgeLabel;
  getVaccinationProgressPercent = getVaccinationProgressPercent;
  getVaccineStatusBadgeType = getVaccineStatusBadgeType;

  retryLoad(): void {
    this.reload$.next();
  }

  confirmDelete(childId: string, childName: string): void {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir ${childName}? Os registros vacinais desta criança também serão removidos.`
    );

    if (!confirmed) {
      return;
    }

    this.isDeleting = true;
    this.deleteErrorMessage = '';

    this.firestoreData.deleteChild(childId).subscribe({
      next: () => {
        this.isDeleting = false;
        this.router.navigate(['/criancas']);
      },
      error: () => {
        this.isDeleting = false;
        this.deleteErrorMessage =
          'Não foi possível excluir a criança. Tente novamente.';
      },
    });
  }
}
