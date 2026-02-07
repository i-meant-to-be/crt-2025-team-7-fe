import { useMutation } from '@tanstack/react-query';
import { deleteHistory } from '../apis/history';

// useDeleteHistory hook placeholder
export default function useDeleteHistory(id: number) {
  return useMutation({
    mutationFn: async () => await deleteHistory(id),
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
