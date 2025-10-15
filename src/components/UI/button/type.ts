import { ButtonProps as GlobalButtonProps } from "@/types";

// Extend the global ButtonProps with additional properties specific to this component
export interface ButtonProps extends GlobalButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "filled" | "outline" | "outline-dark" | "text";
  stroke?: boolean;
  icon?: React.ReactNode;
}
