"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import { HistorySkeleton } from "@/components/module/skeleton";
import CryptoCard from "@/components/UI/crypto-card/page";
import Filters from "@/components/UI/filters";
import { filters } from "@/components/UI/filters/type";
import TitleLink from "@/components/UI/title-link";
import axios from "@/config/axios.config";
import BtcIcon from "@/public/icons/BtcIcon";
import EtcIcon from "@/public/icons/EtcIcon";
import SolIcon from "@/public/icons/SolIcon";
import TetherIcon from "@/public/icons/TetherIcon";
import type { GetWalletHistoryResponse } from "@/types/auth";
import ReactQueryKey from "@/types/react_query_key";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const HistoryPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const {
    data: historyData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      ReactQueryKey.wallet,
      ReactQueryKey.walletHistory,
      selectedFilter,
    ],
    queryFn: async () => {
      const response = await axios.get<GetWalletHistoryResponse>(
        `/wallet/history?filter=${selectedFilter}`
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
        return <EtcIcon className="w-4 h-4" />;
      case "tether":
      case "usdt":
        return <TetherIcon className="w-4 h-4" />;
      case "sol":
        return <SolIcon className="w-4 h-4" />;
      case "bnb":
        return <EtcIcon className="w-4 h-4" />; // Using EtcIcon as placeholder for BNB

      default:
        return <BtcIcon className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <PageLayout title="Wallet History">
        <HistorySkeleton />
      </PageLayout>
    );
  }

  if (isError) {
    return (
      <PageLayout title="Wallet History">
        <div className="mt-4">
          <Filters
            onClick={setSelectedFilter}
            selectedQuery={selectedFilter}
            FiltersItems={filters}
          />
        </div>
        <div className="mt-8 flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Unable to load history
            </h3>
            <p className="text-gray-500 mb-4">
              There was an error loading your wallet history. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Wallet History">
      <div className="mt-4">
        <Filters
          onClick={setSelectedFilter}
          selectedQuery={selectedFilter}
          FiltersItems={filters}
        />
      </div>

      {!historyData?.data || historyData.data.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No transaction history
            </h3>
            <p className="text-gray-500">
              You don&apos;t have any transactions yet. Start by making your
              first transaction.
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

export default HistoryPage;
