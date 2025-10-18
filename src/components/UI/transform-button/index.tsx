"use client";
import { TransformButtonProps } from "./type";

const TransformButton = ({
  label,
  icon,
  clickHandler,
}: TransformButtonProps) => {
  const clickEvent = () => {
    clickHandler();
  };
  return (
    <div className="flex flex-col gap-2 items-center">
      <div
        className="w-[70px] h-[70px] flex items-center justify-center rounded-2xl bg-white"
        onClick={clickEvent}
      >
        {icon}
      </div>
      {label}
    </div>
  );
};

export default TransformButton;
