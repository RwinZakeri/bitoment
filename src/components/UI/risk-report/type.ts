import { ReactNode } from "react";

export interface RiskReportPropsType {
  type: "up" | "down" | "cpg" | "link";
  icon: ReactNode;
  title: string;
  amount: string;
  price: string;
  riskLevel: number;
  assetAmount: string;
}
