import { useModal } from '../../hooks/useModal';
import Layout from '../../layout/Layout';
import RecipeAddModal from './components/RecipeAddModal';

export default function RecipeListPage() {
  const { openModal, closeModal, ModalWrapper } = useModal();

  const handleAddSuccess = () => {
    closeModal();
  };

  return (
    <>
      <Layout>
        <div>
          <button onClick={() => openModal()}>Add Recipe</button>
        </div>
      </Layout>

      <ModalWrapper>
        <RecipeAddModal onSuccess={handleAddSuccess} />
      </ModalWrapper>
    </>
  );
}
