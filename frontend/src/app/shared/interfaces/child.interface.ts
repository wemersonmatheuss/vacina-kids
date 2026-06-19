export interface Child {
    id: string;
    name: string;
    birthDate: Date;
    gender: 'male' | 'female';
    photoUrl?: string;
  }