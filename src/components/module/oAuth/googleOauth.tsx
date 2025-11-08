import Button from "@/components/UI/button";
import GoogleIcon from "@/public/icons/GoogleIcon";

interface GoogleOAuthProps {
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
  variant?: "filled" | "outline" | "outline-dark" | "text" | "secondary";
  size?: "sm" | "md" | "lg";
}

const GoogleOAuth = ({
  onClick,
  isLoading = false,
  disabled = false,
  label = "Sign with Google",
  variant = "outline-dark",
  size = "sm",
}: GoogleOAuthProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      icon={<GoogleIcon className="size-6 text-foreground" />}
      className="w-full"
      onClick={onClick}
      disabled={disabled || isLoading}
      loading={isLoading}
    >
      {label}
    </Button>
  );
};

export default GoogleOAuth;
