import { useCurrency } from "@/context/currencyContext";
import { cn } from "@/lib/utils";
import PositiveFlashIcon from "@/public/icons/PositiveFlashIcon";
import { totalPriceType } from "./type";

const TotalPrice = ({
  totalPrice,
  className,
  button,
  amount,
  labelPosition = "bottom",
  textColor,
  percentageColor,
  iconColor,
  iconRotation,
}: totalPriceType) => {
  const { currency } = useCurrency();

  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col gap-2">
        {labelPosition !== "bottom" && (
          <p className="text-gray-500 dark:text-gray-400">Total balance</p>
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
            <p className="text-gray-500 dark:text-gray-400">Total balance</p>
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
                {String(amount).split(".")[0]}.
                {String(amount).split(".")[1].substring(0, 1)} %
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
