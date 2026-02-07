import clsx from 'clsx';
import { useId } from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string; // Users can pass custom gaps or margins here
}

export default function Checkbox({
  checked,
  onChange,
  className = '',
}: CheckboxProps) {
  const generatedId = useId();

  return (
    <label
      htmlFor={generatedId}
      className={clsx('flex items-center gap-2', className)}
    >
      <input
        id={generatedId}
        type="checkbox"
        className="
          size-[clamp(16px,1.5vw,20px)] 
          rounded-[4px] 
          border-gray-300 
          text-primary
          focus:ring-white
          cursor-pointer
        "
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}
