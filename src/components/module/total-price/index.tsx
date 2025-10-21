import { cn } from "@/lib/utils";
import PositiveFlashIcon from "@/public/icons/PositiveFlashIcon";
import { totalPriceType } from "./type";

const TotalPrice = ({
  totalPrice,
  currency = "USDT",
  className,
  button,
  amount,
}: totalPriceType) => {
  return (
    <div className="flex justify-between w-full">
      <div>
        <div className={cn(className, "flex gap-3")}>
          <p>
            {" "}
            <span className="text-3xl">{totalPrice}</span>{" "}
            <span className="text-gray-700/60 text-xl">{currency}</span>{" "}
          </p>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <p className=" text-gray-800/55">Total balance</p>

          {amount && (
            <>
              <PositiveFlashIcon />

              <span className="text-cyan-600 text-sm font-semibold">
                +{amount}%
              </span>
            </>
          )}
        </div>
      </div>
      {button}
    </div>
  );
};

export default TotalPrice;
