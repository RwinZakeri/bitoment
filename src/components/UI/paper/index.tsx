import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const Paper = ({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={cn(className, "p-6 bg-white")}>{children}</div>;
};

export default Paper;
