import { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import Layout from '../../layout/Layout';
import HistoryAddModal from './components/HistoryAddModal';
import useGetHistoryList from '../../apis/hooks/useGetHistoryList';
import Button from '../../components/Button/Button';
import { MdAdd, MdDelete, MdSearch } from 'react-icons/md';
import HistoryCard from './components/HistoryCard';

export default function HistoryListPage() {
  const { openModal, closeModal, ModalWrapper } = useModal();

  const [search, setSearch] = useState('');
  const { data, refetch } = useGetHistoryList();

  if (!data) return null;

  const handleSuccess = () => {
    refetch();
    closeModal();
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col w-full h-full p-8">
          {/* 상단 바 */}
          <div className="flex items-center mb-6 bg-white rounded-lg shadow p-4 gap-4">
            {/* 전체 삭제 버튼 */}
            <Button
              label={
                <span className="flex items-center gap-1">
                  <MdDelete className="text-lg" /> 전체 삭제
                </span>
              }
              onClick={() => {
                /* 전체 삭제 로직 */
              }}
              className="text-xs text-gray-600 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 hover:bg-red-100 hover:text-red-600 transition-colors font-semibold"
            />
            {/* 추가 버튼 */}
            <Button
              label={
                <span className="flex items-center gap-1">
                  <MdAdd className="text-lg" /> 추가
                </span>
              }
              onClick={openModal}
              className="text-xs text-gray-600 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 hover:bg-primary/10 hover:text-primary transition-colors font-semibold"
            />
          </div>
          {/* 카드 목록 */}
          <div className="flex flex-col gap-4 overflow-y-auto">
            {data!.length > 0 ? (
              data!.map((history) => <HistoryCard history={history} />)
            ) : (
              <p>데이터가 없어요...</p>
            )}
          </div>
        </div>
      </Layout>

      <ModalWrapper>
        <HistoryAddModal onSuccess={handleSuccess} />
      </ModalWrapper>
    </>
  );
}
