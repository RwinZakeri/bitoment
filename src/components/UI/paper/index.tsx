import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const Paper = ({
  children,
  className,
  label,
}: {
  className?: string;
  children: ReactNode;
  label?: string;
}) => {
  return (
    <div className={cn(className)}>
      {label && <p className="text-lg">{label}</p>}

      {children}
    </div>
  );
};

export default Paper;
