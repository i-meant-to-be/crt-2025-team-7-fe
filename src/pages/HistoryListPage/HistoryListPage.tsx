import { useModal } from '../../hooks/useModal';
import HistoryAddModal from './components/HistoryAddModal';

export default function HistoryListPage() {
  const { openModal, closeModal, ModalWrapper } = useModal();

  return (
    <>
      <div></div>
      <ModalWrapper>
        <HistoryAddModal onSuccess={closeModal} />
      </ModalWrapper>
    </>
  );
}
