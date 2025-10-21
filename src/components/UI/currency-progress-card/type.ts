import { ReactNode } from "react";

export interface CurrencyProgressCardPropsType {
  title: string;
  icon?: ReactNode;
  price: number | string;
  progress: number;
  vertical?: boolean;
  onClick?: () => void;
}
