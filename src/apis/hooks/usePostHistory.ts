import { useMutation } from '@tanstack/react-query';
import { PostHistoryRequestType } from '../requests/PostHistoryRequestType';
import { postHistory } from '../apis/history';

export default function usePostHistory(onSUccess: () => void) {
  return useMutation({
    mutationFn: async (params: PostHistoryRequestType) => postHistory(params),
    onSuccess: () => {
      onSUccess();
    },
  });
}
