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
        "bg-transparent text-cyan-500 hover:text-cyan-600 hover:bg-cyan-50 focus:ring-cyan-400",
        stroke && "border border-cyan-500 hover:border-cyan-600"
      );
    }

    if (variant === "outline") {
      return cn(
        baseStyles,
        "bg-transparent border-[1px] border-white text-white",
        stroke && "border-cyan-500"
      );
    }

    if (variant === "outline-dark") {
      return cn(
        baseStyles,
        "bg-transparent border-[1px] border-black/25 text-black/70",
        stroke && "border-cyan-500"
      );
    }

    return cn(
      baseStyles,
      "bg-cyan-300 text-black/70",
      stroke && "border-2 border-cyan-500 hover:border-cyan-600"
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
