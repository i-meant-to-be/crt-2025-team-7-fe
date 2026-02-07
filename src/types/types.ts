export type ProcessType = 'WASHED' | 'NATURAL' | 'ANAEROBIC';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  temperature: number;
  grindSize: number;
  beanWeight: number;
  isShared: boolean;
}

export interface User {
  id: number;
  username: string;
}

export interface BrewingHistory {
  id: string;
  recipeId: string;
  createdAt: Date;
  name: string;
  feedback: string;
  bean_data: {
    country: string;
    estate: string;
    variety: string;
    process: ProcessType;
  };
}
