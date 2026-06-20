export enum VaccineStatusBadgeType {
  OK = 'ok',
  PENDING = 'pending',
  OVERDUE = 'overdue',
}

export const VACCINE_STATUS_BADGE_LABELS: Record<VaccineStatusBadgeType, string> = {
  [VaccineStatusBadgeType.OK]: 'Em dia',
  [VaccineStatusBadgeType.PENDING]: 'Pendente',
  [VaccineStatusBadgeType.OVERDUE]: 'Atrasada',
};
