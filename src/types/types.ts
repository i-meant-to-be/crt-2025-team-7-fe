export type ProcessType = 'WASHED' | 'NATURAL' | 'ANAEROBIC';

export type MenuType = 'RECIPE' | 'BREWING_HISTORY';

export interface BeanData {
  country: string;
  estate: string;
  variety: string;
  process: ProcessType;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  temperature: number;
  grind_size: number;
  bean_weight: number;
  is_shared: boolean;
}

export interface RecipeSteps {
  id: number;
  recipe_id: number;
  time: number;
  amount: number;
  guide: string;
}

export interface RecipeWithSteps extends Recipe {
  steps: RecipeSteps[];
}

export interface User {
  id: number;
  username: string;
}

export interface BrewingHistory {
  id: number;
  recipe_id: number;
  created_at: Date;
  name: string;
  feedback: string;
  bean_data: BeanData;
}
