import { Campaign } from '../../shared/interfaces/campaign.interface';

export const CAMPAIGNS_MOCK: Campaign[] = [
  {
    id: '1',
    title: 'Campanha Nacional de Influenza',
    description:
      'Campanha encerrada de vacinação para crianças entre 6 meses e 5 anos, com foco na prevenção de complicações respiratórias.',
    startDate: new Date('2024-04-01'),
    endDate: new Date('2024-08-31'),
    targetAudience: '6 meses a 5 anos',
    featured: false,
  },
  {
    id: '2',
    title: 'Campanha de Multivacinação 2026',
    description:
      'Atualização da caderneta vacinal para crianças e adolescentes em atraso com o calendário.',
    startDate: new Date('2026-01-01'),
    endDate: new Date('2099-12-31'),
    targetAudience: '0 a 15 anos',
    featured: true,
  },
];
