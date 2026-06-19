import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvgIconComponent } from '../../../shared/components/svg-icon/svg-icon.component';
import { UserMenuComponent } from '../../../shared/components/user-menu/user-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, UserMenuComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
}
