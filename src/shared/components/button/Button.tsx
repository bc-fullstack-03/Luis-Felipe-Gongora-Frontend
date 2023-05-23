export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | React.ReactNode;
  className?: string | undefined;
  defaultB?: boolean | undefined;
}

export const Button = ({ text, className, defaultB, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`font-semibold h-[39px] ${
        defaultB ? '' : 'bg-primary hover:bg-[#b7e8fa] rounded'
      }  active:scale-95 active:duration-200 ${className}`}
    >
      {text}
    </button>
  );
};
