"use client";
import Radio from "../radio";
import { twoFactorOptionsProps } from "./type";

const RadioOptions = ({
  twoFactorOptions,
  label,
  onClickHandler,
}: {
  twoFactorOptions: twoFactorOptionsProps[];
  label: string;
  onClickHandler: (value: number | string | null) => void;
}) => {
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const value = e.currentTarget.getAttribute("data-value");
    const radioId = e.currentTarget.getAttribute("data-radio-id");

    if (radioId) {
      const radioInput = document.getElementById(radioId) as HTMLInputElement;
      if (radioInput) {
        radioInput.checked = true;
      }
    }

    if (onClickHandler) {
      onClickHandler(value);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-gray-500/65">{label}</p>

      <div className="py-5 px-4 bg-white rounded-[10px]">
        {twoFactorOptions.map((item: twoFactorOptionsProps, index: number) => {
          return (
            <div
              data-value={item.value}
              data-radio-id={item.id}
              onClick={clickHandler}
              key={item.id}
              className="cursor-pointer"
            >
              <div className="flex justify-between items-center cursor-pointer">
                <div className="flex items-center gap-3">
                  {item.icon}
                  <p className="text-sm text-foreground">{item.label}</p>
                </div>
                <Radio name="twoFactorOption" value={item.value} id={item.id} />
              </div>

              {twoFactorOptions?.length - 1 !== index && (
                <div className="w-full h-[1px] my-4 bg-gray-500/15"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RadioOptions;
