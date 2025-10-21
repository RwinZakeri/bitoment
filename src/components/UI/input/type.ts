type inputType = "fill" | "stroke";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  icon?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  containerClassName?: string;
  inputType?: inputType;
}
