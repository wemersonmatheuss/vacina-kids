import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { combineLatest, map, startWith, Subject } from 'rxjs';

import { FirestoreDataService } from '../../../../core/services/firestore-data.service';
import { ChildStatusCardComponent } from '../../../../shared/components/child-status-card/child-status-card.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';
import { SkeletonLoaderComponent } from '../../../../shared/components/skeleton-loader/skeleton-loader.component';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { ChildSummary } from '../../../../shared/interfaces/child-summary.interface';
import { LoadState } from '../../../../shared/interfaces/load-state.interface';
import { createReloadableLoadState } from '../../../../shared/utils/load-state.util';

interface ChildrenListViewState {
  status: LoadState<ChildSummary[]>['status'];
  message?: string;
  allSummaries: ChildSummary[];
  filteredSummaries: ChildSummary[];
}

@Component({
  selector: 'app-children-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    ReactiveFormsModule,
    RouterLink,
    ChildStatusCardComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    FormFieldComponent,
    SkeletonLoaderComponent,
    SvgIconComponent,
  ],
  templateUrl: './children-list.component.html',
  styleUrls: ['./children-list.component.scss'],
})
export class ChildrenListComponent {
  private readonly firestoreData = inject(FirestoreDataService);
  private readonly reload$ = new Subject<void>();

  readonly searchControl = new FormControl('', { nonNullable: true });

  readonly viewState$ = combineLatest([
    createReloadableLoadState(
      this.reload$,
      () => this.firestoreData.getChildSummaries(),
      'Não foi possível carregar as crianças.'
    ),
    this.searchControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([state, query]): ChildrenListViewState => {
      if (state.status === 'loading') {
        return {
          status: 'loading',
          allSummaries: [],
          filteredSummaries: [],
        };
      }

      if (state.status === 'error') {
        return {
          status: 'error',
          message: state.message,
          allSummaries: [],
          filteredSummaries: [],
        };
      }

      const normalizedQuery = query.trim().toLowerCase();
      const filteredSummaries = normalizedQuery
        ? state.data.filter((summary) =>
            summary.child.name.toLowerCase().includes(normalizedQuery)
          )
        : state.data;

      return {
        status: 'success',
        allSummaries: state.data,
        filteredSummaries,
      };
    })
  );

  retryLoad(): void {
    this.reload$.next();
  }
}
