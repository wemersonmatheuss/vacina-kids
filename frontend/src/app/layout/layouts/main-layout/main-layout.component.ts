import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';

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
    HeaderComponent,
    SvgIconComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements AfterViewInit {
  private readonly router = inject(Router);

  @ViewChild('mainScroll') mainScroll?: ElementRef<HTMLElement>;

  readonly navigationItems: NavigationItem[] = [
    { label: 'Início', icon: 'check-escudo', route: '/inicio' },
    { label: 'Crianças', icon: 'bebe', route: '/criancas' },
    { label: 'Vacinas', icon: 'calendario', route: '/vacinas' },
    { label: 'Campanhas', icon: 'megafone-anuncio', route: '/campanhas' },
  ];

  sidebarCollapsed = false;

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        queueMicrotask(() => this.scrollMainToTop());
      });
  }

  ngAfterViewInit(): void {
    this.scrollMainToTop();
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  private scrollMainToTop(): void {
    this.mainScroll?.nativeElement.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }
}
