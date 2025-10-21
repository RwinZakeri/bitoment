"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import CryptoCard from "@/components/UI/crypto-card/page";
import Filters from "@/components/UI/filters";
import { filters } from "@/components/UI/filters/type";
import TitleLink from "@/components/UI/title-link";
import BtcIcon from "@/public/icons/BtcIcon";
import EtcIcon from "@/public/icons/EtcIcon";
const HistoryPage = () => {
  return (
    <PageLayout title="Wallet History">
      <div className="mt-4">
        <Filters
          onClick={(e) => e}
          selectedQuery="all"
          FiltersItems={filters}
        />
      </div>

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
    </PageLayout>
  );
};

export default HistoryPage;
