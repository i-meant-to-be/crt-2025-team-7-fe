import { useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';
import usePostRecipe from '../../../apis/hooks/usePostRecipe';
import { PostRecipeRequestType } from '../../../apis/requests/PostRecipeRequestType';
import { RecipeSteps } from '../../../types/types';
import RecipeStepsInput from './RecipeStepsInput';

interface RecipeAddModalProps {
  onSuccess: () => void;
}

export default function RecipeAddModal({ onSuccess }: RecipeAddModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [grindSize, setGrindSize] = useState(0);
  const [beanWeight, setBeanWeight] = useState(0);
  const [isShareAvailable, setIsShareAvailable] = useState(false);
  const [steps, setSteps] = useState<RecipeSteps[]>([]);

  const { mutate, isPending, isError, error } = usePostRecipe(onSuccess);
  const handleAddClick = () => {
    const requestBody: PostRecipeRequestType = {
      name,
      description,
      temperature,
      grind_size: grindSize,
      bean_weight: beanWeight,
      is_shared: isShareAvailable,
      steps,
    };
    mutate(requestBody, {
      onError: (error) => alert(`요청 중 오류 발생: ${error.message}`),
    });
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Modal Header */}
      <h2 className="text-xl font-bold">새 레시피 추가</h2>

      {/* Modal Body */}
      {/* - 레시피 이름 (text) */}
      <div>
        <label className="block mb-2 font-medium">레시피 이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="레시피 이름을 입력하세요"
        />
      </div>

      {/* - 레시피 설명 (text) */}
      <div>
        <label className="block mb-2 font-medium">레시피 설명</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="레시피 설명을 입력하세요"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <div>
            <label className="block mb-2 font-medium">물 온도 (°C)</label>
            <input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="예: 92 °C"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">분쇄도 (g)</label>
            <input
              type="number"
              value={grindSize}
              onChange={(e) => setGrindSize(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="예: 15 클릭"
            />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div>
            <label className="block mb-2 font-medium">원두 무게 (g)</label>
            <input
              type="number"
              value={beanWeight}
              onChange={(e) => setBeanWeight(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="예: 20 g"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">레시피 공유 여부</label>
            <input
              type="checkbox"
              checked={isShareAvailable}
              onChange={(e) => setIsShareAvailable(e.target.checked)}
              className="mr-2"
            />
          </div>
        </div>
      </div>

      {/* 레시피 단계 입력 컴포넌트 */}
      <RecipeStepsInput steps={steps} setSteps={setSteps} />

      {/* 추가 버튼 */}
      <Button
        label="추가"
        onClick={handleAddClick}
        className="bg-primary-container/60 hover:bg-primary-container transition-all duration-300 cursor-pointer text-primary"
      />
    </div>
  );
}
