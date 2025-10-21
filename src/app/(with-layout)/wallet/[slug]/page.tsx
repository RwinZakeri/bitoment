"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import ActionButtons from "@/components/module/action-button/actionButtons";
import CryptoCard from "@/components/UI/crypto-card/page";
import CryptoCredit from "@/components/UI/crypto-credit";
import TitleLink from "@/components/UI/title-link";
import BtcIcon from "@/public/icons/BtcIcon";
import EtcIcon from "@/public/icons/EtcIcon";
import TetherIcon from "@/public/icons/TetherIcon";
import { use } from "react";

export default function CryptoSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  use(params);

  return (
    <PageLayout title="BTC Wallet">
      <div className="mt-6">
        <CryptoCredit
          label="USDT  Balance"
          price="112,345.67"
          amount={"56,786.04 (+1.37%)"}
          icon={<TetherIcon className="w-7 h-7" />}
        />
      </div>
      <ActionButtons />
      <TitleLink
        margin={64}
        title="Wallet History"
        address="/wallet/history"
        type="link"
        label="Show All"
      >
        <TitleLink margin={28} title="Today" label="12 June 2023" type="date">
          <div className="flex flex-col gap-3">
            <CryptoCard
              amount="1.2 BTC"
              title="BTC"
              label="Today - 00:00"
              icon={<BtcIcon />}
              type="up"
              price={"67,890.12"}
            />
            <CryptoCard
              amount="1.2 BTC"
              title="BTC"
              label="Today - 00:00"
              icon={<EtcIcon />}
              type="link"
              price={"67,890.12"}
            />
            <CryptoCard
              amount="1.2 BTC"
              title="BTC"
              label="Today - 00:00"
              icon={<BtcIcon />}
              type="down"
              price={"67,890.12"}
            />
          </div>
        </TitleLink>
      </TitleLink>
    </PageLayout>
  );
}
