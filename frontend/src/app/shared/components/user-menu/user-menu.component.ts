import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { UserMenuItem } from '../../interfaces/user-menu-item.interface';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule, AsyncPipe, SvgIconComponent],
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef);

  readonly profile$ = this.authService.profile$;

  isOpen = false;

  readonly menuItems: UserMenuItem[] = [
    { label: 'Perfil', icon: 'perfil', route: '/perfil' },
    { label: 'Crianças', icon: 'bebe', route: '/criancas' },
    { label: 'Vacinas', icon: 'calendario', route: '/vacinas' },
    { label: 'Campanhas', icon: 'megafone-anuncio', route: '/campanhas' },
    { label: 'Sair', icon: 'sair', action: 'logout' },
  ];

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  closeMenu(): void {
    this.isOpen = false;
  }

  onItemClick(item: UserMenuItem): void {
    if (item.action === 'logout') {
      this.authService.logout().subscribe(() => {
        this.closeMenu();
        this.router.navigate(['/auth/login']);
      });
      return;
    }

    if (item.route) {
      this.closeMenu();
      this.router.navigate([item.route]);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }
}
