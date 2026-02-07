import { Recipe, RecipeSteps } from '../../types/types';

export interface GetRecipeListResponseType extends Recipe {
  steps: RecipeSteps[];
}
