import { InputProps } from "./type";

const Input = ({
  label,
  placeholder,
  type = "text",
  icon,
  ...props
}: InputProps) => {
  return (
    <label className="flex flex-col gap-1 border-b-[1px] border-gray-300 pb-2.5 relative">
      {label && <span className="text-sm font-semibold">{label}</span>}
      <input
        type={type}
        placeholder={placeholder}
        className="border-none placeholder:text-gray-500 focus:outline-none "
        {...props}
      />
      {icon && (
        <div className="absolute right-0  bottom-2 w-7 h-7 bg-white">
          {icon}
        </div>
      )}
    </label>
  );
};

export default Input;
