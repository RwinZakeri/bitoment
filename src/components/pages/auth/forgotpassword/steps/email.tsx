"use client";
import TilteAndDescription from "@/components/module/TilteAndDescription/TilteAndDescription";
import Button from "@/components/UI/button";
import Input from "@/components/UI/input";
import axios from "@/config/axios.config";
import UserNavigationBack from "@/hooks/useNavigationBack";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/schema/auth/authSchema";
import { SendOTPRequest, SendOTPResponse } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
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
      <TilteAndDescription
        className="mt-28 mb-24"
        description="Enter the email associated with your account
and we'll send an email with instructions to reset
your password."
      />

      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col gap-6"
      >
        <Input
          type="email"
          label="Email"
          placeholder="example@gmail.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <Button
          type="submit"
          className="w-full mt-6"
          size="lg"
          disabled={isPending}
          loading={isPending}
        >
          {isPending ? "Sending..." : "Send OTP"}
        </Button>
      </form>

      <Button
        onClick={goBack}
        variant="text"
        size="lg"
        className="text-blue-500 absolute bottom-24 left-1/2 -translate-x-1/2"
      >
        Back to again{" "}
      </Button>
    </>
  );
};

export default ForgotPasswordEmail;
