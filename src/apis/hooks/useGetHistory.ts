import { useQuery } from '@tanstack/react-query';
import { getHistory } from '../apis/history';

export default function useGetHistory(id: number) {
  return useQuery({
    queryKey: ['history', id],
    queryFn: () => getHistory(id),
  });
}
