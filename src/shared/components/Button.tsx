interface ButtonProps {
  text: string;
  className?: string | undefined;
}

export const Button = ({ text, className }: ButtonProps) => {
  return (
    <button
      className={`font-semibold h-[39px] w-[400px] bg-primary rounded ${className}`}
    >
      {text}
    </button>
  );
};
