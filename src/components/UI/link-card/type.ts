import { ReactNode } from "react";

export interface LinkedCardType {
  title: string;
  icon?: ReactNode;
  link: string;
  label?: string;
  size?: "sm" | "lg";
}
