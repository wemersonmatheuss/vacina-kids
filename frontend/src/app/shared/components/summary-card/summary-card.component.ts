import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
})
export class SummaryCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: string | number;
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) accentColor!: string;
  @Input() subtitle?: string;
}
