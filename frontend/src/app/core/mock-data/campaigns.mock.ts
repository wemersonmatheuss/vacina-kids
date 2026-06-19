import { Campaign } from '../../shared/interfaces/campaign.interface';

export const CAMPAIGNS_MOCK: Campaign[] = [
  {
    id: '1',
    title: 'Campanha Nacional de Influenza',
    description:
      'Vacinação para crianças entre 6 meses e 5 anos.',
    startDate: new Date('2025-06-01'),
    endDate: new Date('2025-07-31'),
    targetAudience: '6 meses a 5 anos',
  },
];
