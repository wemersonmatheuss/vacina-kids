import { VaccineStatusBadgeType } from '../enums/vaccine-status-badge.enum';
import { ChildSummary } from '../interfaces/child-summary.interface';

export function getChildInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export function getChildAgeLabel(birthDate: Date): string {
  const birth = new Date(birthDate);
  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    years--;
  }

  return years === 1 ? '1 ano' : `${years} anos`;
}

export function getVaccinationProgressPercent(summary: ChildSummary): number {
  if (summary.totalVaccines === 0) {
    return 0;
  }

  return Math.round((summary.completedVaccines / summary.totalVaccines) * 100);
}

export function getVaccineStatusBadgeType(
  summary: ChildSummary
): VaccineStatusBadgeType {
  if (summary.overdueCount > 0) {
    return VaccineStatusBadgeType.OVERDUE;
  }

  if (summary.pendingCount > 0) {
    return VaccineStatusBadgeType.PENDING;
  }

  return VaccineStatusBadgeType.OK;
}

export function getPendingVaccinesCount(summaries: ChildSummary[]): number {
  return summaries.reduce(
    (total, summary) => total + summary.pendingCount + summary.overdueCount,
    0
  );
}
