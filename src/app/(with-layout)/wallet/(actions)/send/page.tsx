"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import AutoComplete from "@/components/UI/auto-complete";
import Button from "@/components/UI/button";
import CustomeInput from "@/components/UI/CustomeInput";
import LinkedCard from "@/components/UI/link-card/LinkCard";
import BtcIcon from "@/public/icons/BtcIcon";
import CorrosIcon from "@/public/icons/CorrosIcon";
import QrIcon from "@/public/icons/QrIcon";
import { useRouter } from "next/navigation";

const SendPage = () => {
  const router = useRouter();
  return (
    <PageLayout title="Send">
      {/* <SelectOption /> */}
      <div className="mt-4 flex flex-col gap-4">
        <LinkedCard
          icon={<BtcIcon />}
          type="crypto-link"
          label="Select a coin"
          title="BTC"
          link="/wallet/select-asset"
        />

        <AutoComplete
          onClick={(e) => {
            ("");
          }}
          list={["iron man", "ppp", "ttt"]}
          label={"Blockchain Network"}
        />
        <CustomeInput
          icon={<QrIcon onClick={() => router.push("/wallet/screener")} />}
          placeholder="13agdGAFDe...3SmkjUYR"
          label="Amount"
          inputType="stroke"
        />

        <CustomeInput
          icon={<CorrosIcon onClick={() => ""} />}
          placeholder="13agdGAFDe...3SmkjUYR"
          label="To"
          inputType="stroke"
        />

        <CustomeInput
          disabled
          placeholder="0.0001 BTC"
          label="Fee"
          inputType="stroke"
        />

        <Button size="lg" className="w-fit mx-auto mt-6">
          Confirm
        </Button>
      </div>
    </PageLayout>
  );
};

export default SendPage;
