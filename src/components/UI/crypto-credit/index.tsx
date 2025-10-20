import UpArrowCreditIcon from "@/public/icons/UpArrowCreditIcon";
import { CryptoCreditPropsType } from "./type";

const CryptoCredit = ({
  label,
  price,
  priceLabel = "USDT",
  icon,
  amount,
  color = "#C4E4D3",
}: CryptoCreditPropsType) => {
  return (
    <div
      className="rounded-2xl p-6 flex justify-between pb-15 shadow-[0px_2px_4px_rgba(0,0,0,0.25)]"
      style={{ backgroundColor: color }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <p className="text-gray-500 text-base">{label}</p>
          <div className="flex gap-1">
            <p className="text-4xl">{price}</p>
            <p className="text-2xl self-end text-gray-500">{priceLabel}</p>
          </div>
        </div>
        <p className="flex items-center gap-1">
          {" "}
          <UpArrowCreditIcon className="w-4 h-4" /> {amount}
        </p>
      </div>
      <div className="w-fit h-fit p-3 rounded-full bg-white flex items-center justify-center">
        <p> {icon}</p>
      </div>
    </div>
  );
};

export default CryptoCredit;
