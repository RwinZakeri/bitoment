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
  error,
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
          className={cn(
            "border-none placeholder:text-gray-500 focus:outline-none w-full",
            inputType !== "fill" && "px-4 rounded-xl h-[60px] py-4",
            variant === "secondary" ? "bg-gray-200" : "bg-white",
            error && "border-2 border-red-500 focus:border-red-500"
          )}
          {...rest}
        />
        {icon && (
          <div className="absolute cursor-pointer right-4 p-2 bg-white top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <span className="text-red-500 text-sm mt-1 font-medium">{error}</span>
      )}
    </label>
  );
};

export default CustomeInput;
