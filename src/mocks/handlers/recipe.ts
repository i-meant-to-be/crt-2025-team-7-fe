import { http, HttpResponse } from 'msw';
import { ApiUrl } from '../../apis/endpoints';
import { Recipe } from '../../types/types';

export const recipeHandler = [
  http.get(ApiUrl.recipe.list, ({}) => {
    const tempItems = Array.from(
      { length: 4 },
      (_, i) =>
        ({
          id: i + 1,
          name: `이름 ${i + 1}`,
          description: '설명',
          temperature: 1,
          grind_size: 1,
          bean_weight: 1,
          is_shared: true,
        }) as Recipe,
    );

    return HttpResponse.json(tempItems);
  }),
];
