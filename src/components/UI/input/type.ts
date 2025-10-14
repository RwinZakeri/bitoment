export interface InputProps {
  placeholder?: string;
  className?: string;
  label?: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
  type?: string;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  isPasswordVisible?: boolean;
}
