import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../../components/header/header.component';
import { SvgIconComponent } from '../../../shared/components/svg-icon/svg-icon.component';

interface NavigationItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    IonicModule,
    HeaderComponent,
    SvgIconComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  readonly navigationItems: NavigationItem[] = [
    { label: 'Início', icon: 'check-escudo', route: '/inicio' },
    { label: 'Crianças', icon: 'bebe', route: '/criancas' },
    { label: 'Vacinas', icon: 'calendario', route: '/vacinas' },
    { label: 'Campanhas', icon: 'megafone-anuncio', route: '/campanhas' },
  ];

  sidebarCollapsed = false;

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}