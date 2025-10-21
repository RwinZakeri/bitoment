import PageLayout from "@/components/layout/page/pageLayout";
import SwapHistoryCard from "@/components/UI/swap-history-card/page";
import TitleLink from "@/components/UI/title-link";
import BtcIcon from "@/public/icons/BtcIcon";
import EtcIcon from "@/public/icons/EtcIcon";
import { useId } from "react";

const SwapHistoryPage = () => {
  const id = useId();

  return (
    <PageLayout title="swap History">
      <TitleLink margin={24} label="12 June 2023" type="date" title="Today">
       <div className="flex flex-col gap-2">
         {Array.from({ length: 4 }).map(() => (
          <SwapHistoryCard
            key={id}
            iconOne={<BtcIcon />}
            iconTwo={<EtcIcon />}
            cryptoOne="BTC"
            cryptoTwo="ETC"
            amount="3.927 ETH"
            label="Today - 03:00 "
          />
        ))}
       </div>
      </TitleLink>
    </PageLayout>
  );
};

export default SwapHistoryPage;
