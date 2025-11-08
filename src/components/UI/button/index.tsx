"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { ButtonProps } from "./type";

const VARIANTS = {
  filled:
    "bg-cyan-300 text-black/70 dark:text-foreground/90 hover:bg-cyan-400 focus:ring-cyan-400",
  text: "bg-transparent text-cyan-500 hover:text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 focus:ring-cyan-400",
  secondary:
    "bg-secondary text-black/70 dark:text-foreground/90 hover:bg-secondary/90",
  outline: "bg-transparent border border-white text-white hover:bg-white/10",
  "outline-dark":
    "bg-transparent border border-black/25 dark:border-white/25 text-black/70 dark:text-foreground/90 hover:bg-black/5 dark:hover:bg-white/5",
} as const;

const SIZES = {
  lg: "h-12.5 px-4 text-base",
  md: "h-10 px-3 text-sm",
  sm: "h-8 px-2 text-xs py-5",
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "filled",
      stroke = false,
      icon,
      size = "lg",
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-normal transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variantClass = VARIANTS[variant] ?? VARIANTS.filled;
    const sizeClass = SIZES[size] ?? SIZES.lg;
    const strokeClass = stroke
      ? "border border-cyan-500 hover:border-cyan-600"
      : "";

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantClass,
          sizeClass,
          strokeClass,
          className
        )}
        disabled={isLoading || disabled}
        aria-busy={isLoading}
        {...props}
      >
        <div className="flex items-center justify-center gap-2">
          {icon && <span className="flex items-center">{icon}</span>}
          <span>{children}</span>
        </div>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
