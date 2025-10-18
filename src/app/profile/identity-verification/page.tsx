"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import VerifyModal from "@/components/pages/profile/verification/verify-modal/verifyModal";
import Button from "@/components/UI/button";
import Checkbox from "@/components/UI/checkbox";
import CustomeInput from "@/components/UI/CustomeInput";
import Paper from "@/components/UI/paper";
import { useState } from "react";

const IdentityVerification = () => {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <PageLayout title="identity verification">
      <Paper className="mt-5">
        To ensure the security of your account, we kindly request that you
        provide the necessary information.
        <br />
        <br />
        All data provided will be handled with strict confidentiality and used
        solely for the purpose of fraud prevention and compliance with
        anti-money laundering regulations.
      </Paper>

      <div className="mt-10 flex flex-col gap-3">
        <p className="mb-4">Please fill out the form below carefully:</p>
        <CustomeInput placeholder="+1 (555) 000-0000" label="Phone Number" />
        <CustomeInput
          placeholder="1234-5678-9012"
          label="National Insurance Number"
        />
        <CustomeInput
          placeholder="1990/08/15"
          type="date"
          label="Date of Birth"
        />
      </div>
      <div className="my-3">
        <Checkbox
          label="I agree to the terms and conditions of service."
          size="md"
          checked={agreeToTerms}
          onChange={(e) => setAgreeToTerms(e.target.checked)}
        />
      </div>
      <Button
        size="lg"
        className="mx-auto px-6"
        disabled={!agreeToTerms}
        onClick={() => setIsModalOpen(true)}
      >
        Confirm
      </Button>

      <VerifyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageLayout>
  );
};

export default IdentityVerification;
