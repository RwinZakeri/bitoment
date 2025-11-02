import { CryptoCurrency } from "@/components/module/selectAssets/type";
import { ReactNode } from "react";

export interface SwapCardPropsType {
  action: string;
  amount: string;
  balance: string;
  zIndex?: number;
  icon?: ReactNode;
  crypto?: CryptoCurrency | null;
  onClick?: () => void;
  label?: string;
  onAmountChange?: (value: string) => void;
}
