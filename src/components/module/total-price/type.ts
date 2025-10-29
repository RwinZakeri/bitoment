import { ReactNode } from "react";

export interface totalPriceType {
  totalPrice: string;
  currency?: string;
  className?: string;
  button?: ReactNode;
  amount?: number;
  labelPosition?: "bottom" | "top";
  textColor?: string;
  percentageColor?: string;
  iconColor?: string;
  iconRotation?: string;
}
