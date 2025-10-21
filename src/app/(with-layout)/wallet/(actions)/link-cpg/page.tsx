"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import AutoComplete from "@/components/UI/auto-complete";
import Button from "@/components/UI/button";
import Checkbox from "@/components/UI/checkbox";
import CustomeInput from "@/components/UI/CustomeInput";
import LinkedCard from "@/components/UI/link-card/LinkCard";
import BtcIcon from "@/public/icons/BtcIcon";
import CorrosIcon from "@/public/icons/CorrosIcon";
import { useState } from "react";

const LinkCpg = () => {
  const [checkboxStates, setCheckboxStates] = useState({
    feePaidByUser: false,
    multiplePayment: false,
    amlCheck: false,
  });

  const handleCheckboxChange = (key: keyof typeof checkboxStates) => {
    setCheckboxStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  return (
    <PageLayout title="Create payment link">
      <div className="mt-6 flex flex-col gap-4">
        <LinkedCard
          icon={<BtcIcon />}
          type="crypto-link"
          label="Select a coin"
          title="BTC"
          link="/wallet/select-asset"
        />

        <AutoComplete
          onClick={(e) => {
            e;
          }}
          list={["iron man", "ppp", "ttt"]}
          label={"Blockchain Network"}
        />

        <CustomeInput
          icon={
            <>
              <p>USDT</p>
            </>
          }
          placeholder="0.00"
          label="Price"
          inputType="stroke"
        />

        <CustomeInput
          placeholder="Optional"
          label="Order description"
          inputType="stroke"
        />

        <CustomeInput
          icon={<CorrosIcon onClick={() => ""} />}
          placeholder="Optional"
          label="Order ID"
          inputType="stroke"
        />

        <div className="flex items-center gap-4">
          <Button variant="secondary" size="lg" className="w-full">
            Share
          </Button>
          <Button size="lg" className="w-full">
            Copy
          </Button>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <Checkbox
          id="fee-paid-by-user"
          label="Fee paid by user"
          checked={checkboxStates.feePaidByUser}
          onChange={() => handleCheckboxChange("feePaidByUser")}
        />
        <Checkbox
          id="multiple-payment"
          label="Multiple payment"
          checked={checkboxStates.multiplePayment}
          onChange={() => handleCheckboxChange("multiplePayment")}
        />
        <Checkbox
          id="aml-check"
          label="AML check"
          checked={checkboxStates.amlCheck}
          onChange={() => handleCheckboxChange("amlCheck")}
        />
      </div>
      <Button size="lg" className="mx-auto mt-8 px-12">
        Confirm
      </Button>
    </PageLayout>
  );
};

export default LinkCpg;
