import { useMutation } from '@tanstack/react-query';
import { postRecipe } from '../apis/recipe';
import { PostRecipeRequestType } from '../requests/PostRecipeRequestType';

export default function usePostRecipe(onSuccess: () => void) {
  return useMutation({
    mutationFn: (params: PostRecipeRequestType) => postRecipe(params),
    onSuccess: () => {
      onSuccess();
    },
  });
}
