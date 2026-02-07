import Layout from '../../layout/Layout';
import Button from '../../components/Button/Button';
import { MdDelete, MdAdd, MdSearch } from 'react-icons/md';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 예시 카드 데이터
const sampleRecipes = [
  { id: 1, title: '브루 레시피 1', description: '설명 1', temp: '92', grind: '12', amount: '20' },
  { id: 2, title: '브루 레시피 2', description: '설명 2', temp: '90', grind: '18', amount: '18' },
  { id: 3, title: '브루 레시피 3', description: '설명 3', temp: '94', grind: '15', amount: '22' },
  { id: 4, title: '브루 레시피 4', description: '설명 4', temp: '91', grind: '10', amount: '19' },
  { id: 5, title: '브루 레시피 5', description: '설명 5', temp: '93', grind: '20', amount: '21' },
];

export default function RecipeListPage() {
  const [search, setSearch] = useState('');
  const filteredRecipes = sampleRecipes.filter(r => r.title.includes(search));
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col w-full h-full p-8">
        {/* 상단 바 */}
        <div className="flex items-center mb-6 bg-white rounded-lg shadow p-4 gap-4">
          {/* 전체 삭제 버튼 */}
          <Button
            label={<span className="flex items-center gap-1"><MdDelete className="text-lg" /> 전체 삭제</span>}
            onClick={() => {/* 전체 삭제 로직 */}}
            className="text-xs text-gray-600 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 hover:bg-red-100 hover:text-red-600 transition-colors font-semibold"
          />
          {/* 검색창 */}
          <div className="flex items-center flex-1 border border-primary/40 rounded-full bg-gray-50 shadow px-3 py-2 mr-0">
            <MdSearch className="text-gray-400 text-lg mr-2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="카페인이 부족해요..."
              className="flex-1 bg-transparent border-none outline-none text-sm"
            />
          </div>
          {/* 추가 버튼 */}
          <Button
            label={<span className="flex items-center gap-1"><MdAdd className="text-lg" /> 추가</span>}
            onClick={() => {/* 추가 로직 */}}
            className="text-xs text-gray-600 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 hover:bg-primary/10 hover:text-primary transition-colors font-semibold"
          />
        </div>
        {/* 카드 목록 */}
        <div className="flex flex-col gap-4 overflow-y-auto">
          {filteredRecipes.map(recipe => (
            <div
              key={recipe.id}
              className="bg-white rounded shadow p-4 border border-gray-200 flex flex-row items-center justify-between cursor-pointer hover:bg-primary/5 transition-colors"
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            >
              {/* 좌측: 제목/설명 */}
              <div>
                <div className="font-bold text-lg mb-2">{recipe.title}</div>
                <div className="text-sm text-gray-600">{recipe.description}</div>
              </div>
              {/* 우측 중앙: 정보 */}
              <div className="flex flex-row items-end justify-center text-xs text-gray-500 min-w-[120px] gap-2">
                <div>{recipe.temp}°C</div>
                <div>{recipe.grind}클릭</div>
                <div>{recipe.amount}g</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
};
