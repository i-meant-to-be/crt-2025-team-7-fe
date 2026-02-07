import { Recipe, RecipeSteps } from '../../types/types';

export interface PostRecipeRequestType extends Exclude<Recipe, 'id'> {
  steps: RecipeSteps[];
}
