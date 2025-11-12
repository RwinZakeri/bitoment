import EyeIcon from "@/public/icons/EyeIcon";
import EyeOffIcon from "@/public/icons/EyeOffIcon";
import React, { useState } from "react";
import { InputProps } from "./type";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      type = "text",
      icon,
      className,
      containerClassName,
      error,
      showPasswordToggle = false,
      size,
      ...props
    },
    ref
  ) => {
    // Size prop is kept for API compatibility but not currently used in styling
    void size;
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordField = type === "password";
    const inputType =
      isPasswordField && showPasswordToggle && showPassword ? "text" : type;
    const inputId =
      id || (label ? `${String(label).replace(/\s+/g, "-")}-input` : undefined);
    return (
      <div>
        <label
          htmlFor={inputId}
          className={`flex flex-col gap-1 border-b border-gray-300 pb-2.5 relative ${
            containerClassName || ""
          }`}
        >
          {label && <span className="text-sm font-semibold">{label}</span>}
          <input
            id={inputId}
            ref={ref}
            type={inputType}
            className={`border-none placeholder:text-gray-500 focus:outline-none ${
              className || ""
            }`}
            {...props}
          />
          {showPasswordToggle && isPasswordField ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 rtl:left-0 rtl:right-auto bottom-2 w-7 h-7 bg-gray-200 flex items-center justify-center cursor-pointer"
            >
              {showPassword ? (
                <EyeOffIcon className="size-6" />
              ) : (
                <EyeIcon className="size-6" />
              )}
            </button>
          ) : (
            icon && (
              <div className="absolute right-0 rtl:left-0 rtl:right-auto bottom-2 w-7 h-7 bg-gray-200">
                {icon}
              </div>
            )
          )}
        </label>
        {error && (
          <span className="text-red-500 text-sm mt-1 block">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
