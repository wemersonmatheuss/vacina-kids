import { Child } from './child.interface';

export interface ChildSummary {
  child: Child;
  completedVaccines: number;
  totalVaccines: number;
  overdueCount: number;
  pendingCount: number;
}
