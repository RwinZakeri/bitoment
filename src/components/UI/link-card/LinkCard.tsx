import LeftIcon from "@/public/icons/left-icon";
import Link from "next/link";
import { LinkedCardType } from "./type";

const LinkedCard = ({ title, icon, link, label }: LinkedCardType) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <span className="text-base">{label}</span>}
      <Link
        href={link}
        className="w-full rounded-xl p-4.5 h-[60px] bg-white flex justify-between items-center"
      >
        <div className="flex items-center gap-3.5">
          {icon && (
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
              {icon}
            </div>
          )}
          <p className="text-gray-100">{title}</p>
        </div>
        <LeftIcon className="rotate-180" />
      </Link>
    </div>
  );
};

export default LinkedCard;
