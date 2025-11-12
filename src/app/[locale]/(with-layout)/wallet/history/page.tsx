"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import { HistorySkeleton } from "@/components/module/skeleton";
import Button from "@/components/UI/button";
import CryptoCard from "@/components/UI/crypto-card";
import Filters from "@/components/UI/filters";
import { filters } from "@/components/UI/filters/type";
import Popup from "@/components/UI/popup";
import { PopupOption } from "@/components/UI/popup/type";
import TitleLink from "@/components/UI/title-link";
import axios from "@/config/axios.config";
import BinanceIcon from "@/public/icons/BinanceIcon";
import BtcIcon from "@/public/icons/BtcIcon";
import EtcIcon from "@/public/icons/EtcIcon";
import ListIcon from "@/public/icons/ListIcon";
import SolIcon from "@/public/icons/SolIcon";
import TetherIcon from "@/public/icons/TetherIcon";
import type { GetWalletHistoryResponse } from "@/types/auth";
import ReactQueryKey from "@/types/react_query_key";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const HistoryPageContent = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const cryptoParam = searchParams.get("crypto");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"date" | "type" | "amount" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const {
    data: historyData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      ReactQueryKey.wallet,
      ReactQueryKey.walletHistory,
      selectedFilter,
      cryptoParam,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      const cryptoQuery = cryptoParam ? `&crypto=${cryptoParam}` : "";
      const sortQuery = sortBy
        ? `&sortBy=${sortBy}&sortOrder=${sortOrder}`
        : "";
      const response = await axios.get<GetWalletHistoryResponse>(
        `/wallet/history?filter=${selectedFilter}${cryptoQuery}${sortQuery}`
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const getCryptoIcon = (name: string) => {
    
    switch (name.toLowerCase()) {
      case "btc":
        return <BtcIcon className="w-4 h-4" />;
      case "eth":
      case "etc":
        return <EtcIcon className="w-4 h-4" />;
      case "tether":
      case "usdt":
        return <TetherIcon className="w-4 h-4" />;
      case "sol":
        return <SolIcon className="w-4 h-4" />;
      case "bnb":
        return <BinanceIcon className="w-4 h-4" />;
      default:
        return <BtcIcon className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <PageLayout title={t("wallet.walletHistory")}>
        <HistorySkeleton />
      </PageLayout>
    );
  }

  if (isError) {
    return (
      <PageLayout title={t("wallet.walletHistory")}>
        <div className="mt-4">
          <Filters
            onClick={setSelectedFilter}
            selectedQuery={selectedFilter}
            FiltersItems={filters}
          />
        </div>
        <div className="mt-8 flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-foreground mb-2">
              {t("wallet.unableToLoadHistory")}
            </h3>
            <p className="text-gray-500 mb-4">
              {t("wallet.errorLoadingHistory")}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t("wallet.retry")}
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const pageTitle = cryptoParam
    ? t("wallet.cryptoWalletHistory", { crypto: cryptoParam.toUpperCase() })
    : t("wallet.walletHistory");

  
  const popupOptions: PopupOption[] = [
    {
      label: t("wallet.date"),
      icon: "/svgs/date.svg",

      onClick: () => {
        setSortBy("date");
        setSortOrder("asc");
      },
    },

    {
      label: t("wallet.type"),
      icon: "/svgs/type.svg",
      onClick: () => {
        setSortBy("type");
        setSortOrder("asc");
      },
    },

    {
      label: t("wallet.amount"),
      icon: "/svgs/amount.svg",
      onClick: () => {
        setSortBy("amount");
        setSortOrder("asc");
      },
    },
  ];

  return (
    <PageLayout title={pageTitle}>
      <div className="mt-4 flex items-center justify-between">
        <Filters
          onClick={setSelectedFilter}
          selectedQuery={selectedFilter}
          FiltersItems={filters}
        />
        <div className="relative">
          <Button
            ref={buttonRef}
            size="sm"
            variant="text"
            className="bg-white"
            type="button"
            onClick={() => setIsPopupOpen(!isPopupOpen)}
          >
            <ListIcon />
          </Button>
          <Popup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            options={popupOptions}
            triggerRef={buttonRef}
            position="bottom-right"
          />
        </div>
      </div>
      <Button
        onClick={() => router.push("/wallet/risk")}
        size="md"
        className="w-full mt-4"
      >
        {t("wallet.riskReport")}
      </Button>

      {!historyData?.data || historyData.data.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-foreground mb-2">
              {t("wallet.noTransactionHistory")}
            </h3>
            <p className="text-gray-500">
              {t("wallet.noTransactionsYet")}
            </p>
          </div>
        </div>
      ) : (
        historyData.data.map((day, dayIndex) => (
          <TitleLink
            key={dayIndex}
            margin={28}
            title={day.dateAsName}
            label={day.date}
            type="date"
          >
            <div className="flex flex-col gap-3">
              {day.transactions.map((transaction, transactionIndex) => (
                <CryptoCard
                  key={transactionIndex}
                  amount={transaction.amount}
                  title={transaction.title}
                  label={`${day.dateAsName} - ${transaction.hour}`}
                  icon={getCryptoIcon(transaction.title)}
                  type={transaction.type}
                  price={transaction.price}
                />
              ))}
            </div>
          </TitleLink>
        ))
      )}
    </PageLayout>
  );
};

const HistoryPage = () => {
  const t = useTranslations();
  return (
    <Suspense
      fallback={
        <PageLayout title={t("wallet.walletHistory")}>
          <HistorySkeleton />
        </PageLayout>
      }
    >
      <HistoryPageContent />
    </Suspense>
  );
};

export default HistoryPage;

