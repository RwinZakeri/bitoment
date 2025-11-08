import { cn } from "@/lib/utils";
import Down from "@/public/svgs/arrow-down-red.svg";
import cpgIcon from "@/public/svgs/cpgIcon.svg";
import Link from "@/public/svgs/link.svg";
import UP from "@/public/svgs/up-arrow-red.svg";
import Image from "next/image";
import { RiskReportPropsType } from "./type";

const RiskReportCard = ({
  type,
  icon,
  title,
  amount: _amount,
  price,
  riskLevel,
  assetAmount,
}: RiskReportPropsType) => {
  return (
    <div className="p-3 w-full cursor-pointer bg-white flex items-center justify-between rounded-lg">
      <div className="flex items-center-safe gap-2">
        <div
          className={cn(
            type === "up"
              ? "bg-coral-red"
              : type === "down"
              ? "bg-teal-light"
              : type === "cpg"
              ? "bg-teal-light"
              : "bg-teal-light",
            "w-12 h-12 rounded-full flex items-center justify-center"
          )}
        >
          <Image
            src={
              type === "up"
                ? UP
                : type === "down"
                ? Down
                : type === "cpg"
                ? cpgIcon
                : Link
            }
            alt="transaction type"
            width={26}
            height={26}
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <div className="flex gap-1 items-center">
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200">
              {icon}
            </div>
            <div>{title}</div>
          </div>
          <p className="text-xs font-semibold">
            {type === "up"
              ? "-"
              : type === "down"
              ? "+"
              : type === "cpg"
              ? "+"
              : type === "link"
              ? "+"
              : ""}
            ${price}
          </p>
          <p className="text-sm text-gray-400 ">
            {assetAmount} {title}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col gap-2 text-sm">
        <div className="w-full flex items-center gap-1">
          Risk Level :
          <span
            className={cn("px-3 w-[100px] text-center border rounded-sm")}
            style={{
              color:
                riskLevel < 40
                  ? "#00DA49"
                  : riskLevel > 80
                  ? "#B00000"
                  : "#FFA600",
            }}
          >
            {riskLevel < 40 ? "Low" : riskLevel > 80 ? "High" : "Moderate"}
          </span>
        </div>
        <div className={cn("flex items-center gap-1")}>
          <span className="">Risk Level :</span>
          <span
            style={{
              color:
                riskLevel < 40
                  ? "#00DA49"
                  : riskLevel > 80
                  ? "#B00000"
                  : "#FFA600",
              borderColor:
                riskLevel < 40
                  ? "#00DA49"
                  : riskLevel > 80
                  ? "#B00000"
                  : "#FFA600",

              backgroundColor:
                riskLevel < 40
                  ? "#00DA491A"
                  : riskLevel > 80
                  ? "#B000001A"
                  : "#FFA6001A",
            }}
            className="w-[100px]  text-center rounded-sm border border-gray-300 px-3"
          >
            {riskLevel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RiskReportCard;
