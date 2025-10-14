"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import Button from "@/components/UI/button";
import Link from "next/link";
import { useState } from "react";
import OtpInput from "react-otp-input";

const ResetPasswordPage = () => {
  const [otp, setOtp] = useState("");

  return (
    <PageLayout title="Reset Password">
      <p className="text-gray-600 mt-28">
        Please enter the verification code we sent to your email{" "}
        <span className="text-gray-800">m***@gmail.com</span>
      </p>

      <div className="mt-16">
        <OtpInput
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
          Not yet get ? {" "}
          <Link
            href={"/forgot-password"}
            className="text-blue-500 font-semibold"
          >
            Resend OTP
          </Link>
        </p>
        <Button size="lg" className="w-full mt-9">
          Verify
        </Button>
        <p className="text-gray-500 text-center text-sm font-normal mt-6">
          <span className="text-blue-500 font-semibold"> 00:30</span> {" "}
          Sce left
        </p>
      </div>
    </PageLayout>
  );
};

export default ResetPasswordPage;
