import InfoIcon from "@/public/icons/InfoIcon";
import { ReactNode } from "react";

const Alert = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex gap-2 bg-coral-red-200 rounded-lg p-2 pb-3">
      <InfoIcon width={30} height={30} />
      {children}
    </div>
  );
};

export default Alert;
