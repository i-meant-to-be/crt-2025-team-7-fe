interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export default function Button({
  label,
  onClick,
  className = '',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-row text-[14px] px-[16px] py-[10px] rounded-full shadow-md items-center justify-center ${className}`}
    >
      {label}
    </button>
  );
}
