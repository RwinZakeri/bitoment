"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import TotalPrice from "@/components/module/total-price";
import Button from "@/components/UI/button";
import CryptoCard from "@/components/UI/crypto-card/page";
import CurrencyProgressCard from "@/components/UI/currency-progress-card";
import Paper from "@/components/UI/paper";
import TitleLink from "@/components/UI/title-link";
import TransformButton from "@/components/UI/transform-button";
import BtcIcon from "@/public/icons/BtcIcon";
import EtcIcon from "@/public/icons/EtcIcon";
import LinkIcon from "@/public/icons/LinkIcon";
import Image from "next/image";

const WalletPage = () => {
  return (
    <PageLayout title="My Wallet" className="px-5">
      <Paper className="mt-6 p-6 py-8 shadow-lg rounded-xl bg-gray-100">
        <TotalPrice
          className="flex-col-reverse"
          totalPrice="638,532.21"
          amount={4.57}
          button={
            <Button size="lg" className="bg-cyan-200 px-2" icon={<LinkIcon />}>
              CGP
            </Button>
          }
        />
      </Paper>
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
        margin={32}
        title="Asset Distribution"
        label="View All"
        type="link"
        address="/"
      >
        <Paper className="bg-white p-4 grid grid-cols-2 gap-6 rounded-lg">
          <CurrencyProgressCard
            vertical
            icon={<BtcIcon />}
            price={"112,345.67"}
            progress={30}
            title="btc"
          />
          <CurrencyProgressCard
            vertical
            icon={<BtcIcon />}
            price={"112,345.67"}
            progress={30}
            title="btc"
          />
          <CurrencyProgressCard
            vertical
            icon={<BtcIcon />}
            price={"112,345.67"}
            progress={30}
            title="btc"
          />
          <CurrencyProgressCard
            vertical
            price={"112,345.67"}
            progress={3}
            title="Other"
          />
        </Paper>
      </TitleLink>

      <TitleLink
        margin={32}
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
};

export default WalletPage;
