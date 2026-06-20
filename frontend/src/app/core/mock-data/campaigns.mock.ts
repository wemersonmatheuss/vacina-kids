import { Campaign } from '../../shared/interfaces/campaign.interface';

export const CAMPAIGNS_MOCK: Campaign[] = [
  {
    id: '1',
    title: 'Campanha Nacional de Influenza',
    description:
      'Vacinação para crianças entre 6 meses e 5 anos, com foco na prevenção de complicações respiratórias.',
    startDate: new Date('2026-01-01'),
    endDate: new Date('2099-12-31'),
    targetAudience: '6 meses a 5 anos',
    featured: true,
  },
  {
    id: '2',
    title: 'Campanha de Vacinação de Rotina 2024',
    description:
      'Mutirão encerrado de atualização da caderneta vacinal infantil para doses em atraso.',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-11-30'),
    targetAudience: '0 a 15 anos',
    featured: false,
  },
];
