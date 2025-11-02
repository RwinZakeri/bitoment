import BinanceIcon from "@/public/icons/BinanceIcon";
import BtcIcon from "@/public/icons/BtcIcon";
import EtcIcon from "@/public/icons/EtcIcon";
import SolIcon from "@/public/icons/SolIcon";
import TetherIcon from "@/public/icons/TetherIcon";
import { type ClassValue, clsx } from "clsx";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getToken = () => {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("token=")
  );

  if (tokenCookie) {
    return tokenCookie.split("=")[1];
  }

  return null;
};

export const setCookie = (name: string, value: string) => {
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; path=/`;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const generateRandomPercentage = () => {
  const isNegative = Math.random() < 0.4;
  const randomValue = Math.random() * 20;
  return isNegative ? -randomValue : randomValue;
};

export const getCryptoIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case "btc":
      return <BtcIcon className="w-4 h-4" />;
    case "eth":
      return <EtcIcon className="w-4 h-4" />;
    case "tether":
    case "usdt":
      return <TetherIcon className="w-4 h-4" />;
    case "sol":
      return <SolIcon className="w-4 h-4" />;
    case "bnb":
      return <BinanceIcon className="w-4 h-4" />; // Using EtcIcon as placeholder for BNB
    default:
      return <BtcIcon className="w-4 h-4" />;
  }
};

export function formatCurrency(value: number): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return value.toFixed(2);
  }
}

export const aliasMap: Record<string, string> = {
  TETHER: "USDT",
  USDT: "TETHER",
  ETC: "ETH",
  ETH: "ETC",
};

export const getAssetIcon = (currentAssets: { name: string; icon: string }) => {
  if (!currentAssets) return <BtcIcon className="w-7 h-7" />;

  const assetName = currentAssets.name.toUpperCase();
  switch (assetName) {
    case "BTC":
      return <BtcIcon className="w-7 h-7" />;
    case "ETH":
    case "ETC":
      return <EtcIcon className="w-7 h-7" />;
    case "USDT":
    case "TETHER":
      return <TetherIcon className="w-7 h-7" />;
    case "SOL":
      return <SolIcon className="w-7 h-7" />;
    case "BNB":
      return <BinanceIcon className="w-7 h-7" />;
    default:
      return currentAssets.icon ? (
        <Image
          src={currentAssets.icon}
          alt={currentAssets.name}
          width={28}
          height={28}
        />
      ) : (
        <BtcIcon className="w-7 h-7" />
      );
  }
};
