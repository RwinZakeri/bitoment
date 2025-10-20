"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import CryptoCard from "@/components/UI/crypto-card/page";
import CryptoCredit from "@/components/UI/crypto-credit";
import TitleLink from "@/components/UI/title-link";
import TransformButton from "@/components/UI/transform-button";
import BtcIcon from "@/public/icons/BtcIcon";
import EtcIcon from "@/public/icons/EtcIcon";
import TetherIcon from "@/public/icons/TetherIcon";
import Image from "next/image";
import { use } from "react";

export default function CryptoSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

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
      <div className="flex mt-7 justify-between items-center">
        <TransformButton
          icon={
            <Image src="/svgs/send.svg" alt="Send" width={24} height={24} />
          }
          label="Send"
          clickHandler={() => console.log("object")}
        />
        <TransformButton
          icon={
            <Image
              src="/svgs/recieve.svg"
              alt="Receive"
              width={24}
              height={24}
            />
          }
          label="Receive"
          clickHandler={() => console.log("object")}
        />
        <TransformButton
          icon={
            <Image src="/svgs/swap.svg" alt="Swap" width={24} height={24} />
          }
          label="Swap"
          clickHandler={() => console.log("object")}
        />
        <TransformButton
          icon={<Image src="/svgs/plus.svg" alt="Add" width={24} height={24} />}
          label="Add"
          clickHandler={() => console.log("object")}
        />
      </div>
      <TitleLink
        margin={64}
        title="Wallet History"
        address="/"
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
