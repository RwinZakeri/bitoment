import { cn } from "@/lib/utils";
import { InputProps } from "../input/type";

const CustomeInput = ({
  label,
  type,
  className,
  placeholder,
  props,
}: InputProps) => {
  return (
    <label className={cn(className, "bg-white py-4 px-6 gap-4 rounded-lg flex flex-col")}>
      {label && <span className="text-sm font-semibold">{label}</span>}
      <input
        type={type}
        placeholder={placeholder}
        className="border-none placeholder:text-gray-500 focus:outline-none "
        {...props}
      />
    </label>
  );
};

export default CustomeInput;
