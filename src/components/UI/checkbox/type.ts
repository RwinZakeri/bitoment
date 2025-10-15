import { CheckboxProps as GlobalCheckboxProps } from "@/types";

// Extend the global CheckboxProps with additional properties specific to this component
export interface CheckboxProps extends GlobalCheckboxProps {
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline";
}
