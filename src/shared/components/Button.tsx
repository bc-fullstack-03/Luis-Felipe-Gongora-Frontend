interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string | undefined;
}

export const Button = ({ text, className, onSubmit }: ButtonProps) => {
  return (
    <button
      className={`font-semibold h-[39px] bg-primary rounded ${className}`}
    >
      {text}
    </button>
  );
};
