import { VaccineStatus } from '../../shared/enums/vaccine-status.enum';
import { VaccineRecord } from '../../shared/interfaces/vaccine-record.interface';

export const VACCINE_RECORDS_MOCK: VaccineRecord[] = [
  {
    id: '1',
    childId: '1',
    vaccineId: '1',
    dueDate: new Date('2021-05-12'),
    appliedDate: new Date('2021-05-12'),
    status: VaccineStatus.COMPLETED,
  },
  {
    id: '2',
    childId: '2',
    vaccineId: '3',
    dueDate: new Date('2024-02-10'),
    status: VaccineStatus.OVERDUE,
  },
];