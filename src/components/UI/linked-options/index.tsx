"use client";
import LeftIcon from "@/public/icons/left-icon";
import React from "react";
import { LinkedOptionsPropsType, optionsType } from "./type";

const LinkedOptions = ({
  label,
  options,
  centerized = false,
  onLinkedOption,
}: LinkedOptionsPropsType) => {
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const dataValue = e.currentTarget.getAttribute("data-value");
    if (dataValue && onLinkedOption) {
      const value = isNaN(Number(dataValue)) ? dataValue : Number(dataValue);
      onLinkedOption(value);
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <p className="text-gray-500/65">{label}</p>
      <div className={`py-5 px-4 bg-white ${!centerized && "rounded-[10px]"}`}>
        {options?.map((item: optionsType, index: number) => {
          return (
            <React.Fragment key={item.title}>
              <div
                data-value={item.value}
                className="flex justify-between cursor-pointer"
                onClick={clickHandler}
              >
                <p className={`w-full text-sm ${centerized && "text-center"}`}>
                  {item.title}
                </p>
                {!centerized && <LeftIcon className="w-7 h-7 rotate-180" />}
              </div>
              {options.length - 1 !== index && (
                <div className="w-full h-[1px] my-4 bg-gray-500/15"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default LinkedOptions;
