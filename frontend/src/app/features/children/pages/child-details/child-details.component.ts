import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';

import { FirestoreDataService } from '../../../../core/services/firestore-data.service';
import {
  getChildAgeLabel,
  getChildInitials,
  getVaccinationProgressPercent,
  getVaccineStatusBadgeType,
} from '../../../../shared/utils/child-summary.util';
import { VaccineStatusBadgeComponent } from '../../../../shared/components/vaccine-status-badge/vaccine-status-badge.component';
import { VaccinationProgressIndicatorComponent } from '../../../../shared/components/vaccination-progress-indicator/vaccination-progress-indicator.component';
import { VaccinationTimelineComponent } from '../../../../shared/components/vaccination-timeline/vaccination-timeline.component';
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
    VaccinationTimelineComponent,
    SvgIconComponent,
  ],
  templateUrl: './child-details.component.html',
  styleUrls: ['./child-details.component.scss'],
})
export class ChildDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly firestoreData = inject(FirestoreDataService);

  isDeleting = false;

  readonly childDetails$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const childId = params.get('id') ?? '';

      return combineLatest([
        this.firestoreData.getChildSummaryById(childId),
        this.firestoreData.getChildVaccineRecords(childId),
      ]).pipe(
        map(([summary, vaccineRecords]) => ({
          childId,
          summary,
          vaccineRecords,
        }))
      );
    })
  );

  getChildInitials = getChildInitials;
  getChildAgeLabel = getChildAgeLabel;
  getVaccinationProgressPercent = getVaccinationProgressPercent;
  getVaccineStatusBadgeType = getVaccineStatusBadgeType;

  confirmDelete(childId: string, childName: string): void {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir ${childName}? Os registros vacinais desta criança também serão removidos.`
    );

    if (!confirmed) {
      return;
    }

    this.isDeleting = true;

    this.firestoreData.deleteChild(childId).subscribe({
      next: () => {
        this.isDeleting = false;
        this.router.navigate(['/criancas']);
      },
      error: (error) => {
        this.isDeleting = false;
        console.error('Erro ao excluir criança:', error);
        window.alert('Não foi possível excluir a criança. Tente novamente.');
      },
    });
  }
}
