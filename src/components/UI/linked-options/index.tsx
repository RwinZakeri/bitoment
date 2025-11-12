"use client";
import LeftIcon from "@/public/icons/left-icon";
import React from "react";
import { LinkedOptionsPropsType, optionsType } from "./type";

const LinkedOptions = ({
  label,
  options,
  centerized = false,
  onLinkedOption,
  selectedValue,
}: LinkedOptionsPropsType & { selectedValue?: string | number }) => {
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const dataValue = e.currentTarget.getAttribute("data-value");
    if (dataValue && onLinkedOption) {
      const value = isNaN(Number(dataValue)) ? dataValue : Number(dataValue);
      onLinkedOption(value);
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <p className="text-gray-500/65 dark:text-gray-400">{label}</p>
      <div
        className={`py-5 px-4 bg-white ${
          !centerized && "rounded-[10px]"
        }`}
      >
        {options?.map((item: optionsType, index: number) => {
          const isSelected =
            selectedValue !== undefined && item.value === selectedValue;
          return (
            <React.Fragment key={item.title}>
              <div
                data-value={item.value}
                className={`flex justify-between items-center cursor-pointer ${
                  isSelected ? "opacity-100" : ""
                }`}
                onClick={clickHandler}
              >
                <p
                  className={`w-full text-sm dark:text-foreground ${
                    centerized && "text-center"
                  } ${
                    isSelected
                      ? "font-medium text-primary-cyan-500 dark:text-primary-cyan-400"
                      : ""
                  }`}
                >
                  {item.title}
                </p>
                {!centerized && (
                  <LeftIcon className="w-7 h-7 rotate-180 dark:text-gray-400" />
                )}
                {centerized && isSelected && (
                  <span className="text-primary-cyan-500 dark:text-primary-cyan-400">
                    ✓
                  </span>
                )}
              </div>
              {options.length - 1 !== index && (
                <div className="w-full h-px my-4 bg-gray-500/15 dark:bg-gray-300/20"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default LinkedOptions;
