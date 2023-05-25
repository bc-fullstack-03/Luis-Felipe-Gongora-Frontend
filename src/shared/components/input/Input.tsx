interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string | undefined;
  placeholder: string | undefined;
  icon?: React.ReactNode;
  className?: string | undefined;
  newComment?: boolean;
  errorInput?: boolean;
  infoError?: boolean;
  textError?: string | undefined;
  onChange?: () => void;
}

export const Input = ({
  label,
  placeholder,
  icon,
  className,
  newComment,
  errorInput,
  infoError,
  textError,
  onChange,
  ...rest
}: InputProps) => {
  return (
    <>
      <div className={`flex justify-between ${newComment && 'w-[550px]'}`}>
        <label className={`mb-2 text-gray-100 text-lg`}>{label}</label>
        {infoError && (
          <label className='text-red text-xs flex items-end'>{textError}</label>
        )}
      </div>
      <div className='relative'>
        {icon}
        <input
          {...rest}
          className={`bg-black-600 rounded h-12 ${
            newComment ? 'w-[550px]' : 'w-[400px]'
          } text-secondary placeholder:text-secondary pl-[52px] pr-4 py-3 text-sm focus-within:ring-2 ${
            errorInput ? 'ring-2 ring-red' : 'focus-within:ring-primary'
          } ${className}`}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </>
  );
};
