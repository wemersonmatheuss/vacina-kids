import { VaccineRecord } from './vaccine-record.interface';
import { Vaccine } from './vaccine.interface';

export interface VaccineRecordWithVaccine extends VaccineRecord {
  vaccine: Vaccine;
}
