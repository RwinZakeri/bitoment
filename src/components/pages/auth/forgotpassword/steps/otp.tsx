"use client";
import Button from "@/components/UI/button";
import axios from "@/config/axios.config";
import { ForgotPasswordFormData } from "@/schema/auth/authSchema";
import { SendOTPRequest, SendOTPResponse } from "@/types/auth";
import MutationKey from "@/types/mutation_key";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";

interface ResetPasswordData {
  email: string;
  otp: string;
}

const ForgotPasswordOtp = ({
  setStep,
  setResetPasswordData,
  resetPasswordData,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  setResetPasswordData: Dispatch<SetStateAction<ResetPasswordData>>;
  resetPasswordData: ResetPasswordData;
}) => {
  const t = useTranslations();
  const [otp, setOtp] = useState(resetPasswordData.otp || "");
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const test = setInterval(() => {
      if (timer > 0) {
        setTimer((e) => e - 1);
      }
    }, 1000);

    return () => clearInterval(test);
  }, [timer]);

  useEffect(() => {
    if (otp) {
      setResetPasswordData((prev) => ({
        ...prev,
        otp: otp,
      }));
    }
  }, [otp, setResetPasswordData]);

  const { mutate, isPending } = useMutation({
    mutationKey: [MutationKey.verifyOtp],
    mutationFn: async (otp: string) => {
      const res = await axios.post("auth/verify-otp", {
        email: resetPasswordData.email,
        otp,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success(t("auth.otp.otpVerifiedSuccessfully"));
      setStep(2);
    },
    onError: (err: unknown) => {
      const errorMessage =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || t("errors.generic");
      toast.error(errorMessage);
    },
  });

  const { mutate: onResend } = useMutation({
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
      <p className="text-gray-600 mt-28">
        {t("auth.otp.description")}{" "}
        <span className="font-semibold">
          {resetPasswordData.email.replace(
            /^(.{3})(.*)(@.*)$/,
            (_, first3, middle, domain) =>
              first3 + "*".repeat(middle.length) + domain
          )}
        </span>
      </p>

      <div className="mt-16">
        <OtpInput
          shouldAutoFocus
          skipDefaultStyles
          inputStyle={{
            borderColor: "#aeacac",
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "10px",
            textAlign: "center",
            width: "100%",
            height: "64px",
            margin: "12px",
          }}
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderInput={(props) => <input {...props} />}
        />
        <p className="text-gray-500 text-center text-sm font-normal mt-3">
          {t("auth.otp.notYetGet")}{" "}
          <Button
            size="sm"
            variant="text"
            onClick={() => {
              onResend({ email: resetPasswordData.email });
              setTimer(60);
            }}
            className="text-blue-500 hover:p-0 p-0 hover:bg-none cursor-pointer font-semibold"
            disabled={timer > 0}
          >
            {t("auth.otp.resendOtp")}
          </Button>
        </p>
        <Button
          loading={isPending}
          disabled={isPending || otp.length !== 4}
          onClick={() => mutate(otp)}
          size="lg"
          className="w-full mt-9"
        >
          {isPending ? t("auth.otp.verifying") : t("auth.otp.verify")}
        </Button>
        <p className="text-gray-500 text-center text-sm font-normal mt-6">
          <span className="text-blue-500 font-semibold">
            {String(Math.floor(timer / 60)).padStart(2, "0")}:
            {String(timer % 60).padStart(2, "0")}
          </span>{" "}
          {t("auth.otp.secLeft")}
        </p>
      </div>
    </>
  );
};

export default ForgotPasswordOtp;
