"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import CryptoCredit from "@/components/UI/crypto-credit";
import BinanceIcon from "@/public/icons/BinanceIcon";
import SolIcon from "@/public/icons/SolIcon";
import TetherIcon from "@/public/icons/TetherIcon";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const OtherPage = () => {
  const t = useTranslations();
  const router = useRouter();

  return (
    <PageLayout title={t("wallet.other")}>
      <div className="mt-6">
        <CryptoCredit
          label={t("wallet.usdtBalance")}
          price="112,345.67"
          amount={"56,786.04 (+1.37%)"}
          icon={<SolIcon className="w-7 h-7" />}
          type="link"
          clickHandler={() => router.push("/wallet/btc")}
        />
        <div className="mt-6">
          <CryptoCredit
            label={t("wallet.usdtBalance")}
            price="112,345.67"
            amount={"56,786.04 (+1.37%)"}
            color="#D6E5FF"
            icon={<TetherIcon className="w-7 h-7" />}
            type="link"
            clickHandler={() => router.push("/wallet/tether")}
          />
        </div>
        <div className="mt-6">
          <CryptoCredit
            label={t("wallet.usdtBalance")}
            price="112,345.67"
            amount={"56,786.04 (+1.37%)"}
            color="#EDD9F3"
            icon={<BinanceIcon className="w-7 h-7" />}
            type="link"
            clickHandler={() => router.push("/wallet/bnb")}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default OtherPage;

