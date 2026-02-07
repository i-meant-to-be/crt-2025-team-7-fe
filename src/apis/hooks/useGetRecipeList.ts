import { useQuery } from '@tanstack/react-query';
import { getRecipeList } from '../apis/recipe';

export default function useGetRecipeList() {
  return useQuery({
    queryKey: ['recipeList'],
    queryFn: () => getRecipeList(),
  });
}
