type Props = {
  value: string;
  onClick: () => void;
  disabled?: boolean;
};

export const Button = ({ value, onClick, disabled }: Props) => {
  return (
    // w-full = vai ocupar todo espaço disponível para o button
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full my-3 p-3 rounded bg-gray-700 text-white text-center uppercase font-bold
        hover:bg-gray-600
        border-b-4 border-white/10
      "
    >
      {value}
    </button>
  );
};
