import { ReactNode } from "react";

export interface VerifyInputPropsType
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode | null;
  inputSize?: "lg" | "sm";
}
