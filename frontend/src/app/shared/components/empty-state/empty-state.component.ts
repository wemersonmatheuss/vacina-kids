import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [RouterLink, SvgIconComponent],
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) title!: string;
  @Input() message = '';
  @Input() actionLabel = '';
  @Input() actionRoute = '';
  @Input() compact = false;
}
