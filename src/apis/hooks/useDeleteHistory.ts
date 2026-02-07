import { useMutation } from '@tanstack/react-query';
import { deleteHistory } from '../apis/history';

// useDeleteHistory hook placeholder
export default function useDeleteHistory(id: number) {
  return useMutation({
    mutationFn: () => deleteHistory(id),
    onSuccess: () => {
      setTimeout(() => {
        alert('브루잉 기록이 제거되었습니다.');
      }, 300);
    },
    onError: (error) => {
      console.error('Error deleting brewing history:', error);
    },
  });
}
