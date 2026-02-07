import { useMutation } from '@tanstack/react-query';
import { PostHistoryRequestType } from '../requests/PostHistoryRequestType';
import { postHistory } from '../apis/history';

export default function usePostHistory(onSuccess: () => void) {
  return useMutation({
    mutationFn: (params: PostHistoryRequestType) => postHistory(params),
    onSuccess: () => {
      onSuccess();
    },
  });
}
