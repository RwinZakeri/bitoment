import { ReactNode } from "react";

export interface totalPriceType {
  totalPrice: string;
  currency?: string;
  className?: string;
  button?: ReactNode;
  amount?: number;
}
