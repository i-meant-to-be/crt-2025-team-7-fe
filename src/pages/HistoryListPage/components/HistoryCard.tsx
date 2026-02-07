import { useNavigate } from 'react-router-dom';
import { BrewingHistory } from '../../../types/types';

interface HistoryCardProps {
  history: BrewingHistory;
}

export default function HistoryCard({ history }: HistoryCardProps) {
  const navigate = useNavigate();
  const beanString = `${history.bean_data.country} ${history.bean_data.estate} ${history.bean_data.variety} ${history.bean_data.process}`;

  return (
    <div
      key={history.id}
      className="bg-white rounded shadow p-4 border border-gray-200 flex flex-col items-center justify-between cursor-pointer gap-4 hover:bg-primary/5 transition-colors"
      onClick={() => navigate(`/history/${history.id}`)}
    >
      {/* 좌측: 제목/설명 */}
      <div className="font-bold text-lg mb-2">{history.feedback}</div>
      <div className="text-sm text-gray-600">{beanString}</div>
    </div>
  );
}
