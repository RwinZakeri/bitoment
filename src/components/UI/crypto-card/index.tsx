import { useCurrency } from "@/context/currencyContext";
import { formatCurrency } from "@/lib/utils";
import Down from "@/public/svgs/arrow-down-red.svg";
import cpgIcon from "@/public/svgs/cpgIcon.svg";
import Link from "@/public/svgs/link.svg";
import UP from "@/public/svgs/up-arrow-red.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CryptoCardPropsType } from "./type";
const CryptoCard = ({
  title,
  icon,
  type,
  label,
  price,
  amount,
  cardType = "crypto",
  riskLevel,
  cryptoName,
}: CryptoCardPropsType) => {
  const { currency } = useCurrency();
  const t = useTranslations();
  const formatPrice = (price: number | string) => {
    if (typeof price === "number") {
      return formatCurrency(price, currency);
    }
    
    const numPrice = parseFloat(String(price).replace(/[^0-9.-]/g, ""));
    if (!isNaN(numPrice)) {
      return formatCurrency(numPrice, currency);
    }
    return price;
  };
  return (
    <div className="w-full cursor-pointer bg-white flex items-center justify-between rounded-lg p-3">
      <div className="flex gap-2.5 items-center">
        {cardType === "crypto" ? (
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center ${
              type === "up" ? "bg-coral-red" : "bg-teal-light"
            }`}
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
              width={type === "link" ? 35 : 25}
              height={type === "link" ? 35 : 25}
            />
          </div>
        ) : (
          <div className="w-13 h-13 bg-gray-200 rounded-full flex items-center justify-center">
            {icon}
          </div>
        )}
        <div className="flex gap-1 flex-col">
          <div className="flex items-center gap-1.5">
            {cardType !== "asset" && (
              <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
                {icon}
              </div>
            )}
            <p className="text-xl">{title}</p>
          </div>
          {cardType === "crypto" ? (
            <p className="text-gray-500 text-xs">{label}</p>
          ) : cardType !== "asset" ? (
            <div className="flex flex-col items-center gap-1">
              <p className="text-foreground text-xs">+{formatPrice(price)}</p>
              <p className="text-gray-500 text-xs">{amount}</p>
            </div>
          ) : null}
          {cardType === "asset" && (
            <p className="text-gray-500 text-xs">{cryptoName}</p>
          )}
        </div>
      </div>
      {cardType === "risk" ? (
        <div>
          <div className="flex flex-col text-sm gap-1">
            <div className="flex items-center gap-1">
              <p className="w-full ">{t("wallet.riskLevel")} : </p>
              <div className="rounded-lg w-full text-center text-[10px] border border-border-gray py-1">
                {riskLevel?.text}
              </div>
            </div>
            <div className="flex w-full items-center gap-1">
              <p>{t("wallet.riskLevel")} : </p>
              <div className="rounded-lg text-[10px] border border-border-gray py-1 flex items-center justify-center px-7.5">
                <p>{riskLevel?.level}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1 items-center">
          <p
            className={`${cardType === "asset" ? "" : "text-lg font-semibold"}`}
          >
            {type === "up"
              ? "-"
              : type === "down"
              ? "+"
              : type === "cpg"
              ? "+"
              : ""}
            {formatPrice(price)}
          </p>
          <p
            className={`text-gray-500 ${
              cardType === "asset" ? "text-sm self-end" : ""
            }`}
          >
            {amount}
          </p>
        </div>
      )}
    </div>
  );
};

export default CryptoCard;
