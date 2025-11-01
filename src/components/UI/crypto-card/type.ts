import { ReactNode } from "react";

export interface CryptoCardPropsType {
  title: string;
  icon: ReactNode;
  type?: "up" | "link" | "down" | "cpg";
  label: string;
  price: number | string;
  amount: string;
  cardType?: "risk" | "crypto" | "asset";
  riskLevel?: {
    text: string;
    level: number;
  };

  cryptoName?: string;
}
