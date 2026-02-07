import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../layout/Layout';
import useGetHistory from '../../apis/hooks/useGetHistory';
import useGetRecipe from '../../apis/hooks/useGetRecipe';
import Button from '../../components/Button/Button';

export default function HistoryDetailPage() {
  const { pk } = useParams();
  const newPk = pk ? parseInt(pk) : 0;
  const { data } = useGetHistory(newPk);
  const navigate = useNavigate();
  const { data: recipeData } = useGetRecipe(data?.recipe_id || 0);

  if (!data) {
    return (
      <Layout>
        <div className="w-full h-full p-8 flex items-center justify-center bg-gray-50">
          <h1 className="text-2xl font-medium text-gray-400">
            브루잉 기록을 찾을 수 없습니다.
          </h1>
        </div>
      </Layout>
    );
  }

  if (!recipeData) return null;

  const handleSeeOriginalRecipe = () => {
    navigate(`/recipe/${data.recipe_id}`);
  };

  return (
    <Layout>
      <div className="w-full h-full p-8 bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-primary mb-3 border-b border-gray-200 pb-2 font-cursive">
            브루잉 기록
          </h1>
          <p className="text-gray-600 text-base mb-6 leading-relaxed font-sans">
            {data.feedback}
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg shadow text-center border border-gray-200">
              <h2 className="text-sm font-medium text-gray-700 mb-2 font-serif">
                물 온도
              </h2>
              <p className="text-lg font-bold text-gray-900 font-cursive">
                {recipeData.temperature} °C
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow text-center border border-gray-200">
              <h2 className="text-sm font-medium text-gray-700 mb-2 font-serif">
                분쇄도
              </h2>
              <p className="text-lg font-bold text-gray-900 font-cursive">
                {recipeData.grind_size} 클릭
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow text-center border border-gray-200">
              <h2 className="text-sm font-medium text-gray-700 mb-2 font-serif">
                원두
              </h2>
              <p className="text-lg font-bold text-gray-900 font-cursive">
                {recipeData.bean_weight} g
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-semibold text-primary mb-3 font-cursive">
              후기
            </h2>
            <p className="text-base text-gray-700 leading-7 whitespace-pre-line font-sans">
              {data.feedback}
            </p>
          </div>
        </div>
        <Button
          onClick={handleSeeOriginalRecipe}
          label="원본 레시피 확인"
          className="mt-4 w-full"
        />
      </div>
    </Layout>
  );
}
