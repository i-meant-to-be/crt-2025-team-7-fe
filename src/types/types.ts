export type ProcessType = 'WASHED' | 'NATURAL' | 'ANAEROBIC';

export type MenuType = 'RECIPE' | 'BREWING_HISTORY';

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
  beanData: {
    country: string;
    estate: string;
    variety: string;
    process: ProcessType;
  };
}
