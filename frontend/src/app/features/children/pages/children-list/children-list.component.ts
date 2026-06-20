import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { combineLatest, map, startWith } from 'rxjs';

import { FirestoreDataService } from '../../../../core/services/firestore-data.service';
import { ChildStatusCardComponent } from '../../../../shared/components/child-status-card/child-status-card.component';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-children-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    ReactiveFormsModule,
    RouterLink,
    ChildStatusCardComponent,
    FormFieldComponent,
    SvgIconComponent,
  ],
  templateUrl: './children-list.component.html',
  styleUrls: ['./children-list.component.scss'],
})
export class ChildrenListComponent {
  private readonly firestoreData = inject(FirestoreDataService);

  readonly searchControl = new FormControl('', { nonNullable: true });

  readonly allSummaries$ = this.firestoreData.getChildSummaries();

  readonly filteredSummaries$ = combineLatest([
    this.firestoreData.getChildSummaries(),
    this.searchControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([summaries, query]) => {
      const normalizedQuery = query.trim().toLowerCase();

      if (!normalizedQuery) {
        return summaries;
      }

      return summaries.filter((summary) =>
        summary.child.name.toLowerCase().includes(normalizedQuery)
      );
    })
  );
}
