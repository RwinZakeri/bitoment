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
import AddIcon from "@/public/icons/AddIcon";
import CircularProgressIcon from "@/public/icons/CircularProgressIcon";
import CylinderIcon from "@/public/icons/CylinderIcon";
import { LayerIcon } from "@/public/icons/LayerIcon";
import LayoutGridIcon from "@/public/icons/LayoutGridIcon";
import type { GetWalletResponse } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

function formatCurrency(value: number): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return value.toFixed(2);
  }
}

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["wallet", "balance"],
    queryFn: async () => {
      const response = await axios.get<GetWalletResponse>("wallet");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const generateRandomPercentage = () => {
    const isNegative = Math.random() < 0.4;
    const randomValue = Math.random() * 20;
    return isNegative ? -randomValue : randomValue;
  };

  const mockBalance = data?.wallet?.balance;
  const walletBalance = mockBalance || 0;
  const router = useRouter();
  const percentageChange = generateRandomPercentage();

  const generateChartData = (
    currentBalance: number,
    percentageChange: number
  ): number[] => {
    const months = 12;
    const data: number[] = [];

    const baseValue = currentBalance * (0.7 + Math.random() * 0.1);
    data.push(baseValue);

    for (let i = 1; i < months - 1; i++) {
      const previousValue: number = data[i - 1];
      const volatility = 0.05 + Math.random() * 0.1;
      const trend = (percentageChange / 100) * (i / months);
      const randomChange = (Math.random() - 0.5) * volatility;

      const newValue: number = previousValue * (1 + trend + randomChange);
      data.push(Math.max(0, newValue));
    }

    data.push(Math.max(0, currentBalance));

    return data;
  };

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Portfolio Value",
        data: generateChartData(walletBalance, percentageChange),
        borderColor: "#15E0CC",
        backgroundColor: "rgba(21, 224, 204, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

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
          totalPrice={formatCurrency(walletBalance)}
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
            amount={"4"}
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
          /></Link>
        </TitleLink>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
