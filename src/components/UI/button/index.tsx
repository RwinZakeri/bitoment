import { cn } from "@/lib/utils";
import { ButtonProps } from "./type";

const Button = ({
  children,
  className,
  variant = "filled",
  stroke = false,
  icon,
  size = "md",
  ...props
}: ButtonProps) => {
  const getSizeStyles = () => {
    if (size === "lg") {
      return "h-12.5 px-4 text-base";
    }
    return "h-10 px-3 text-sm";
  };

  const getVariantStyles = () => {
    const baseStyles = `${getSizeStyles()} cursor-pointer font-normal rounded-lg flex items-center justify-center`;

    if (variant === "text") {
      return cn(
        baseStyles,
        "bg-transparent text-green-600 hover:text-green-700 hover:bg-green-50 focus:ring-green-500",
        stroke && "border border-green-600 hover:border-green-700"
      );
    }

    if (variant === "outline") {
      return cn(
        baseStyles,
        "bg-transparent border-[1px] border-white text-white",
        stroke && "border-green-600"
      );
    }

    if (variant === "outline-dark") {
      return cn(
        baseStyles,
        "bg-transparent border-[1px] border-black-50 text-black-500",
        stroke && "border-green-600"
      );
    }

    return cn(
      baseStyles,
      "bg-green-400 text-black-500",
      stroke && "border-2 border-green-600 hover:border-green-700"
    );
  };

  return (
    <button className={cn(getVariantStyles(), className)} {...props}>
      <div className="flex items-center justify-center gap-2">
        {icon && <div className="flex items-center justify-center">{icon}</div>}
        <span className="text-center">{children}</span>
      </div>
    </button>
  );
};

export default Button;
