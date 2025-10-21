import { ReactNode } from "react";

export interface TransformButtonProps {
  label: string;
  icon: ReactNode;
  clickHandler: () => void;
  className?: string;
}
