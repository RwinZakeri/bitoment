import PageLayout from "@/components/layout/page/pageLayout";
import TotalPrice from "@/components/module/total-price";
import {Button} from "@/components/UI/button";
import LineChart from "@/components/UI/line-chart";
import LinkedCard from "@/components/UI/link-card/LinkCard";
import Paper from "@/components/UI/paper";
import PlanCard from "@/components/UI/plan-card";
import TitleLink from "@/components/UI/title-link";
import AddIcon from "@/public/icons/AddIcon";
import CircularProgressIcon from "@/public/icons/CircularProgressIcon";
import CylinderIcon from "@/public/icons/CylinderIcon";
import { LayerIcon } from "@/public/icons/LayerIcon";
import LayoutGridIcon from "@/public/icons/LayoutGridIcon";

const WalletPage = () => {
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
        data: [
          45000, 52000, 48000, 61000, 55000, 67000, 72000, 68000, 75000, 82000,
          78000, 16000,
        ],
        borderColor: "#15E0CC",
        backgroundColor: "rgba(21, 224, 204, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <PageLayout backHidden className="px-5">
      <Paper className="shadow-[2px_2px_15px_rgba(3,145,131,0.4)] bg-white p-4 rounded-lg">
        <TotalPrice
          amount={4.75}
          button={
            <Button
              size="sm"
              icon={<AddIcon />}
              className="p-0 px-2 rounded-sm"
            >
              Add
            </Button>
          }
          totalPrice="638,532.21"
          className="flex-col-reverse"
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
            title="Peace Fund"
            date="09/06/2024 - 08/07/2024"
            icon={<LayerIcon className="w-6 h-6" />}
            amount={"4"}
            price={"71,367.78"}
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
            title="Peace Fund"
            date="Up to 1.70% per year"
            icon={<CylinderIcon className="w-6 h-6" />}
          />
        </TitleLink>
      </div>
    </PageLayout>
  );
};

export default WalletPage;
