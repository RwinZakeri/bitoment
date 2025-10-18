import { planCardPropsType } from "./type";

const PlanCard = ({ title, date, price, amount, icon }: planCardPropsType) => {
  return (
    <div className="bg-white max-h-20 py-5 px-6 flex justify-between rounded-xl">
      <div className="w-full flex items-center gap-4">
        <div>{icon}</div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">{title}</p>
          <p className="text-xs text-gray-800/40">{date}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        {price && <p className="text-black">${price}</p>}
        {amount && <p className="text-cyan-400 font-semibold">+{amount}%</p>}
      </div>
    </div>
  );
};

export default PlanCard;
