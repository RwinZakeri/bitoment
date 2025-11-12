"use client";
import TilteAndDescription from "@/components/module/TilteAndDescription/TilteAndDescription";
import Button from "@/components/UI/button";
import Input from "@/components/UI/input";
import UserNavigationBack from "@/hooks/useNavigationBack";
import { translateErrorMessage } from "@/lib/translateErrors";
import { resetPassword, resetPasswordSchema } from "@/schema/auth/authSchema";
import { SendOTPRequest, SendOTPResponse } from "@/types/auth";
import MutationKey from "@/types/mutation_key";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ResetPasswordData {
  email: string;
  otp: string;
}

const ForgotPasswordResetPassword = ({
  
  resetPasswordData,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  resetPasswordData: ResetPasswordData;
}) => {
  const t = useTranslations();
  const { goBack } = UserNavigationBack();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPassword>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const router = useRouter();

  const { mutate: onSubmit, isPending } = useMutation({
    mutationKey: [MutationKey.resetPassword],
    mutationFn: async (data: resetPassword) => {
      const response = await axios.post<SendOTPResponse>(
        "/api/auth/reset-password",
        {
          newPassword: data.password,
          ...resetPasswordData,
        } as SendOTPRequest
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response;
    },
    onSuccess: (data) => {
      toast.success(t("auth.resetPassword.passwordResetSuccessfully"));
      sessionStorage.setItem("resetEmail", data.data.message || "");
      router.push("/auth/sign-in");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || t("auth.resetPassword.failedToResetPassword"));
    },
  });
  return (
    <>
      <TilteAndDescription
        className="mt-28 mb-24"
        description={t("auth.resetPassword.description")}
      />

      <form
        onSubmit={handleSubmit((data: resetPassword) => onSubmit(data))}
        className="flex flex-col gap-6"
      >
        <Input
          label={t("auth.resetPassword.password")}
          type="password"
          placeholder="*************"
          showPasswordToggle={true}
          {...register("password")}
          error={
            errors.password?.message
              ? translateErrorMessage(errors.password.message, t)
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
          {isPending ? t("auth.resetPassword.sending") : t("auth.resetPassword.sendOtp")}
        </Button>
      </form>

      <Button
        onClick={goBack}
        variant="text"
        size="lg"
        className="text-blue-500 absolute bottom-24 left-1/2 -translate-x-1/2"
      >
        {t("auth.resetPassword.backToAgain")}
      </Button>
    </>
  );
};

export default ForgotPasswordResetPassword;
