"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import ActionButtons from "@/components/module/action-button/actionButtons";
import { WalletSkeleton } from "@/components/module/skeleton";
import CryptoCard from "@/components/UI/crypto-card";
import CryptoCredit from "@/components/UI/crypto-credit";
import TitleLink from "@/components/UI/title-link";
import axios from "@/config/axios.config";
import { useCurrency } from "@/context/currencyContext";
import {
  aliasMap,
  formatCurrency,
  generateRandomPercentage,
  getAssetIcon,
  getCryptoIcon,
} from "@/lib/utils";
import { AssetDistributionResponse } from "@/types";
import type { GetWalletHistoryResponse } from "@/types/auth";
import ReactQueryKey from "@/types/react_query_key";
import { useQuery } from "@tanstack/react-query";
import { use, useMemo } from "react";

export default function CryptoSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { currency } = useCurrency();
  const { slug } = use(params);

  const { data: assetData, isLoading: assetLoading } = useQuery({
    queryKey: [ReactQueryKey.wallet, ReactQueryKey.walletAssetDistribution],
    queryFn: async () => {
      const response = await axios.get<AssetDistributionResponse>(
        "/wallet/assetDistribution"
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const currentAsset = useMemo(() => {
    if (!assetData?.data) return null;
    const normalizedSlug = slug.toUpperCase();

    let asset = assetData.data.find(
      (asset) => asset.name.toUpperCase() === normalizedSlug
    );

    if (!asset && aliasMap[normalizedSlug]) {
      asset = assetData.data.find(
        (a) =>
          a.name.toUpperCase() === aliasMap[normalizedSlug] ||
          a.name.toUpperCase() === normalizedSlug
      );
    }

    return asset || null;
  }, [assetData, slug]);

  const { data: historyData, isLoading: historyLoading } = useQuery({
    queryKey: [ReactQueryKey.wallet, ReactQueryKey.walletHistory, slug],
    queryFn: async () => {
      const response = await axios.get<GetWalletHistoryResponse>(
        `/wallet/history`
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!slug,
  });

  const walletBalance = currentAsset ? parseFloat(currentAsset.price) : 0;
  const percentageChange = generateRandomPercentage();

  if (assetLoading || historyLoading) {
    return (
      <PageLayout title={`${slug.toUpperCase()} Wallet`}>
        <WalletSkeleton />
      </PageLayout>
    );
  }

  if (!currentAsset) {
    return (
      <PageLayout title={`${slug.toUpperCase()} Wallet`}>
        <div className="mt-8 flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Asset not found
            </h3>
            <p className="text-gray-500">
              The asset &quot;{slug}&quot; could not be found in your wallet.
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={`${currentAsset.name.toUpperCase()} Wallet`}>
      <div className="mt-6">
        <CryptoCredit
          label={`${currentAsset.name.toUpperCase()} Balance`}
          price={formatCurrency(walletBalance, currency)}
          priceLabel={currency}
          amount={`${percentageChange.toFixed(2)}%`}
          icon={getAssetIcon(currentAsset)}
        />
      </div>
      <ActionButtons />
      <TitleLink
        margin={64}
        title="Wallet History"
        address={`/wallet/history?crypto=${slug.toUpperCase()}`}
        type="link"
        label="Show All"
      >
        {!historyData?.data || historyData.data.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No transaction history
              </h3>
              <p className="text-gray-500">
                You don&apos;t have any {currentAsset.name.toUpperCase()}{" "}
                transactions yet.
              </p>
            </div>
          </div>
        ) : (
          historyData.data.slice(0, 2).map((day, dayIndex) => (
            <TitleLink
              key={dayIndex}
              margin={28}
              title={day.dateAsName}
              label={day.date}
              type="date"
            >
              <div className="flex flex-col gap-3">
                {day.transactions
                  .slice(0, 3)
                  .map((transaction, transactionIndex) => (
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
      </TitleLink>
    </PageLayout>
  );
}
