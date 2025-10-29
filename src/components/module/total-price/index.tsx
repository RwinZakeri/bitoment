import { cn } from "@/lib/utils";
import PositiveFlashIcon from "@/public/icons/PositiveFlashIcon";
import { totalPriceType } from "./type";

const TotalPrice = ({
  totalPrice,
  currency = "USDT",
  className,
  button,
  amount,
  labelPosition = "bottom",
  textColor,
  percentageColor,
  iconColor,
  iconRotation,
}: totalPriceType) => {
  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col gap-2">
        {labelPosition !== "bottom" && (
          <p className=" text-gray-800/55">Total balance</p>
        )}
        <div className={cn(className, "flex gap-3")}>
          <p>
            {" "}
            <span className={cn("text-3xl", textColor)}>{totalPrice}</span>{" "}
            <span className="text-gray-700/60 text-xl">{currency}</span>{" "}
          </p>
        </div>
        <div className="flex items-center gap-1 mt-1">
          {labelPosition === "bottom" && (
            <p className=" text-gray-800/55">Total balance</p>
          )}

          {amount && (
            <>
              <PositiveFlashIcon
                className={cn(iconColor, iconRotation)}
                fill={percentageColor?.includes("red") ? "#ef4444" : "#11BAAA"}
                stroke={
                  percentageColor?.includes("red") ? "#ef4444" : "#11BAAA"
                }
              />

              <span
                className={cn(
                  "text-sm font-semibold",
                  percentageColor || "text-cyan-600"
                )}
              >
                {amount > 0 ? "+" : ""}
                {amount}%
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
