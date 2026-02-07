import { useQuery } from '@tanstack/react-query';
import { getHistoryList } from '../apis/history';

export default function useGetHistoryList() {
  return useQuery({
    queryKey: ['historyList'],
    queryFn: () => getHistoryList(),
  });
}
