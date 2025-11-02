import { ReactNode } from "react";

export interface planCardPropsType {
  title: string;
  date: string;
  price?: number | string;
  amount?: string | number;
  icon: ReactNode;
  onClick?: () => void;
  link?: string;
}
