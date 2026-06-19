import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildSummary } from '../../interfaces/child-summary.interface';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-child-card',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './child-card.component.html',
  styleUrls: ['./child-card.component.scss'],
})
export class ChildCardComponent {
  @Input({ required: true }) summary!: ChildSummary;

  get initials(): string {
    return this.summary.child.name
      .split(' ')
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }

  get ageLabel(): string {
    const birth = new Date(this.summary.child.birthDate);
    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      years--;
    }

    return years === 1 ? '1 ano' : `${years} anos`;
  }

  get progressPercent(): number {
    if (this.summary.totalVaccines === 0) {
      return 0;
    }

    return Math.round(
      (this.summary.completedVaccines / this.summary.totalVaccines) * 100
    );
  }

  get statusLabel(): string {
    if (this.summary.overdueCount > 0) {
      return `${this.summary.overdueCount} pendência(s)`;
    }

    if (this.summary.pendingCount > 0) {
      return `${this.summary.pendingCount} a aplicar`;
    }

    return 'Em dia';
  }

  get statusType(): 'overdue' | 'pending' | 'ok' {
    if (this.summary.overdueCount > 0) {
      return 'overdue';
    }

    if (this.summary.pendingCount > 0) {
      return 'pending';
    }

    return 'ok';
  }
}
