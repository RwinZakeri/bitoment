import { ReactNode } from "react";

export interface SwapCardPropsType {
  action: string;
  amount: string;
  balance: string;
  zIndex?: number;
  icon?: ReactNode;
}
