"use client";
import useNavigationBack from "@/hooks/useNavigationBack";
import { cn } from "@/lib/utils";
import LeftIcon from "@/public/icons/left-icon";

const PageLayout = ({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) => {
  const { goBack, isBack } = useNavigationBack();
  return (
    <div className={`${cn(className, "w-full px-8 pt-3")}`}>
      <div className="relative w-full h-full">
        <div className="absolute cursor-pointer left-0 top-0" onClick={goBack}>
          {isBack && <LeftIcon className="w-7 h-7 " />}
        </div>
        <p className="w-full text- text-center h-7 font-semibold text-lg">
          {title}
        </p>
      </div>
      {children}
    </div>
  );
};

export default PageLayout;
