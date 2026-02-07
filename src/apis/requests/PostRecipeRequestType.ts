import { Recipe, RecipeSteps } from '../../types/types';

export interface PostRecipeRequestType extends Omit<Recipe, 'id'> {
  steps: Omit<RecipeSteps, 'id' | 'recipe_id'>[];
}
