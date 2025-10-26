import { ButtonSize, ButtonProps as GlobalButtonProps } from "@/types";

// Extend the global ButtonProps with additional properties specific to this component
export interface ButtonProps extends GlobalButtonProps {
  children: React.ReactNode;
  className?: string;
  stroke?: boolean;
  icon?: React.ReactNode;
  size: ButtonSize;
  isLoading?: boolean;
}
