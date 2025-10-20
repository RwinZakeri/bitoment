import PageLayout from "@/components/layout/page/pageLayout";
import CryptoCredit from "@/components/UI/crypto-credit";
import BinanceIcon from "@/public/icons/BinanceIcon";
import SolIcon from "@/public/icons/SolIcon";
import TetherIcon from "@/public/icons/TetherIcon";

const OtherPage = () => {
  return (
    <PageLayout title="other">
      <div className="mt-6">
        <CryptoCredit
          label="USDT  Balance"
          price="112,345.67"
          amount={"56,786.04 (+1.37%)"}
          icon={<SolIcon className="w-7 h-7" />}
        />
        <div className="mt-6">
          <CryptoCredit
            label="USDT  Balance"
            price="112,345.67"
            amount={"56,786.04 (+1.37%)"}
            color="#D6E5FF"
            icon={<TetherIcon className="w-7 h-7" />}
          />
        </div>
        <div className="mt-6">
          <CryptoCredit
            label="USDT  Balance"
            price="112,345.67"
            amount={"56,786.04 (+1.37%)"}
            color="#EDD9F3"
            icon={<BinanceIcon className="w-7 h-7" />}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default OtherPage;
