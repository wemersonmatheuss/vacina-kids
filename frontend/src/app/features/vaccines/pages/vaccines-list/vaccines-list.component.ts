import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { map, Subject } from 'rxjs';

import { FirestoreDataService } from '../../../../core/services/firestore-data.service';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';
import { SkeletonLoaderComponent } from '../../../../shared/components/skeleton-loader/skeleton-loader.component';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { createReloadableLoadState } from '../../../../shared/utils/load-state.util';
import { formatRecommendedAge } from '../../../../shared/utils/vaccine-record.util';

@Component({
  selector: 'app-vaccines-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    EmptyStateComponent,
    ErrorStateComponent,
    SkeletonLoaderComponent,
  ],
  templateUrl: './vaccines-list.component.html',
  styleUrls: ['./vaccines-list.component.scss'],
})
export class VaccinesListComponent {
  private readonly firestoreData = inject(FirestoreDataService);
  private readonly reload$ = new Subject<void>();

  readonly vaccinesState$ = createReloadableLoadState(
    this.reload$,
    () =>
      this.firestoreData.getVaccines().pipe(
        map((vaccines) =>
          [...vaccines].sort(
            (left, right) =>
              left.recommendedAgeInMonths - right.recommendedAgeInMonths
          )
        )
      ),
    'Não foi possível carregar as vacinas.'
  );

  formatRecommendedAge = formatRecommendedAge;

  retryLoad(): void {
    this.reload$.next();
  }
}
