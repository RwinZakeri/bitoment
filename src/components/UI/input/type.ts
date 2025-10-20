export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  label?: string;
  type?: string;
  Icon?: React.ReactNode;
  inputType: "fill" | "stroke";
}
