"use client";
import BtcIcon from "@/public/icons/BtcIcon";
import Image from "next/image";
import { SwapCardPropsType } from "./type";

const SwapCard = ({
  action,
  amount,
  balance,
  zIndex = 50,
  icon,
  crypto,
  onClick,
  label,
  onAmountChange,
}: SwapCardPropsType) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      onAmountChange?.(value);
    }
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`w-full p-5 bg-white overflow-hidden rounded-2xl flex items-center justify-between transition-all duration-200 ease-in-out ${
        onClick ? "cursor-pointer hover:shadow-md" : ""
      }`}
      style={{ zIndex }}
      onClick={onClick}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm">{action}</p>
          <input
            type="text"
            value={amount}
            onChange={handleInputChange}
            onClick={handleInputClick}
            placeholder="0"
            className="outline-none border-none text-xl font-semibold bg-transparent w-full"
            disabled={!onAmountChange}
          />
        </div>
        <p>
          <span className="text-gray-400">Balance :</span> {balance}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {crypto?.icon ? (
          <div className="w-8 h-8 rounded-full shrink-0  bg-gray-250 flex items-center justify-center">
            <Image src={crypto.icon} alt={crypto.name} width={12} height={12} />
          </div>
        ) : icon ? (
          <div className="w-8 h-8 shrink-0  rounded-full bg-gray-250 flex items-center justify-center">
            {icon}
          </div>
        ) : (
          <div className="w-8 h-8 shrink-0 rounded-full bg-gray-250 flex items-center justify-center">
            <BtcIcon />
          </div>
        )}
        <div className="flex flex-col">
          <p className="text-xs text-gray-500">{label || "Select a coin"}</p>
          <p className="text-base font-semibold">
            {crypto?.shortName || "BTC"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SwapCard;
