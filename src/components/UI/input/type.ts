type inputType = "fill" | "stroke";
type inputVariant = "primary" | "secondary";
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  id?: string;
  label?: string;
  icon?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  containerClassName?: string;
  inputType?: inputType;
  variant?: inputVariant;
  error?: string;
  showPasswordToggle?: boolean;
  size?: "sm" | "md";
}
