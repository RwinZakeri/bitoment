"use client";
import { cn } from "@/lib/utils";
import LeftIcon from "@/public/icons/left-icon";
import { useState } from "react";
import { AutoCompletePropsType } from "./type";

const AutoComplete = ({
  label,
  list,
  onClick,
  zIndex = 50,
  className,
  icon,
  value: controlledValue,
  onChange,
}: AutoCompletePropsType) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [internalValue, setInternalValue] = useState<string>("");

  const type = controlledValue !== undefined ? controlledValue : internalValue;

  const setType = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const eventHandler = (item: string) => {
    setType(item);
    setOpen(false);
    onClick(item);
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 transition-opacity duration-300"
          style={{ zIndex: zIndex - 10 }}
          onClick={() => {
            setOpen(false);
          }}
        ></div>
      )}
      <div className="flex w-full flex-col gap-1 relative" style={{ zIndex }}>
        {label && (
          <label className="block">
            <p>{label}</p>
          </label>
        )}
        <div className={`${cn(className, "relative flex items-center")} `}>
          {icon && (
            <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
              {icon}
            </div>
          )}

          <input
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className="bg-white rounded-xl h-[60px] px-4 w-full outline-0 relative"
            style={{ zIndex: zIndex + 1 }}
            placeholder="TRC20"
            type="text"
          />

          <div
            className="absolute top-5 bg-white right-4"
            style={{ zIndex: zIndex + 3 }}
          >
            <LeftIcon className={`${isOpen ? "rotate-90" : "-rotate-90"}`} />
          </div>

          {isOpen && (
            <div
              className="w-full flex flex-col gap-1 bg-white rounded-lg py-2 px-1 absolute top-full left-0 shadow-lg border border-gray-200"
              style={{ zIndex: zIndex + 2 }}
            >
              {!type.length ? (
                list.length > 0 ? (
                  list.map((item) => {
                    return (
                      <div
                        key={item}
                        onClick={(e) => {
                          e.stopPropagation();
                          eventHandler(item);
                        }}
                        className="rounded-sm px-1 py-1 hover:bg-gray-250"
                      >
                        <p>{item}</p>
                      </div>
                    );
                  })
                ) : (
                  <div className="rounded-sm px-1 py-1 text-gray-500">
                    <p>No items exist</p>
                  </div>
                )
              ) : (
                (() => {
                  const filteredList = list.filter((item) =>
                    item.toLowerCase().includes(type.toLowerCase())
                  );
                  return filteredList.length > 0 ? (
                    filteredList.map((item) => (
                      <div
                        key={item}
                        onClick={(e) => {
                          e.stopPropagation();
                          eventHandler(item);
                        }}
                        className="rounded-sm px-1 py-1 hover:bg-gray-250"
                      >
                        <p>{item}</p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-sm px-1 py-1 text-gray-500">
                      <p>No items exist</p>
                    </div>
                  );
                })()
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AutoComplete;
