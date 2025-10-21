"use client";
import AutoComplete from "../auto-complete";
import { SwapCardPropsType } from "./type";

const SwapCard = ({
  action,
  amount,
  balance,
  zIndex = 50,
  icon,
}: SwapCardPropsType) => {
  return (
    <div className="w-full p-5 bg-white rounded-2xl flex items-center justify-between">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm">{action}</p>
          <p className="text-xl font-semibold">{amount}</p>
        </div>
        <p>
          <span className="text-gray-400">Balance :</span> {balance}
        </p>
      </div>
      <div>
        
        <AutoComplete
          icon={icon}
          className={"w-32"}
          size="sm"
          list={["btc", "etc", "binance"]}
          onClick={(e) => console.log(e)}
          zIndex={zIndex}
        />
      </div>
    </div>
  );
};

export default SwapCard;
