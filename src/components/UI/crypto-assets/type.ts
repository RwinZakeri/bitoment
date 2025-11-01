import { ReactNode } from "react";

export interface CryptoAssetspropsType {
  title: string;
  icon?: ReactNode;
  label?: string;
  size?: "sm" | "lg";
  type?: "crypto-link" | "normal-link";
  onClick: () => void;
}
