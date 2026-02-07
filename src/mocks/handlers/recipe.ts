import { http, HttpResponse } from 'msw';
import { ApiUrl } from '../../apis/endpoints';
import { Recipe } from '../../types/types';

export const recipeHandler = [
  http.get(ApiUrl.recipe.list, ({}) => {
    const tempItem: Recipe = {
      id: 1,
      name: '이름',
      description: '설명',
      temperature: 1,
      grind_size: 1,
      bean_weight: 1,
      is_shared: true,
    } as Recipe;

    return HttpResponse.json([tempItem, tempItem, tempItem, tempItem]);
  }),
];
