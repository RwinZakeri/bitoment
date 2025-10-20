"use client";
import LeftIcon from "@/public/icons/left-icon";
import { useEffect, useState } from "react";
import { AutoCompletePropsType } from "./type";

const AutoComplete = ({ label, list, onClick  }: AutoCompletePropsType) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>("");

  useEffect(() => {
    console.log(type);
    console.log(isOpen);
  }, [type, isOpen]);

  const eventHandler = (item: string) => {
    setType(item);
    setOpen(false);
    onClick(item);
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-300"
          onClick={() => {
            setOpen(false);
          }}
        ></div>
      )}
      <div className="flex w-full flex-col z-50 gap-1 relative">
        <label className="block">
          <p>{label}</p>
        </label>
        <div className="relative">
          <input
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className="bg-white rounded-xl h-[60px] px-4 w-full outline-0 relative z-50"
            placeholder="TRC20"
            type="text"
          />

          <div className="bg-white h-12 flex items-center justify-center absolute right-4 top-1">
            <LeftIcon className=" -rotate-90" />
          </div>

          {isOpen && (
            <div className="w-full flex flex-col gap-1 bg-white rounded-lg py-2 px-1 absolute top-full left-0 z-50 shadow-lg border border-gray-200">
              {!type.length
                ? list.map((item) => {
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
                : list
                    .filter((item) =>
                      item.toLowerCase().includes(type.toLowerCase())
                    )
                    .map((item) => (
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
                    ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AutoComplete;
