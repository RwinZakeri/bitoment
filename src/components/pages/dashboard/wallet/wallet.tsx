"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import ActionButtons from "@/components/module/action-button/actionButtons";
import { WalletSkeleton } from "@/components/module/skeleton";
import TotalPrice from "@/components/module/total-price";
import Button from "@/components/UI/button";
import CryptoCard from "@/components/UI/crypto-card";
import CurrencyProgressCard from "@/components/UI/currency-progress-card";
import Paper from "@/components/UI/paper";
import TitleLink from "@/components/UI/title-link";
import axios from "@/config/axios.config";
import {
  formatCurrency,
  generateRandomPercentage,
  getCryptoIcon,
} from "@/lib/utils";
import CpgIcon from "@/public/icons/CpgIcon";
import { AssetData, AssetDistributionResponse } from "@/types";
import type { GetWalletHistoryResponse, GetWalletResponse } from "@/types/auth";
import ReactQueryKey from "@/types/react_query_key";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const Wallet = () => {
  const { data: walletData, isLoading: walletLoading } = useQuery({
    queryKey: [ReactQueryKey.wallet, ReactQueryKey.walletBalance],
    queryFn: async () => {
      const response = await axios.get<GetWalletResponse>("wallet");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

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

  const router = useRouter();

  const { data: historyData, isLoading: historyLoading } = useQuery({
    queryKey: [ReactQueryKey.wallet, ReactQueryKey.walletHistory],
    queryFn: async () => {
      const response = await axios.get<GetWalletHistoryResponse>(
        "/wallet/history"
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const walletBalance = walletData?.wallet?.balance || 0;
  const percentageChange = generateRandomPercentage();

  if (walletLoading || assetLoading || historyLoading) {
    return (
      <PageLayout title="My Wallet" className="px-5">
        <WalletSkeleton />
      </PageLayout>
    );
  }

  return (
    <PageLayout title="My Wallet" className="px-5">
      <Paper className="mt-6 p-6 py-8 shadow-lg rounded-xl bg-gray-100">
        <TotalPrice
          labelPosition="top"
          className="flex-col"
          totalPrice={formatCurrency(walletBalance)}
          amount={percentageChange}
          button={
            <Button
              onClick={() => router.push("/wallet/cpg")}
              size="sm"
              className="px-2"
              icon={<CpgIcon />}
            >
              CPG
            </Button>
          }
          percentageColor={
            percentageChange < 0 ? "text-red-500" : "text-cyan-600"
          }
          iconColor={percentageChange < 0 ? "text-red-500" : "text-cyan-600"}
          iconRotation={percentageChange < 0 ? "rotate-180" : ""}
        />
      </Paper>
      <ActionButtons />

      <TitleLink
        margin={32}
        title="Asset Distribution"
        label="View All"
        type="link"
        address="/wallet/asset-distribution"
      >
        <Paper className="bg-white p-4 grid grid-cols-2 gap-6 rounded-lg">
          {assetData?.data
            ?.slice(0, 4)
            .map((asset: AssetData, index: number) => (
              <CurrencyProgressCard
                key={index}
                vertical
                icon={asset.icon ? asset.icon : ""}
                price={formatCurrency(parseFloat(asset.price))}
                progress={parseInt(asset.percentage)}
                title={asset.name.toLowerCase()}
              />
            ))}
        </Paper>
      </TitleLink>

      <TitleLink
        margin={32}
        title="Wallet History"
        address="/wallet/history"
        type="link"
        label="Show All"
      >
        {historyData?.data?.slice(0, 2).map((day, dayIndex) => (
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
        ))}
      </TitleLink>
    </PageLayout>
  );
};

export default Wallet;
