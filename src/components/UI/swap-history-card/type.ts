import { ReactNode } from "react";

export interface SwapHistoryCard {
  iconOne: ReactNode;
  iconTwo: ReactNode;
  amount: string;
  label: string;
  cryptoOne: string;
  cryptoTwo: string;
}
