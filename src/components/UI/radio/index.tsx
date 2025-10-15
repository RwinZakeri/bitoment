import { cn } from "@/lib/utils";
import React from "react";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  variant?: "default" | "turquoise";
}

const Radio: React.FC<RadioProps> = ({
  label,
  className,
  variant = "turquoise",
  ...props
}) => {
  const radioId = React.useId();

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <input type="radio" id={radioId} className="sr-only" {...props} />
        <label
          htmlFor={radioId}
          className={cn(
            "relative flex items-center justify-center cursor-pointer",
            "w-5 h-5 rounded-full border-2 transition-all duration-200",
            "hover:scale-105 active:scale-95",
            variant === "turquoise" && [
              "border-[#00e4cc] bg-white",
              "peer-checked:border-[#00e4cc] peer-checked:bg-white",
              "peer-focus:ring-2 peer-focus:ring-[#00e4cc]/20",
            ],
            variant === "default" && [
              "border-gray-300 bg-white",
              "peer-checked:border-blue-500 peer-checked:bg-blue-500",
              "peer-focus:ring-2 peer-focus:ring-blue-500/20",
            ]
          )}
        >
          {/* Outer ring */}
          <div
            className={cn(
              "absolute w-4 h-4 rounded-full border-2 transition-all duration-200",
              variant === "turquoise" && [
                "border-[#00e4cc] bg-transparent",
                "peer-checked:border-[#00e4cc] peer-checked:bg-transparent",
              ],
              variant === "default" && [
                "border-gray-300 bg-transparent",
                "peer-checked:border-blue-500 peer-checked:bg-blue-500",
              ]
            )}
          />
          {/* Inner dot */}
          <div
            className={cn(
              "absolute w-2 h-2 rounded-full transition-all duration-200",
              "scale-0 opacity-0",
              variant === "turquoise" && [
                "bg-red-500",
                "peer-checked:scale-100 peer-checked:opacity-100",
              ],
              variant === "default" && [
                "bg-white",
                "peer-checked:scale-100 peer-checked:opacity-100",
              ]
            )}
          />
        </label>
      </div>
      {label && (
        <label
          htmlFor={radioId}
          className="text-sm text-gray-700 cursor-pointer select-none"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Radio;
