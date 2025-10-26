"use client";
import useNavigationBack from "@/hooks/useNavigationBack";
import { cn } from "@/lib/utils";
import LeftIcon from "@/public/icons/left-icon";
import { LayoutPropType } from "./type";

const PageLayout = ({
  children,
  title,
  className,
  backHidden,
  onClick,
} : LayoutPropType) => {
  const { goBack, isBack } = useNavigationBack();
  return (
    <div className={cn("w-full px-8 pt-3 pb-4", className)}>
      <div className="relative w-full">
        {!backHidden && (
          <div
            className="absolute cursor-pointer left-0 top-0"
            onClick={() => {
              if (onClick) {
                onClick();
              } else {
                goBack();
              }
            }}
          >
            {isBack && <LeftIcon className="w-7 h-7 " />}
          </div>
        )}

        {title && (
          <p className="w-full text- text-center h-7 font-semibold text-lg">
            {title}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

export default PageLayout;
