import { cn } from "@/lib/utils";
import { InputProps } from "../input/type";

const sizes = {
  sm: "px-3 py-2",
  md: "px-4 py-4 h-[60px]",
};

const CustomeInput = ({
  label,
  type,
  className,
  placeholder,
  inputType = "fill",
  icon,
  variant = "primary",
  error,
  size = "md",
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
          className={cn(
            inputType === "fill"
              ? "text-sm font-semibold"
              : "text-base font-normal",
            size === "md" ? "" : "text-sm"
          )}
        >
          {label}
        </span>
      )}
      <div className={cn("relative")}>
        <input
          type={type}
          placeholder={placeholder}
          className={cn(
            inputType !== "fill" && sizes[size],
            "border-none w-full placeholder:text-gray-500 focus:outline-none ",
            inputType !== "fill" && "rounded-xl",
            variant === "secondary" ? "bg-gray-200" : "bg-white",
            error && "border-2 border-red-500 focus:border-red-500"
          )}
          {...rest}
        />
        {icon && (
          <div
            className={cn(
              size === "md"
                ? "absolute cursor-pointer right-4 p-2 bg-white top-1/2 transform -translate-y-1/2"
                : "absolute right-2 bg-gray-200 pl-1 top-2.5"
            )}
          >
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
