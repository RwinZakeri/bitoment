import { ReactNode } from "react";

export interface CryptoCreditPropsType {
  label: string;
  price: string;
  priceLabel?: string;
  icon: ReactNode;
  amount?: string | number;
  color?: string;
  type?: "link";
  clickHandler?: () => void;
}
