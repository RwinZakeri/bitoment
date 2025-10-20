import PageLayout from "@/components/layout/page/pageLayout";
import CryptoCard from "@/components/UI/crypto-card/page";
import Paper from "@/components/UI/paper";
import VerifyInput from "@/components/UI/verify-input";
import BtcIcon from "@/public/icons/BtcIcon";

const SelectAsset = () => {
  return (
    <PageLayout title="Select Asset to Buy">
      <div className="mt-10">
        <VerifyInput inputSize="sm" placeholder="Search Crypto..." />
      </div>
      <Paper label="All Assets" className="mt-12">
        <div className="my-4 flex flex-col gap-3">
          <CryptoCard
            type="up"
            title="Bitcoin"
            cryptoName="BTC"
            label="BTC"
            icon={<BtcIcon className="w-5 h-5" />}
            price={"7,367.78"}
            amount="+2.32%"
            cardType="asset"
          />
           <CryptoCard
            type="up"
            title="Bitcoin"
            cryptoName="BTC"
            label="BTC"
            icon={<BtcIcon className="w-5 h-5" />}
            price={"7,367.78"}
            amount="+2.32%"
            cardType="asset"
          />
           <CryptoCard
            type="up"
            title="Bitcoin"
            cryptoName="BTC"
            label="BTC"
            icon={<BtcIcon className="w-5 h-5" />}
            price={"7,367.78"}
            amount="+2.32%"
            cardType="asset"
          />
           <CryptoCard
            type="up"
            title="Bitcoin"
            cryptoName="BTC"
            label="BTC"
            icon={<BtcIcon className="w-5 h-5" />}
            price={"7,367.78"}
            amount="+2.32%"
            cardType="asset"
          />
           <CryptoCard
            type="up"
            title="Bitcoin"
            cryptoName="BTC"
            label="BTC"
            icon={<BtcIcon className="w-5 h-5" />}
            price={"7,367.78"}
            amount="+2.32%"
            cardType="asset"
          />
        </div>
      </Paper>
    </PageLayout>
  );
};

export default SelectAsset;
