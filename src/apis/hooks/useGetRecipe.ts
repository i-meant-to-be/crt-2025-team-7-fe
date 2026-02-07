import { useQuery } from '@tanstack/react-query';
import { getRecipe } from '../apis/recipe';

export default function useGetRecipe(id: number) {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: async () => getRecipe(id),
  });
}
