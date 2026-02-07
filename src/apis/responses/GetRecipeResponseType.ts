import { Recipe, RecipeSteps } from '../../types/types';

export interface GetRecipeResponseType extends Recipe {
  steps: RecipeSteps[];
}
