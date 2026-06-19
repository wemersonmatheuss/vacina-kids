import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';

import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, IonContent, SvgIconComponent],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent {
  @Input({ required: true }) visualIcon!: string;
  @Input({ required: true }) visualTitle!: string;
  @Input({ required: true }) visualSubtitle!: string;
}
