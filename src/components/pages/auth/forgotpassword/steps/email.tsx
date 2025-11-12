"use client";
import TilteAndDescription from "@/components/module/TilteAndDescription/TilteAndDescription";
import Button from "@/components/UI/button";
import Input from "@/components/UI/input";
import axios from "@/config/axios.config";
import UserNavigationBack from "@/hooks/useNavigationBack";
import { translateErrorMessage } from "@/lib/translateErrors";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/schema/auth/authSchema";
import { SendOTPRequest, SendOTPResponse } from "@/types/auth";
import MutationKey from "@/types/mutation_key";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ResetPasswordData {
  email: string;
  otp: string;
}

const ForgotPasswordEmail = ({
  setStep,
  setResetPasswordData,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  setResetPasswordData: Dispatch<SetStateAction<ResetPasswordData>>;
}) => {
  const t = useTranslations();
  const { goBack } = UserNavigationBack();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const emailValue = watch("email");

  React.useEffect(() => {
    if (emailValue) {
      setResetPasswordData((prev) => ({
        ...prev,
        email: emailValue,
      }));
    }
  }, [emailValue, setResetPasswordData]);

  const { mutate: onSubmit, isPending } = useMutation({
    mutationKey: [MutationKey.sendOtp],
    mutationFn: async (data: ForgotPasswordFormData) => {
      const response = await axios.post<SendOTPResponse>(
        "/auth/send-otp",
        data as SendOTPRequest
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response;
    },
    onSuccess: (data, variables) => {
      toast.success(t("auth.forgotPassword.otpSentSuccessfully"));
      sessionStorage.setItem("resetEmail", variables.email || "");
      setStep(1);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || t("auth.forgotPassword.failedToSendOtp"));
    },
  });
  return (
    <>
      <TilteAndDescription
        className="mt-28 mb-24"
        description={t("auth.forgotPassword.description")}
      />

      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col gap-6"
      >
        <Input
          type="email"
          label={t("auth.forgotPassword.email")}
          placeholder={t("auth.forgotPassword.emailPlaceholder")}
          {...register("email")}
          error={
            errors.email?.message
              ? translateErrorMessage(errors.email.message, t)
              : undefined
          }
        />

        <Button
          type="submit"
          className="w-full mt-6"
          size="lg"
          disabled={isPending}
          loading={isPending}
        >
          {isPending ? t("auth.forgotPassword.sending") : t("auth.forgotPassword.sendOtp")}
        </Button>
      </form>

      <Button
        onClick={goBack}
        variant="text"
        size="lg"
        className="text-blue-500 absolute bottom-24 left-1/2 -translate-x-1/2"
      >
        {t("auth.forgotPassword.backToAgain")}
      </Button>
    </>
  );
};

export default ForgotPasswordEmail;
