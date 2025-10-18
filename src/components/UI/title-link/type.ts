import { ReactNode } from "react";

export interface titleLinkPropsType {
  type?: "link" | "date";
  title: string;
  label: string;
  address?: string;
  children: ReactNode;
  className ?: string
  margin : number
}
