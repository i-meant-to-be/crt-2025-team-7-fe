import Layout from '../../layout/Layout';
import Button from '../../components/Button/Button';
import { MdDelete, MdAdd, MdSearch } from 'react-icons/md';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import RecipeAddModal from './components/RecipeAddModal';
import useGetRecipeList from '../../apis/hooks/useGetRecipeList';

export default function RecipeListPage() {
  const [search, setSearch] = useState('');
  const { openModal, closeModal, ModalWrapper } = useModal();
  const { data, refetch } = useGetRecipeList();
  const navigate = useNavigate();

  const handleSuccess = () => {
    closeModal();
    refetch();
  };

  if (!data) return null;

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
          {data!.length > 0 ? (
            <div className="flex flex-col gap-4 overflow-y-auto">
              {data!.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded shadow p-4 border border-gray-200 flex flex-row items-center justify-between cursor-pointer hover:bg-primary/5 transition-colors"
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                >
                  {/* 좌측: 제목/설명 */}
                  <div>
                    <div className="font-bold text-lg mb-2">레시피</div>
                    <div className="text-sm text-gray-600">
                      {recipe.description}
                    </div>
                  </div>
                  {/* 우측 중앙: 정보 */}
                  <div className="flex flex-row items-end justify-center text-xs text-gray-500 min-w-[120px] gap-2">
                    <div>{recipe.temperature}°C</div>
                    <div>{recipe.grind_size}클릭</div>
                    <div>{recipe.bean_weight}g</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 overflow-y-auto">
              데이터가 없어요...
            </div>
          )}
        </div>
      </Layout>

      <ModalWrapper>
        <RecipeAddModal onSuccess={handleSuccess} />
      </ModalWrapper>
    </>
  );
}
