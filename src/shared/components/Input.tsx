interface InputProps {
  label: string | undefined;
  placeholder: string | undefined;
  icon?: React.ReactNode;
  className?: string | undefined;
  inputType?: string;
}

export const Input = ({
  label,
  placeholder,
  icon,
  className,
  inputType,
}: InputProps) => {
  return (
    <>
      <label className={`mb-2 text-gray-100 text-lg`}>{label}</label>
      <div className='relative'>
        {icon}
        <input
          type={inputType}
          className={`bg-black-600 rounded h-12 w-[400px] text-secondary placeholder:text-secondary pl-[52px] pr-4 py-3 text-sm ${className}`}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};
