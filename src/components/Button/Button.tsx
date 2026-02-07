interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-row text-[14px] px-[16px] py-[10px] bg-primary-container text-primary rounded-full items-center justify-center"
    >
      {label}
    </button>
  );
}
