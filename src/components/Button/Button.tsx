interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-[16px] py-[10px] bg-primary-container text-primary rounded-full items-center justify-center"
    >
      <p className="text-[14px]">{label}</p>
    </button>
  );
}
