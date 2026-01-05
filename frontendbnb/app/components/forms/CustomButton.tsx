interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

const CustomButton = ({ label, onClick, className }: CustomButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={` py-4 text-white px-3 rounded-xl text-center transition cursor-pointer ${
        className || "bg-rose-500 hover:bg-rose-600"
      }`}
    >
      {label}
    </div>
  );
};

export default CustomButton;
