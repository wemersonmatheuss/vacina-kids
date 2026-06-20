import { VaccineStatus } from '../enums/vaccine-status.enum';
import { VaccineStatusBadgeType } from '../enums/vaccine-status-badge.enum';
import { VaccineRecordWithVaccine } from '../interfaces/vaccine-record-with-vaccine.interface';

export function formatVaccineDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatRecommendedAge(months: number): string {
  if (months === 0) {
    return 'Ao nascer';
  }

  if (months < 12) {
    return `${months} ${months === 1 ? 'mês' : 'meses'}`;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) {
    return years === 1 ? '1 ano' : `${years} anos`;
  }

  const yearLabel = years === 1 ? '1 ano' : `${years} anos`;
  const monthLabel =
    remainingMonths === 1 ? '1 mês' : `${remainingMonths} meses`;

  return `${yearLabel} e ${monthLabel}`;
}

export function getRecordBadgeType(
  status: VaccineStatus
): VaccineStatusBadgeType {
  switch (status) {
    case VaccineStatus.OVERDUE:
      return VaccineStatusBadgeType.OVERDUE;
    case VaccineStatus.PENDING:
      return VaccineStatusBadgeType.PENDING;
    default:
      return VaccineStatusBadgeType.OK;
  }
}

export function getAppliedVaccineRecords(
  records: VaccineRecordWithVaccine[]
): VaccineRecordWithVaccine[] {
  return records
    .filter(
      (record) =>
        record.status === VaccineStatus.COMPLETED && record.appliedDate
    )
    .sort(
      (left, right) =>
        left.appliedDate!.getTime() - right.appliedDate!.getTime()
    );
}

export function getOverdueVaccineRecords(
  records: VaccineRecordWithVaccine[]
): VaccineRecordWithVaccine[] {
  return records
    .filter((record) => record.status === VaccineStatus.OVERDUE)
    .sort((left, right) => left.dueDate.getTime() - right.dueDate.getTime());
}

export function getFutureVaccineRecords(
  records: VaccineRecordWithVaccine[]
): VaccineRecordWithVaccine[] {
  return records
    .filter((record) => record.status === VaccineStatus.PENDING)
    .sort((left, right) => left.dueDate.getTime() - right.dueDate.getTime());
}
