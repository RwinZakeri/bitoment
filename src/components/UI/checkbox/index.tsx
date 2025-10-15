import { cn } from "@/lib/utils";
import { CheckboxProps } from "./type";

const Checkbox = ({
  label,
  className,
  size = "md",
  variant = "default",
  checked,
  onChange,
  ...props
}: CheckboxProps) => {
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "w-4 h-4";
      case "lg":
        return "w-6 h-6";
      default:
        return "w-5 h-5";
    }
  };

  const getCheckmarkSize = () => {
    switch (size) {
      case "sm":
        return "w-2.5 h-2.5";
      case "lg":
        return "w-4 h-4";
      default:
        return "w-3 h-3";
    }
  };

  const getVariantStyles = () => {
    const baseStyles = `${getSizeStyles()} rounded-sm border-3 border-black bg-transparent flex items-center justify-center transition-all duration-200 cursor-pointer`;

    if (variant === "outline") {
      return cn(baseStyles, "border-gray-300 hover:border-gray-400");
    }

    return cn(baseStyles, "hover:border-gray-600");
  };

  const CheckmarkIcon = () => (
    <svg
      className={cn(getCheckmarkSize(), "text-black")}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );

  return (
    <label className={cn("flex items-center gap-3 cursor-pointer", className)}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
          {...props}
        />
        <div className={getVariantStyles()}>{checked && <CheckmarkIcon />}</div>
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-700 select-none">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
