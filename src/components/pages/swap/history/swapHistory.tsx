"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import { HistorySkeleton } from "@/components/module/skeleton";
import SwapHistoryCard from "@/components/UI/swap-history-card/page";
import TitleLink from "@/components/UI/title-link";
import axios from "@/config/axios.config";
import BinanceIcon from "@/public/icons/BinanceIcon";
import BtcIcon from "@/public/icons/BtcIcon";
import EtcIcon from "@/public/icons/EtcIcon";
import SolIcon from "@/public/icons/SolIcon";
import TetherIcon from "@/public/icons/TetherIcon";
import type { GetSwapHistoryResponse } from "@/types/auth";
import ReactQueryKey from "@/types/react_query_key";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const SwapHistory = () => {
  const t = useTranslations();
  const {
    data: swapHistoryData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [ReactQueryKey.swapHistory],
    queryFn: async () => {
      const response = await axios.get<GetSwapHistoryResponse>(`/swap/history`);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const getCryptoIcon = (symbol: string) => {
    switch (symbol.toUpperCase()) {
      case "BTC":
        return <BtcIcon className="w-4 h-4" />;
      case "ETH":
      case "ETC":
        return <EtcIcon className="w-4 h-4" />;
      case "USDT":
        return <TetherIcon className="w-4 h-4" />;
      case "SOL":
        return <SolIcon className="w-4 h-4" />;
      case "BNB":
        return <BinanceIcon className="w-4 h-4" />;
      default:
        return <BtcIcon className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <PageLayout title={t("swap.swapHistory")}>
        <HistorySkeleton />
      </PageLayout>
    );
  }

  if (isError) {
    return (
      <PageLayout title={t("swap.swapHistory")}>
        <div className="mt-8 flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-foreground mb-2">
              {t("swap.errorLoadingSwapHistory")}
            </h3>
            <p className="text-gray-500">
              {t("swap.errorLoadingSwapHistoryDescription")}
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={t("swap.swapHistory")}>
      {!swapHistoryData?.data || swapHistoryData.data.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-foreground mb-2">
              {t("swap.noSwapHistory")}
            </h3>
            <p className="text-gray-500">{t("swap.noSwapHistoryYet")}</p>
          </div>
        </div>
      ) : (
        swapHistoryData.data.map((day, dayIndex) => (
          <TitleLink
            key={dayIndex}
            margin={24}
            title={day.dateAsName}
            label={day.date}
            type="date"
          >
            <div className="flex flex-col gap-2">
              {day.swaps.map((swap, swapIndex) => (
                <SwapHistoryCard
                  key={swapIndex}
                  iconOne={getCryptoIcon(swap.cryptoOne)}
                  iconTwo={getCryptoIcon(swap.cryptoTwo)}
                  cryptoOne={swap.cryptoOne}
                  cryptoTwo={swap.cryptoTwo}
                  amount={swap.amount}
                  label={`${day.dateAsName} - ${swap.hour}`}
                />
              ))}
            </div>
          </TitleLink>
        ))
      )}
    </PageLayout>
  );
};

export default SwapHistory;
