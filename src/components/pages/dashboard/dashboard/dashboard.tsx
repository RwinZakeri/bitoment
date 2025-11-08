"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import { DashboardSkeleton } from "@/components/module/skeleton";
import TotalPrice from "@/components/module/total-price";
import { Button } from "@/components/UI/button";
import LineChart from "@/components/UI/line-chart";
import LinkedCard from "@/components/UI/link-card";
import Paper from "@/components/UI/paper";
import PlanCard from "@/components/UI/plan-card";
import TitleLink from "@/components/UI/title-link";
import axios from "@/config/axios.config";
import {
  chartData,
  formatCurrency,
  generateRandomPercentage,
} from "@/lib/utils";
import AddIcon from "@/public/icons/AddIcon";
import CircularProgressIcon from "@/public/icons/CircularProgressIcon";
import CylinderIcon from "@/public/icons/CylinderIcon";
import { LayerIcon } from "@/public/icons/LayerIcon";
import LayoutGridIcon from "@/public/icons/LayoutGridIcon";
import type { GetWalletResponse } from "@/types/auth";
import ReactQueryKey from "@/types/react_query_key";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: [ReactQueryKey.wallet, ReactQueryKey.walletBalance],
    queryFn: async () => {
      const response = await axios.get<GetWalletResponse>("wallet");
      return response.data;
    },
    refetchOnWindowFocus: true,
  });

  const percentageChange = generateRandomPercentage();

  if (isLoading) {
    return (
      <PageLayout backHidden className="px-5">
        <DashboardSkeleton />
      </PageLayout>
    );
  }

  return (
    <PageLayout backHidden className="px-5">
      <Paper className="shadow-[2px_2px_15px_rgba(3,145,131,0.4)] bg-white p-4 rounded-lg">
        <TotalPrice
          amount={percentageChange}
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
          totalPrice={formatCurrency(Number(data?.wallet?.balance))}
          className="flex-col-reverse"
          percentageColor={
            percentageChange < 0 ? "text-red-500" : "text-cyan-600"
          }
          iconColor={percentageChange < 0 ? "text-red-500" : "text-cyan-600"}
          iconRotation={percentageChange < 0 ? "rotate-180" : ""}
        />
        <LineChart data={chartData} />
      </Paper>

      <div className="mt-10">
        <TitleLink
          title="Your Active Plans"
          type="link"
          label="View All"
          address="/plans"
          className="flex gap-2 flex-col"
          margin={0}
        >
          <PlanCard
            title="Peace Fund"
            date="09/06/2024 - 08/07/2024"
            icon={<LayerIcon className="w-6 h-6" />}
            amount={String(percentageChange).substring(3, 5)}
            price={"71,367.78"}
            link="/plans"
          />
          <LinkedCard title="Show more details" size="sm" link="/plans" />
        </TitleLink>
      </div>

      <div className="mt-6">
        <TitleLink
          title="Plans Summary"
          type="link"
          label="Learn More"
          address="/plans"
          className="flex gap-2 flex-col"
          margin={0}
        >
          <Link className="flex flex-col gap-2" href={"/plans"}>
            <PlanCard
              title="Future Fund"
              date="Up to 4.00% per year"
              icon={<CircularProgressIcon className="w-6 h-6" />}
            />
            <PlanCard
              title="Sustainable Wealth Fund"
              date="Up to 2.50% per year"
              icon={<LayoutGridIcon className="w-6 h-6" />}
            />
            <PlanCard
              title="Peace Fund"
              date="Up to 1.70% per year"
              icon={<CylinderIcon className="w-6 h-6" />}
            />
          </Link>
        </TitleLink>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
