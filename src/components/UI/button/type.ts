import { ButtonSize, ButtonProps as GlobalButtonProps } from "@/types";


export interface ButtonProps extends GlobalButtonProps {
  children: React.ReactNode;
  className?: string;
  stroke?: boolean;
  icon?: React.ReactNode;
  size: ButtonSize;
  isLoading?: boolean;
}
