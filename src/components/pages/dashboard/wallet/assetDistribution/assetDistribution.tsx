"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import { AssetDistributionSkeleton } from "@/components/module/skeleton";
import TotalPrice from "@/components/module/total-price";
import Button from "@/components/UI/button";
import CurrencyProgressCard from "@/components/UI/currency-progress-card";
import Paper from "@/components/UI/paper";
import axios from "@/config/axios.config";
import AddIcon from "@/public/icons/AddIcon";
import { AssetDistributionResponse } from "@/types";
import ReactQueryKey from "@/types/react_query_key";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const AssetDistribution = () => {
  const router = useRouter();

  const { data: walletData, isLoading: walletLoading } = useQuery({
    queryKey: [ReactQueryKey.wallet],
    queryFn: async () => {
      const res = await axios("/wallet");

      return res.data.wallet;
    },
  });

  const { data: assetDistributionData, isLoading: assetDistributionLoading } =
    useQuery({
      queryKey: [ReactQueryKey.assetDistribution],
      queryFn: async () => {
        const res = await axios.get<AssetDistributionResponse>(
          "/wallet/assetDistribution"
        );
        return res.data;
      },
    });

  if (walletLoading || assetDistributionLoading) {
    return (
      <PageLayout title="Asset Distribution" className="px-5">
        <AssetDistributionSkeleton />
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Asset Distribution" className="px-5">
      <Paper className="rounded-xl bg-white mt-4 p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <TotalPrice
            className="flex-col"
            button={
              <Button
                size="sm"
                icon={<AddIcon />}
                onClick={() => router.push("/wallet/invest")}
                className="p-0 px-2 rounded-sm"
              >
                Add
              </Button>
            }
            totalPrice={walletData?.balance}
          />
        </div>

        <div className="mt-6 space-y-4">
          {}
          {assetDistributionData?.data
            ?.filter((item) => item.name !== "Other")
            .map((item) => (
              <CurrencyProgressCard
                key={item.name}
                title={item.name}
                price={item.price}
                progress={parseInt(item.percentage.split("%")[0])}
                icon={item.icon}
              />
            ))}
        </div>
      </Paper>
    </PageLayout>
  );
};

export default AssetDistribution;
