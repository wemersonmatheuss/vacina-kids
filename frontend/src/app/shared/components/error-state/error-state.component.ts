import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './error-state.component.html',
  styleUrls: ['./error-state.component.scss'],
})
export class ErrorStateComponent {
  @Input({ required: true }) message!: string;
  @Input() title = 'Não foi possível carregar';
  @Input() retryLabel = 'Tentar novamente';
  @Input() showRetry = true;
  @Output() retry = new EventEmitter<void>();
}
