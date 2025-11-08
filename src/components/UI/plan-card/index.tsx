import Link from "next/link";
import { planCardPropsType } from "./type";

const PlanCard = ({
  title,
  date,
  price,
  amount,
  icon,
  onClick,
  link,
}: planCardPropsType) => {
  const cardContent = (
    <div
      className={`bg-white dark:bg-gray-200 max-h-20 py-5 px-6 flex justify-between rounded-xl ${
        onClick || link
          ? "cursor-pointer hover:opacity-90 transition-opacity"
          : ""
      }`}
    >
      <div className="w-full flex items-center gap-4">
        <div>{icon}</div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">{title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
        </div>
      </div>
      <div className="flex flex-col items-center ">
        {price && <p className="text-foreground">${price}</p>}
        {amount && (
          <p className="text-cyan-400 text-xs font-semibold">+{amount}%</p>
        )}
      </div>
    </div>
  );

  if (link) {
    return <Link href={link}>{cardContent}</Link>;
  }

  if (onClick) {
    return <div onClick={onClick}>{cardContent}</div>;
  }

  return cardContent;
};

export default PlanCard;
