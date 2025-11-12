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
import { Link, useRouter } from "@/i18n/routing";
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
import { useTranslations } from "next-intl";

const Dashboard = () => {
  const router = useRouter();
  const t = useTranslations();
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
              icon={<AddIcon className="text-foreground" />}
              onClick={() => router.push("/wallet/invest")}
              className="p-0 px-2 rounded-sm"
            >
              {t("common.add")}
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
          title={t("dashboard.yourActivePlans")}
          type="link"
          label={t("dashboard.viewAll")}
          address="/plans"
          className="flex gap-2 flex-col"
          margin={0}
        >
          <PlanCard
            title={t("dashboard.peaceFund")}
            date="09/06/2024 - 08/07/2024"
            icon={<LayerIcon className="w-6 h-6 text-foreground" />}
            amount={String(percentageChange).substring(3, 5)}
            price={"71,367.78"}
            link="/plans"
          />
          <LinkedCard
            title={t("dashboard.showMoreDetails")}
            size="sm"
            link="/plans"
          />
        </TitleLink>
      </div>

      <div className="mt-6">
        <TitleLink
          title={t("dashboard.plansSummary")}
          type="link"
          label={t("dashboard.learnMore")}
          address="/plans"
          className="flex gap-2 flex-col"
          margin={0}
        >
          <Link className="flex flex-col gap-2" href={"/plans"}>
            <PlanCard
              title={t("dashboard.futureFund")}
              date={t("dashboard.upToPerYear", { percentage: "4.00" })}
              icon={
                <CircularProgressIcon className="w-6 h-6 text-foreground" />
              }
            />
            <PlanCard
              title={t("dashboard.sustainableWealthFund")}
              date={t("dashboard.upToPerYear", { percentage: "2.50" })}
              icon={<LayoutGridIcon className="w-6 h-6 text-foreground" />}
            />
            <PlanCard
              title={t("dashboard.peaceFund")}
              date={t("dashboard.upToPerYear", { percentage: "1.70" })}
              icon={<CylinderIcon className="w-6 h-6 text-foreground" />}
            />
          </Link>
        </TitleLink>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
