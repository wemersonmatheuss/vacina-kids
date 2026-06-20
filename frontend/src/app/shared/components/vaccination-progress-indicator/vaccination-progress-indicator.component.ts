import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vaccination-progress-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vaccination-progress-indicator.component.html',
  styleUrls: ['./vaccination-progress-indicator.component.scss'],
})
export class VaccinationProgressIndicatorComponent {
  @Input({ required: true }) percent!: number;
  @Input() label = 'Cobertura vacinal';
  @Input() showLabel = true;
  @Input() size: 'sm' | 'md' = 'md';
}
