import { useParams } from 'react-router-dom';
import Layout from '../../layout/Layout';

const sampleRecipes = [
  { id: 1, title: '브루 레시피 1', description: '설명 1', temperature: '92', grindSize: '12', amount: '20', steps: '1. 물을 끓입니다.\n2. 원두를 분쇄합니다.\n3. 원두를 필터에 넣고 물을 천천히 부어줍니다.' },
  { id: 2, title: '브루 레시피 2', description: '설명 2', temperature: '90', grindSize: '18', amount: '18', steps: '1. 물을 끓입니다.\n2. 원두를 분쇄합니다.\n3. 원두를 필터에 넣고 물을 천천히 부어줍니다.' },
  { id: 3, title: '브루 레시피 3', description: '설명 3', temperature: '94', grindSize: '15', amount: '22', steps: '1. 물을 끓입니다.\n2. 원두를 분쇄합니다.\n3. 원두를 필터에 넣고 물을 천천히 부어줍니다.' },
  { id: 4, title: '브루 레시피 4', description: '설명 4', temperature: '91', grindSize: '10', amount: '19', steps: '1. 물을 끓입니다.\n2. 원두를 분쇄합니다.\n3. 원두를 필터에 넣고 물을 천천히 부어줍니다.' },
  { id: 5, title: '브루 레시피 5', description: '설명 5', temperature: '93', grindSize: '20', amount: '21', steps: '1. 물을 끓입니다.\n2. 원두를 분쇄합니다.\n3. 원두를 필터에 넣고 물을 천천히 부어줍니다.' },
];

export default function RecipeDetailPage() {
  const { pk } = useParams();
  const recipe = sampleRecipes.find(r => r.id === Number(pk));

  if (!recipe) {
    return (
      <Layout>
        <div className="w-full h-full p-8 flex items-center justify-center bg-gray-50">
          <h1 className="text-2xl font-medium text-gray-400">레시피를 찾을 수 없습니다.</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full h-full p-8 bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-primary mb-3 border-b border-gray-200 pb-2 font-cursive">{recipe.title}</h1>
          <p className="text-gray-600 text-base mb-6 leading-relaxed font-sans">{recipe.description}</p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg shadow text-center border border-gray-200">
              <h2 className="text-sm font-medium text-gray-700 mb-2 font-serif">물 온도</h2>
              <p className="text-lg font-bold text-gray-900 font-cursive">{recipe.temperature}°C</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow text-center border border-gray-200">
              <h2 className="text-sm font-medium text-gray-700 mb-2 font-serif">분쇄도</h2>
              <p className="text-lg font-bold text-gray-900 font-cursive">{recipe.grindSize} 클릭</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow text-center border border-gray-200">
              <h2 className="text-sm font-medium text-gray-700 mb-2 font-serif">원두</h2>
              <p className="text-lg font-bold text-gray-900 font-cursive">{recipe.amount}g</p>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-semibold text-primary mb-3 font-cursive">레시피 단계</h2>
            <p className="text-base text-gray-700 leading-7 whitespace-pre-line font-sans">{recipe.steps}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
