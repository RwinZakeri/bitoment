import { ReactNode } from "react";

export interface AutoCompletePropsType {
  list: string[];
  label?: string;
  onClick: (item: string) => void;
  zIndex?: number;
  size?: "sm" | "md";
  className?: string;
  icon?: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
}
