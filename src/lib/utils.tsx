import BinanceIcon from "@/public/icons/BinanceIcon";
import BtcIcon from "@/public/icons/BtcIcon";
import EtcIcon from "@/public/icons/EtcIcon";
import SolIcon from "@/public/icons/SolIcon";
import TetherIcon from "@/public/icons/TetherIcon";
import { type ClassValue, clsx } from "clsx";
import Image from "next/image";
import toast from "react-hot-toast";
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
      return <BinanceIcon className="w-4 h-4" />;
    default:
      return <BtcIcon className="w-4 h-4" />;
  }
};

export function formatCurrency(value: number, currency?: string): string {
  try {
    if (currency) {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    }
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
  if (!currentAssets) return <BtcIcon className="w-7 h-7 text-foreground" />;

  const assetName = currentAssets.name.toUpperCase();
  switch (assetName) {
    case "BTC":
      return <BtcIcon className="w-7 h-7 text-foreground" />;
    case "ETH":
    case "ETC":
      return <EtcIcon className="w-7 h-7 text-foreground" />;
    case "USDT":
    case "TETHER":
      return <TetherIcon className="w-7 h-7 text-foreground" />;
    case "SOL":
      return <SolIcon className="w-7 h-7 text-foreground" />;
    case "BNB":
      return <BinanceIcon className="w-7 h-7 text-foreground" />;
    default:
      return currentAssets.icon ? (
        <Image
          src={currentAssets.icon}
          alt={currentAssets.name}
          width={28}
          height={28}
        />
      ) : (
        <BtcIcon className="w-7 h-7 text-foreground" />
      );
  }
};

export const generateRandomPercentage = () => {
  const isNegative = Math.random() < 0.4;
  const randomValue = Math.random() * 20;
  return isNegative ? -randomValue : randomValue;
};

const generateChartData = (percentageChange: number): number[] => {
  const months = 12;
  const data: number[] = [];

  const baseValue = Math.random() * 100 * (0.7 + Math.random() * 0.1);
  data.push(baseValue);

  for (let i = 1; i < months - 1; i++) {
    const previousValue: number = data[i - 1];
    const volatility = 0.05 + Math.random() * 0.1;
    const trend = (percentageChange / 100) * (i / months);
    const randomChange = (Math.random() - 0.5) * volatility;

    const newValue: number = previousValue * (1 + trend + randomChange);
    data.push(Math.max(0, newValue));
  }

  data.push(Math.max(0, Math.random() * 100));

  return data;
};

export const chartData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Portfolio Value",
      data: generateChartData(Math.random() * Math.random() * 100),
      borderColor: "#15E0CC",
      backgroundColor: "rgba(21, 224, 204, 0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
};

export const returnPercentages: Record<number, number> = {
  0: 10,
  1: 15,
  2: 20,
  3: 30,
};

export const durationLabels: Record<number, string> = {
  0: "1 Month",
  1: "3 Months",
  2: "6 Months",
  3: "1 Year",
};

export const steps = ["1m", "3m", "6m", "1y"];

export const assetAllocationData = {
  labels: ["Bitcoin", "Ethereum", "Solana", "Tether", "Others"],
  datasets: [
    {
      data: [35, 25, 20, 15, 5],
      backgroundColor: ["#F7931A", "#627EEA", "#9945FF", "#26A17B", "#6B7280"],
      borderColor: ["#F7931A", "#627EEA", "#9945FF", "#26A17B", "#6B7280"],
      borderWidth: 2,
    },
  ],
};

export const handleCopyAddress = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Address copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy address:", err);
    toast.error("Failed to copy address");
  }
};
