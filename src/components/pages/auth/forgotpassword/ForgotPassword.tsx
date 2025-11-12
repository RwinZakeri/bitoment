"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import UserNavigationBack from "@/hooks/useNavigationBack";
import { useTranslations } from "next-intl";
import { SetStateAction, useState } from "react";
import ForgotPasswordEmail from "./steps/email";
import ForgotPasswordOtp from "./steps/otp";
import ForgotPasswordResetPassword from "./steps/resetPassword";

interface ResetPasswordData {
  email: string;
  otp: string;
}

const stepFunc = (
  step: number,
  setStep: React.Dispatch<SetStateAction<number>>,
  resetPasswordData: ResetPasswordData,
  setResetPasswordData: React.Dispatch<SetStateAction<ResetPasswordData>>,
  t: ReturnType<typeof useTranslations>
) => {
  const Steps = [
    {
      title: t("auth.forgotPassword.title"),
      component: (
        <ForgotPasswordEmail
          setStep={setStep}
          setResetPasswordData={setResetPasswordData}
        />
      ),
    },
    {
      title: t("auth.otp.title"),
      component: (
        <ForgotPasswordOtp
          setStep={setStep}
          setResetPasswordData={setResetPasswordData}
          resetPasswordData={resetPasswordData}
        />
      ),
    },
    {
      title: t("auth.resetPassword.title"),
      component: (
        <ForgotPasswordResetPassword
          resetPasswordData={resetPasswordData}
          setStep={setStep}
        />
      ),
    },
  ];

  return Steps[step];
};

const ForgotPassword = () => {
  const t = useTranslations();
  const { goBack } = UserNavigationBack();
  const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordData>(
    {
      email: "",
      otp: "",
    }
  );
  const [step, setStep] = useState(0);

  return (
    <PageLayout
      onClick={() => {
        if (step < 1) {
          goBack();
        } else {
          setStep((e) => e - 1);
        }
      }}
      title={
        stepFunc(step, setStep, resetPasswordData, setResetPasswordData, t).title
      }
    >
      {
        stepFunc(step, setStep, resetPasswordData, setResetPasswordData, t)
          .component
      }
    </PageLayout>
  );
};

export default ForgotPassword;
