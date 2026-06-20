import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

import { FirestoreDataService } from '../../../../core/services/firestore-data.service';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { formatRecommendedAge } from '../../../../shared/utils/vaccine-record.util';

@Component({
  selector: 'app-vaccines-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, SvgIconComponent],
  templateUrl: './vaccines-list.component.html',
  styleUrls: ['./vaccines-list.component.scss'],
})
export class VaccinesListComponent {
  private readonly firestoreData = inject(FirestoreDataService);

  readonly vaccines$ = this.firestoreData.getVaccines().pipe(
    map((vaccines) =>
      [...vaccines].sort(
        (left, right) =>
          left.recommendedAgeInMonths - right.recommendedAgeInMonths
      )
    )
  );

  formatRecommendedAge = formatRecommendedAge;
}

