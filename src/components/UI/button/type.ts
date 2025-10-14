export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "filled" | "outline" | "outline-dark" | "text";
  stroke?: boolean;
  icon?: React.ReactNode;
  size?: "md" | "lg";
}
