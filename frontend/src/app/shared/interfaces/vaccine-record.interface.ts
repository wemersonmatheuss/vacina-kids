import { VaccineStatus } from '../enums/vaccine-status.enum';

export interface VaccineRecord {
  id: string;
  childId: string;
  vaccineId: string;
  dueDate: Date;
  appliedDate?: Date;
  status: VaccineStatus;
}