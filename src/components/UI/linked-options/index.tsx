"use client";
import React from "react";
import { LinkedOptionsPropsType, optionsType } from "./type";
import LeftIcon from "@/public/icons/left-icon";

const LinkedOptions = ({
  label,
  options,
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
      <p className="text-black-600/65">{label}</p>
      <div className="py-5 px-4 bg-white rounded-[10px]">
        {options?.map((item: optionsType, index: number) => {
          return (
            <React.Fragment key={item.title}>
              <div data-value={item.value} className="flex justify-between" onClick={clickHandler}>
                <p>{item.title}</p>
                <LeftIcon className="w-7 h-7 rotate-180" />
              </div>
              {options.length - 1 !== index && (
                <div className="w-full h-[1px] my-4 bg-black-600/15"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default LinkedOptions;
