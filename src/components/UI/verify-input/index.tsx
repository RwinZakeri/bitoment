import LeftIcon from "@/public/icons/left-icon";
import React from "react";
import { VerifyInputPropsType } from "./type";

const VerifyInput = React.forwardRef<HTMLInputElement, VerifyInputPropsType>(
  (
    {
      type,
      placeholder,
      label,
      icon = <LeftIcon className="rotate-180" />,
      inputSize = "lg",
      id,
      ...props
    },
    ref
  ) => {
    const inputId =
      id ||
      (label
        ? `${String(label).replace(/\s+/g, "-")}-verify-input`
        : undefined);
    return (
      <div className="flex flex-col gap-4 ">
        {label && (
          <label htmlFor={inputId} className="text-base text-black">
            {label}
          </label>
        )}
        <div
          className={`bg-white rounded-lg w-full flex justify-between ${
            inputSize === "sm" ? "p-3.5" : "px-3 py-5"
          }`}
        >
          <input
            id={inputId}
            ref={ref}
            className="w-full outline-none"
            placeholder={placeholder}
            type={type}
            {...props}
          />
          {icon}
        </div>
      </div>
    );
  }
);

VerifyInput.displayName = "VerifyInput";

export default VerifyInput;
