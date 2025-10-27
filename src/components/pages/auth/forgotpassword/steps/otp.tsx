"use client";
import Button from "@/components/UI/button";
import axios from "@/config/axios.config";
import { ForgotPasswordFormData } from "@/schema/auth/authSchema";
import { SendOTPRequest, SendOTPResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
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
    mutationFn: async (otp: string) => {
      const res = await axios.post("auth/verify-otp", {
        email: resetPasswordData.email,
        otp,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("OTP verified successfully");
      setStep(2);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.response?.data?.message);
    },
  });

  const { mutate: onResend } = useMutation({
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
      toast.success("OTP sent successfully to your email");
      sessionStorage.setItem("resetEmail", variables.email || "");
      setStep(1);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    },
  });

  return (
    <>
      <p className="text-gray-600 mt-28">
        Please enter the verification code we sent to your email :{" "}
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
          Not yet get ?{" "}
          <Button
            size="sm"
            variant="text"
            onClick={() => {
              onResend({ email: resetPasswordData.email })
              setTimer(60)
            }}
            className="text-blue-500 hover:p-0 p-0 hover:bg-none cursor-pointer font-semibold"
            disabled={timer > 0}
          >
            Resend OTP
          </Button>
        </p>
        <Button
          loading={isPending}
          disabled={isPending || otp.length !== 4}
          onClick={() => mutate(otp)}
          size="lg"
          className="w-full mt-9"
        >
          {isPending ? "Verifing" : "Verify"}
        </Button>
        <p className="text-gray-500 text-center text-sm font-normal mt-6">
          <span className="text-blue-500 font-semibold">
            {String(Math.floor(timer / 60)).padStart(2, "0")}:
            {String(timer % 60).padStart(2, "0")}
          </span>{" "}
          sec left
        </p>
      </div>
    </>
  );
};

export default ForgotPasswordOtp;
