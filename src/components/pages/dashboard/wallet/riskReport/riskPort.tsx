"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import { RiskReportSkeleton } from "@/components/module/skeleton";
import Filters from "@/components/UI/filters";
import { filters } from "@/components/UI/filters/type";
import RiskReportCard from "@/components/UI/risk-report";
import TitleLink from "@/components/UI/title-link";
import axios from "@/config/axios.config";
import BinanceIcon from "@/public/icons/BinanceIcon";
import BtcIcon from "@/public/icons/BtcIcon";
import EtcIcon from "@/public/icons/EtcIcon";
import SolIcon from "@/public/icons/SolIcon";
import TetherIcon from "@/public/icons/TetherIcon";
import type { GetRiskReportResponse } from "@/types/auth";
import ReactQueryKey from "@/types/react_query_key";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Suspense, useState } from "react";

const RiskReportContent = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const {
    data: riskReportData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      ReactQueryKey.wallet,
      ReactQueryKey.walletRiskReport,
      selectedFilter,
    ],
    queryFn: async () => {
      const response = await axios.get<GetRiskReportResponse>(
        `/wallet/risk?filter=${selectedFilter}`
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
      <PageLayout title="Risk Report">
        <RiskReportSkeleton />
      </PageLayout>
    );
  }

  if (isError) {
    return (
      <PageLayout title="Risk Report">
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
              Unable to load risk report
            </h3>
            <p className="text-gray-500 mb-4">
              There was an error loading your risk report. Please try again.
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
    <PageLayout title="Risk Report">
      <div className="mt-4">
        <Filters
          onClick={setSelectedFilter}
          selectedQuery={selectedFilter}
          FiltersItems={filters}
        />
      </div>

      {!riskReportData?.data || riskReportData.data.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No risk report data
            </h3>
            <p className="text-gray-500">
              You don&apos;t have any risk report data yet.
            </p>
          </div>
        </div>
      ) : (
        riskReportData.data.map((day, dayIndex) => (
          <TitleLink
            key={dayIndex}
            margin={28}
            title={day.dateAsName}
            label={day.date}
            type="date"
          >
            <div className="flex flex-col gap-3">
              {day.transactions.map((transaction, transactionIndex) => (
                <Link
                  key={transactionIndex}
                  href={`/wallet/risk/${transaction.riskLevel}`}
                >
                  <RiskReportCard
                    riskLevel={transaction.riskLevel}
                    amount={transaction.amount}
                    price={transaction.price}
                    assetAmount={transaction.assetAmount}
                    title={transaction.title}
                    icon={getCryptoIcon(transaction.title)}
                    type={transaction.type}
                  />
                </Link>
              ))}
            </div>
          </TitleLink>
        ))
      )}
    </PageLayout>
  );
};

const RiskReport = () => {
  return (
    <Suspense
      fallback={
        <PageLayout title="Risk Report">
          <RiskReportSkeleton />
        </PageLayout>
      }
    >
      <RiskReportContent />
    </Suspense>
  );
};

export default RiskReport;
