import AnnotationTypingIcon from "@/public/icons/AnnotationTypingIcon";
import EmailIcon from "@/public/icons/EmailIcon";
import GoogleChromeLogoIcon from "@/public/icons/GoogleChromeLogoIcon";
import { ReactNode } from "react";
import { v4 as uuId } from "uuid";
export interface twoFactorOptionsProps {
  label: string;
  icon: ReactNode;
  value: string;
  id: string;
}

export const twoFactorSelecOption: twoFactorOptionsProps[] = [
  {
    label: "SMS Verification",
    icon: <AnnotationTypingIcon className="w-6 h-6" />,
    value: "sms",
    id: uuId(),
  },
  {
    label: "Email Verification",
    icon: <EmailIcon className="w-6 h-6" />,
    value: "email",
    id: uuId(),
  },
  {
    label: "Google Authenticator",
    icon: <GoogleChromeLogoIcon className="w-6 h-6" />,
    value: "google_authenticator",
    id: uuId(),
  },
];
