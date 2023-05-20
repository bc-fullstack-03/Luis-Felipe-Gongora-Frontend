export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  text: string;
  className?: string | undefined;
}

export const Button = ({ text, className, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`font-semibold h-[39px] bg-primary rounded ${className}`}
    >
      {text}
    </button>
  );
};
