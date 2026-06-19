import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent {
  @Input({ required: true }) label!: string;
  @Input() icon = '';
  @Input() errorMessage = '';
  @Input() invalid = false;
}
