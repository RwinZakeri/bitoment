"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import Alert from "@/components/UI/alert";
import AutoComplete from "@/components/UI/auto-complete";
import Button from "@/components/UI/button";
import LinkedCard from "@/components/UI/link-card/LinkCard";
import BtcIcon from "@/public/icons/BtcIcon";

const ReceivePage = () => {
  return (
    <PageLayout title="Select a Token">
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
            console.log(e);
          }}
          list={["iron man", "ppp", "ttt"]}
          label={"Blockchain Network"}
        />

        <Alert>
          <p className="text-sm">
            The minimum deposit amount on TRX (TRC20) in Bitoment is 0.001 USDT.
          </p>
        </Alert>

        <div className="w-full flex items-center justify-center">
          <div className="w-32 h-32 bg-white"></div>
        </div>

        <div className="w-60 bg-white rounded-2xl p-4 mx-auto my-4">
          <p className="text-gray-500 text-center">Your BTC Address</p>
          <p className="text-center font-semibold">
            13agdGAFDemeczdfef gr3SmkjUYR
          </p>
        </div>

        <p className="text-gray-500 text-center">
          Send only bitcoin (BTC) to this address. Sending any other coins may
          lead to their irretrievable loss.
        </p>
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="lg" className="w-full">
            Share
          </Button>
          <Button size="lg" className="w-full">
            Copy
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default ReceivePage;
