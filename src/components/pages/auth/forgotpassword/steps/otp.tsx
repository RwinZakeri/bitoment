"use client";
import Button from "@/components/UI/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
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

  React.useEffect(() => {
    if (otp) {
      setResetPasswordData((prev) => ({
        ...prev,
        otp: otp,
      }));
    }

    console.log(resetPasswordData);
  }, [otp, setResetPasswordData]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (otp: string) => {
      const res = await axios.post("api/auth/verify-otp", {
        email: resetPasswordData.email,
        otp,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("OTP verified successfully");
      setStep(2);
    },
  });

  return (
    <>
      <p className="text-gray-600 mt-28">
        Please enter the verification code we sent to your email{" "}
        <span className="text-gray-800">{resetPasswordData.email}</span>
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
          <Link
            href={"/forgot-password"}
            className="text-blue-500 font-semibold"
          >
            Resend OTP
          </Link>
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
          <span className="text-blue-500 font-semibold"> 00:30</span> Sce left
        </p>
      </div>
    </>
  );
};

export default ForgotPasswordOtp;
