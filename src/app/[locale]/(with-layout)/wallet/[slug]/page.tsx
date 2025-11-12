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
import { useTranslations } from "next-intl";

export default function CryptoSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const t = useTranslations();
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
      <PageLayout title={t("wallet.cryptoWallet", { crypto: slug.toUpperCase() })}>
        <WalletSkeleton />
      </PageLayout>
    );
  }

  if (!currentAsset) {
    return (
      <PageLayout title={t("wallet.cryptoWallet", { crypto: slug.toUpperCase() })}>
        <div className="mt-8 flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-foreground mb-2">
              {t("wallet.assetNotFound")}
            </h3>
            <p className="text-gray-500">
              {t("wallet.assetNotFoundDescription", { asset: slug })}
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={t("wallet.cryptoWallet", { crypto: currentAsset.name.toUpperCase() })}>
      <div className="mt-6">
        <CryptoCredit
          label={t("wallet.cryptoBalance", { crypto: currentAsset.name.toUpperCase() })}
          price={formatCurrency(walletBalance, currency)}
          priceLabel={currency}
          amount={`${percentageChange.toFixed(2)}%`}
          icon={getAssetIcon(currentAsset)}
        />
      </div>
      <ActionButtons />
      <TitleLink
        margin={64}
        title={t("wallet.walletHistory")}
        address={`/wallet/history?crypto=${slug.toUpperCase()}`}
        type="link"
        label={t("wallet.showAll")}
      >
        {!historyData?.data || historyData.data.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-foreground mb-2">
                {t("wallet.noTransactionHistory")}
              </h3>
              <p className="text-gray-500">
                {t("wallet.noCryptoTransactions", { crypto: currentAsset.name.toUpperCase() })}
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

