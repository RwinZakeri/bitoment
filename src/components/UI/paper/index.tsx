import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const Paper = ({
  children,
  className,
  label,
  icon,
}: {
  className?: string;
  children: ReactNode;
  label?: string;
  icon?: ReactNode;
}) => {
  return (
    <div className={cn(className)}>
      <div className="flex items-center gap-2">
        {icon && icon}
        {label && <p className="text-lg">{label}</p>}
      </div>
      {children}
    </div>
  );
};

export default Paper;
