import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, startWith, Subject, switchMap } from 'rxjs';

import { FirestoreDataService } from '../../../../core/services/firestore-data.service';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';
import { SkeletonLoaderComponent } from '../../../../shared/components/skeleton-loader/skeleton-loader.component';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { isCampaignActive } from '../../../../shared/utils/campaign.util';
import { toLoadState } from '../../../../shared/utils/load-state.util';

@Component({
  selector: 'app-campaign-details',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    RouterLink,
    EmptyStateComponent,
    ErrorStateComponent,
    SkeletonLoaderComponent,
    SvgIconComponent,
  ],
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss'],
})
export class CampaignDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly firestoreData = inject(FirestoreDataService);
  private readonly reload$ = new Subject<void>();

  readonly campaignState$ = combineLatest([
    this.route.paramMap,
    this.reload$.pipe(startWith(undefined)),
  ]).pipe(
    switchMap(([params]) => {
      const id = params.get('id') ?? '';
      return toLoadState(
        this.firestoreData.getCampaignById(id),
        'Não foi possível carregar os detalhes da campanha.'
      );
    })
  );

  isActive = isCampaignActive;

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }

  retryLoad(): void {
    this.reload$.next();
  }
}
