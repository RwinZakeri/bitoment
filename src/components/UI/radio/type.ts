export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  variant?: "default" | "turquoise";
}
