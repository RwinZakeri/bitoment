import React from "react";
import { InputProps } from "./type";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { id, label, type = "text", icon, className, containerClassName, ...props },
    ref
  ) => {
    const inputId =
      id || (label ? `${String(label).replace(/\s+/g, "-")}-input` : undefined);
    return (
      <label
        htmlFor={inputId}
        className={`flex flex-col gap-1 border-b-[1px] border-gray-300 pb-2.5 relative ${
          containerClassName || ""
        }`}
      >
        {label && <span className="text-sm font-semibold">{label}</span>}
        <input
          id={inputId}
          ref={ref}
          type={type}
          className={`border-none placeholder:text-gray-500 focus:outline-none ${
            className || ""
          }`}
          {...props}
        />
        {icon && (
          <div className="absolute right-0 bottom-2 w-7 h-7 bg-white">
            {icon}
          </div>
        )}
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
