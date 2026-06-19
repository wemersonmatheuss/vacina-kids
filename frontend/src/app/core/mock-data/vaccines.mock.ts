import { Vaccine } from '../../shared/interfaces/vaccine.interface';

export const VACCINES_MOCK: Vaccine[] = [
  {
    id: '1',
    name: 'BCG',
    description: 'Proteção contra formas graves de tuberculose.',
    recommendedAgeInMonths: 0,
  },
  {
    id: '2',
    name: 'Hepatite B',
    description: 'Proteção contra hepatite B.',
    recommendedAgeInMonths: 0,
  },
  {
    id: '3',
    name: 'Tríplice Viral',
    description: 'Proteção contra sarampo, caxumba e rubéola.',
    recommendedAgeInMonths: 12,
  },
];