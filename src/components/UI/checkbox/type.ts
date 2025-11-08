import { CheckboxProps as GlobalCheckboxProps } from "@/types";


export interface CheckboxProps extends GlobalCheckboxProps {
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline";
}
