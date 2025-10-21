import { cn } from "@/lib/utils";
import { InputProps } from "../input/type";

const CustomeInput = ({
  label,
  type,
  className,
  placeholder,
  inputType = "fill",
  icon,
  variant = "primary",
  ...rest
}: InputProps) => {
  const getBackgroundColor = () => {
    if (variant === "secondary") {
      return "bg-gray-200";
    }
    return "bg-white";
  };

  return (
    <label
      className={cn(
        className,
        `flex flex-col ${
          inputType === "fill"
            ? `${getBackgroundColor()} py-4 px-6 rounded-lg gap-4  `
            : "rounded-xl gap-1"
        }`
      )}
    >
      {label && (
        <span
          className={`${
            inputType === "fill"
              ? "text-sm font-semibold"
              : "text-base font-normal"
          }`}
        >
          {label}
        </span>
      )}
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className={`border-none px-4 py-4 h-[60px] placeholder:text-gray-500 rounded-xl focus:outline-none w-full ${variant === "secondary" ? "bg-gray-200" : "bg-white"}`}
          {...rest}
        />
        {icon && (
          <div className="absolute cursor-pointer right-4 p-2 bg-white top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>
    </label>
  );
};

export default CustomeInput;
