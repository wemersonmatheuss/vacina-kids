import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';

import { FirestoreDataService } from '../../../../core/services/firestore-data.service';
import { ChildCardComponent } from '../../../../shared/components/child-card/child-card.component';

@Component({
  selector: 'app-children-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, ChildCardComponent],
  templateUrl: './children-list.component.html',
  styleUrls: ['./children-list.component.scss'],
})
export class ChildrenListComponent {
  private readonly firestoreData = inject(FirestoreDataService);

  readonly childSummaries$ = this.firestoreData.getChildSummaries();
}
