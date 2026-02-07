import { useReducer, useState } from 'react';
import Button from '../../../components/Button/Button';
import { BeanData, ProcessType, Recipe } from '../../../types/types';
import usePostHistory from '../../../apis/hooks/usePostHistory';
import { PostHistoryRequestType } from '../../../apis/requests/PostHistoryRequestType';
import useGetRecipeList from '../../../apis/hooks/useGetRecipeList';

interface HistoryAddModalProps {
  onSuccess: () => void;
}

interface HistoryState {
  feedback: string;
  country: string;
  estate: string;
  variety: string;
  process: ProcessType;
  recipeId: number;
}

type HistoryAction =
  | { type: 'SET_FIELD'; field: keyof HistoryState; value: string | number }
  | { type: 'RESET' };

const initialState: HistoryState = {
  feedback: '',
  country: '',
  estate: '',
  variety: '',
  process: 'WASHED',
  recipeId: -1,
};

function historyReducer(
  state: HistoryState,
  action: HistoryAction,
): HistoryState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function HistoryAddModal({ onSuccess }: HistoryAddModalProps) {
  const [state, dispatch] = useReducer(historyReducer, initialState);
  const { feedback, country, estate, variety, process, recipeId } = state;

  const { data } = useGetRecipeList();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(data!.items.length / itemsPerPage);

  const currentRecipes = data!.items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const { mutate } = usePostHistory(onSuccess);
  const handleAddClick = () => {
    const beanData: BeanData = {
      country,
      estate,
      variety,
      process,
    };
    const requestBody: PostHistoryRequestType = {
      feedback,
      bean_data: beanData,
      recipe_id: recipeId,
    };

    mutate(requestBody, {
      onError: (error) => alert(`요청 중 오류 발생: ${error.message}`),
    });
  };

  if (!data) {
    return null;
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Modal Header */}
      <h2 className="text-xl font-bold">새 레시피 추가</h2>

      {/* Modal Body */}
      {/* - 원두 정보 (text) */}
      <div>
        <label className="block mb-2 font-medium">레시피 이름</label>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 items-center">
            <p>국가</p>
            <input
              type="text"
              value={country}
              onChange={(e) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'country',
                  value: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="원두의 원산지 국가를 입력하세요"
            />
          </div>

          <div className="flex flex-row gap-4 items-center">
            <p>농장</p>
            <input
              type="text"
              value={estate}
              onChange={(e) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'estate',
                  value: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="원두가 생산된 농장 이름을 입력하세요"
            />
          </div>

          <div className="flex flex-row gap-4 items-center">
            <p>품종</p>
            <input
              type="text"
              value={variety}
              onChange={(e) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'variety',
                  value: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="원두의 품종 이름을 입력하세요"
            />
          </div>

          <div className="flex flex-row gap-4 items-center">
            <p>가공 방식</p>
            <select
              value={process}
              onChange={(e) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'process',
                  value: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="WASHED">워시드</option>
              <option value="NATURAL">내추럴</option>
              <option value="ANAEROBIC">애너로빅 (무산소)</option>
            </select>
          </div>
        </div>
      </div>

      {/* - 피드백 (text) */}
      <div>
        <label className="block mb-2 font-medium">브루잉 후기</label>
        <input
          type="text"
          value={feedback}
          onChange={(e) =>
            dispatch({
              type: 'SET_FIELD',
              field: 'feedback',
              value: e.target.value,
            })
          }
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="맛이 어땠나요? 브루잉 후기를 적어주세요"
        />
      </div>

      {/* 레시피 선택 */}
      <div>
        <label className="block mb-2 font-medium">레시피 선택</label>
        <div className="flex flex-col gap-2">
          {currentRecipes.map((recipe: Recipe) => (
            <label
              key={recipe.id}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
            >
              <input
                type="radio"
                name="recipe"
                value={recipe.id}
                checked={recipeId === recipe.id}
                onChange={() =>
                  dispatch({
                    type: 'SET_FIELD',
                    field: 'recipeId',
                    value: recipe.id,
                  })
                }
                className="accent-primary"
              />
              <span>{recipe.name}</span>
            </label>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-2 text-sm text-gray-600">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="disabled:opacity-30 hover:text-primary font-bold"
            >
              &lt;
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="disabled:opacity-30 hover:text-primary font-bold"
            >
              &gt;
            </button>
          </div>
        )}
      </div>

      {/* 추가 버튼 */}
      <Button
        label="추가"
        onClick={handleAddClick}
        className="bg-primary-container/60 hover:bg-primary-container transition-all duration-300 cursor-pointer text-primary"
      />
    </div>
  );
}
