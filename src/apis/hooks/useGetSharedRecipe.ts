import { useQuery } from '@tanstack/react-query';
import { getSharedRecipe } from '../apis/recipe';

export default function useGetSharedRecipe(id: number) {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getSharedRecipe(id),
  });
}
