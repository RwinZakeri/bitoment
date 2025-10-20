"use client";

import PageLayout from "@/components/layout/page/pageLayout";
import CryptoCard from "@/components/UI/crypto-card/page";
import Filters from "@/components/UI/filters";
import { filters } from "@/components/UI/filters/type";
import TitleLink from "@/components/UI/title-link";
import BtcIcon from "@/public/icons/BtcIcon";

const RiskReportPage = () => {
  return (
    <PageLayout title="Risk Report">
      <div className="mt-4">
        <Filters
          onClick={(e) => console.log(e)}
          selectedQuery="all"
          FiltersItems={filters}
        />
      </div>
      <TitleLink
        title="Today"
        margin={24}
        type="date"
        label="12 June 2023"
        className=""
      >
        <CryptoCard
          riskLevel={{
            level: 42,
            text: "Moderate",
          }}
          cardType="risk"
          amount="1.2 BTC"
          title="BTC"
          label="Today - 00:00"
          icon={<BtcIcon />}
          type="up"
          price={"67,890.12"}
        />
      </TitleLink>
    </PageLayout>
  );
};

export default RiskReportPage;
