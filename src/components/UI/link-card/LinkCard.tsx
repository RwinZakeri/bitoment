import LeftIcon from "@/public/icons/left-icon";
import { LinkedCardType } from "./type";

const LinkedCard = ({ title, icon = true }: LinkedCardType) => {
  return (
    <div className="w-full rounded-xl p-4.5 h-[60px] bg-white flex justify-between items-center">
      <div className="flex items-center gap-3.5">
        {icon && (
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
            {icon}
          </div>
        )}
        <p>{title}</p>
      </div>
      <LeftIcon className="rotate-180" />
    </div>
  );
};

export default LinkedCard;
