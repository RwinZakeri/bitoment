import BtcIcon from "@/public/icons/BtcIcon";
import EtcIcon from "@/public/icons/EtcIcon";
import LinkIcon from "@/public/icons/LinkIcon";
import SolIcon from "@/public/icons/SolIcon";
import TetherIcon from "@/public/icons/TetherIcon";
import { type ClassValue, clsx } from "clsx";
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
      return <LinkIcon className="w-6 h-6" />; // Using EtcIcon as placeholder for BNB
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
