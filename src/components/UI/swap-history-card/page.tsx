import SwapIcon from "@/public/icons/SwapIcon";
import type { SwapHistoryCard } from "./type";

const SwapHistoryCard = ({
  iconOne,
  iconTwo,
  amount,
  label,
  cryptoOne,
  cryptoTwo,
}: SwapHistoryCard) => {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-4">
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1 items-center">
          <div className="w-6 h-6 rounded-full bg-gray-250 flex items-center justify-center">
            {iconOne}
          </div>
          <div>
            <p>{cryptoOne}</p>
          </div>
        </div>
        <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center cursor-pointer justify-center">
          <SwapIcon width={18} height={18} />
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-6 h-6 rounded-full bg-gray-250 flex items-center justify-center">
            {iconTwo}
          </div>
          <div>
            <p>{cryptoTwo}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div><p className="text-right text-base font-semibold">{amount}</p></div>
        <div><p className="text-xs text-gray-400">{label}</p></div>
      </div>
    </div>
  );
};

export default SwapHistoryCard;
