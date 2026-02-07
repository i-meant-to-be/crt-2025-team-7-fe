import { ReactNode } from 'react';

interface ButtonProps {
  label: string | ReactNode;
  onClick: () => void;
  className?: string;
}

export default function Button({ label, onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-row text-[14px] px-[16px] py-[10px] bg-primary-container text-primary rounded-full items-center justify-center cursor-pointer hover:bg-primary/80 active:bg-primary/60 transition-colors duration-150 ${className || ''}`}
    >
      {label}
    </button>
  );
}
