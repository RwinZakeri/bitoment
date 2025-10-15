import AnnotationTypingIcon from "@/public/icons/AnnotationTypingIcon";
import EmailIcon from "@/public/icons/EmailIcon";
import GoogleChromeLogoIcon from "@/public/icons/GoogleChromeLogoIcon";
import { TwoFactorMethod, TwoFactorOption } from "@/types";
import { v4 as uuId } from "uuid";

// Re-export the interface from global types for backward compatibility
export type twoFactorOptionsProps = TwoFactorOption;

export const twoFactorOption: twoFactorOptionsProps[] = [
  {
    label: "SMS Verification",
    icon: <AnnotationTypingIcon className="w-6 h-6" />,
    value: TwoFactorMethod.SMS,
    id: uuId(),
  },
  {
    label: "Email Verification",
    icon: <EmailIcon className="w-6 h-6" />,
    value: TwoFactorMethod.EMAIL,
    id: uuId(),
  },
  {
    label: "Google Authenticator",
    icon: <GoogleChromeLogoIcon className="w-6 h-6" />,
    value: TwoFactorMethod.GOOGLE_AUTHENTICATOR,
    id: uuId(),
  },
];
