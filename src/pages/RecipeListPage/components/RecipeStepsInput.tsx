import { Dispatch, SetStateAction, useState } from 'react';
import { RecipeSteps } from '../../../types/types';

interface RecipeStepsInputProps {
  steps: RecipeSteps[];
  setSteps: Dispatch<SetStateAction<RecipeSteps[]>>;
}

export default function RecipeStepsInput({
  steps,
  setSteps,
}: RecipeStepsInputProps) {
  const [time, setTime] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);

  const handleAddStep = () => {
    if (steps.length >= 10) {
      alert('최대 10개까지만 추가할 수 있습니다.');
      return;
    }
    setSteps((prev) => [
      ...prev,
      { id: 0, recipe_id: 0, guide: '', time, amount },
    ]);
    setTime(0);
    setAmount(0);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="block font-medium">레시피 단계 (최대 10개)</label>
      <ul className="border border-gray-300 rounded p-2 max-h-40 overflow-y-auto bg-white">
        {steps.length === 0 && (
          <li className="text-gray-500 text-sm">단계를 추가해주세요.</li>
        )}
        {steps.map((step, index) => (
          <li
            key={index}
            className="flex justify-between items-center text-sm py-1 border-b last:border-none"
          >
            <span>
              {index + 1} | {step.time}초에 물 {step.amount}ml 푸어
            </span>
            <button
              onClick={() =>
                setSteps((prev) => prev.filter((_, i) => i !== index))
              }
              className="text-red-500 hover:underline"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 flex-row items-center">
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="시간 (초)"
        />
        <p>초</p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="물 양 (ml)"
        />
        <p>ml</p>
        <button
          onClick={handleAddStep}
          className="bg-primary-container/50 hover:bg-primary-container transition-all duration-300 text-primary px-4 py-2 rounded-full whitespace-nowrap"
        >
          추가
        </button>
      </div>
    </div>
  );
}
