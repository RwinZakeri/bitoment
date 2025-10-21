import { ReactNode } from "react";

export interface TilteAndDescriptionProps {
  title?: string | ReactNode;
  description: string;
  className?: string;
}
