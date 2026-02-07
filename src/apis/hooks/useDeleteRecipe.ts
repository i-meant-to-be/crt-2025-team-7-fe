import { useMutation } from '@tanstack/react-query';
import { deleteRecipe } from '../apis/recipe';

export default function useDeleteRecipe(id: number) {
  return useMutation({
    mutationFn: () => deleteRecipe(id),
    onSuccess: () => {
      setTimeout(() => {
        alert('레시피가 제거되었습니다.');
      }, 300);
    },
    onError: (error) => {
      console.error('Error deleting recipe:', error);
    },
  });
}
