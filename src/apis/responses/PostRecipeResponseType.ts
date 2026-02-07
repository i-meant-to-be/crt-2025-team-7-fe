import { Recipe, RecipeSteps } from '../../types/types';

export interface PostRecipeResponseType extends Exclude<Recipe, 'id'> {
  steps: RecipeSteps[];
}
