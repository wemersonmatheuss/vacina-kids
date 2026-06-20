import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilySummary } from '../../interfaces/family-summary.interface';
import { SummaryCardComponent } from '../summary-card/summary-card.component';

@Component({
  selector: 'app-family-summary',
  standalone: true,
  imports: [CommonModule, SummaryCardComponent],
  templateUrl: './family-summary.component.html',
  styleUrls: ['./family-summary.component.scss'],
})
export class FamilySummaryComponent {
  @Input({ required: true }) summary!: FamilySummary;

  readonly colors = {
    primary: '#ABC270',
    secondary: '#FEC868',
    warning: '#FDA769',
  };
}
