"use client";
import { cn } from "@/lib/utils";
import { TransformButtonProps } from "./type";

const TransformButton = ({
  label,
  icon,
  clickHandler,
  className,
}: TransformButtonProps) => {
  const clickEvent = () => {
    clickHandler();
  };
  return (
    <div className="flex flex-col gap-2 items-center">
      <div
        className={cn(
          "w-[70px] h-[70px] bg-white flex items-center justify-center rounded-2xl " , 
          className
        )}
        onClick={clickEvent}
      >
        {icon}
      </div>
      {label}
    </div>
  );
};

export default TransformButton;
