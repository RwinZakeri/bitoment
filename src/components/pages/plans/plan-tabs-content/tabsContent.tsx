"use client";
import Button from "@/components/UI/button";
import CustomeInput from "@/components/UI/CustomeInput";
import DoughnutChart from "@/components/UI/doughnut-chart";
import LineChart from "@/components/UI/line-chart";
import Paper from "@/components/UI/paper";
import Rank from "@/components/UI/rank";
import Stepper from "@/components/UI/stepper";
import TransformButton from "@/components/UI/transform-button";
import AwardIcon from "@/public/icons/AwardIcon";
import ChartFrameIcon from "@/public/icons/ChartFrameIcon";
import DocumentIcon from "@/public/icons/DocumentIcon";
import LineChartIcon from "@/public/icons/LineChartIcon";
import WindowIcon from "@/public/icons/WindowIcon";
import womenBtc from "@/public/svgs/women-btc.svg";
import Image from "next/image";
import { palnFeatures } from "./type";

const PerformanceTab = () => {
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

  const assetAllocationData = {
    labels: ["Bitcoin", "Ethereum", "Solana", "Tether", "Others"],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "#F7931A", // Bitcoin orange
          "#627EEA", // Ethereum blue
          "#9945FF", // Solana purple
          "#26A17B", // Tether green
          "#6B7280", // Others gray
        ],
        borderColor: ["#F7931A", "#627EEA", "#9945FF", "#26A17B", "#6B7280"],
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className="p-2 mt-4">
      <div className="w-full flex bg-white rounded-2xl p-4">
        <p className="text-xs">
          Low-risk investments focus on well-established cryptocurrencies,
          offering stable returns with lower risk.
        </p>
        <Image src={womenBtc} alt="women btc" width={100} height={100} />
      </div>

      <div className="flex mt-7 justify-between items-center">
        <TransformButton
          className="bg-teal-light"
          icon={
            <Image src="/svgs/rington.svg" alt="Send" width={24} height={24} />
          }
          label="News"
          clickHandler={() => console.log("object")}
        />
        <TransformButton
          className="bg-teal-light"
          icon={
            <Image
              src="/svgs/swap-teal.svg"
              alt="Receive"
              width={24}
              height={24}
            />
          }
          label="Transactions"
          clickHandler={() => console.log("object")}
        />
        <TransformButton
          className="bg-teal-light"
          icon={
            <Image
              src="/svgs/calculator.svg"
              alt="Swap"
              width={24}
              height={24}
            />
          }
          label="Calculation"
          clickHandler={() => console.log("object")}
        />
        <TransformButton
          className="bg-teal-light"
          icon={
            <Image src="/svgs/plus-teal.svg" alt="Add" width={24} height={24} />
          }
          label="Invest"
          clickHandler={() => console.log("object")}
        />
      </div>
      <Paper className="bg-white p-4 mt-2 rounded-xl" label="Features">
        <div className="flex flex-col gap-4 ">
          {palnFeatures.map((item) => (
            <div
              className="flex shadow-sm p-3 mt-2 rounded-xl items-center justify-between gap-2 text-sm"
              key={item.title}
            >
              <Image
                src={item.address}
                alt={item.title}
                width={50}
                height={50}
              />
              <p>{item.title}</p>{" "}
            </div>
          ))}
        </div>
      </Paper>
      <Paper
        icon={<LineChartIcon className="ml-2" />}
        className="bg-white p-2 rounded-2xl mt-4"
        label="Fund Performance Chart"
      >
        <LineChart data={chartData} />
      </Paper>

      <Paper
        icon={<WindowIcon />}
        className="bg-white p-4 rounded-2xl mt-4"
        label="Asset Allocation"
      >
        <div className="h-80">
          <DoughnutChart data={assetAllocationData} />
        </div>
      </Paper>
      <Paper
        className="mt-4 bg-white rounded-2xl p-4"
        label="Capital Growth Estimate"
        icon={<ChartFrameIcon />}
      >
        <div className="mt-4">
          <CustomeInput
            placeholder="0.00"
            label="Price"
            variant="secondary"
            inputType="stroke"
          />
        </div>
        <Paper className="mt-4" label="Investment Duration">
          <div className="mt-2 flex items-center justify-center w-full">
            <Stepper steps={["1m", "3m", "6m", "1y"]} passedSteps={2} />
          </div>
          <div className="mt-6">
            <Rank
              icon={<AwardIcon />}
              percentage={10}
              currency={"USDT"}
              label={"Asset Value After 1 Months:"}
              amount={16480}
            />
          </div>
        </Paper>
      </Paper>
      <Paper
        label="Documentation"
        className="bg-white rounded-2xl p-4 mt-4"
        icon={<DocumentIcon />}
      >
        <div className="flex flex-col gap-4">
          <p className="my-6 text-gray-500">
            Investments in cryptocurrencies with high market value and strong
            history.
          </p>
          <p className="mb-6 text-gray-500">
            More stable returns, though generally lower compared to high-risk
            options.
          </p>
          <p className="mb-6 text-gray-500">
            Lower interest rates but carry less risk than other
            cryptocurrencies.
          </p>
        </div>

        <Button size="sm" variant="outline-dark" className="w-9/12 mx-auto">
          <p>Learn More</p>
        </Button>
      </Paper>

      <Button size="sm" className="w-full mx-auto my-4">
        Invest
      </Button>
    </div>
  );
};

const FeaturTab = () => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Pro Plan</h3>
      <p className="text-gray-600">Advanced features for serious traders.</p>
      <ul className="mt-4 space-y-2">
        <li>• Unlimited transactions</li>
        <li>• Advanced analytics</li>
        <li>• Priority support</li>
        <li>• API access</li>
      </ul>
    </div>
  );
};

const OperationTab = () => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Enterprise Plan</h3>
      <p className="text-gray-600">Custom solutions for large organizations.</p>
      <ul className="mt-4 space-y-2">
        <li>• Custom integrations</li>
        <li>• Dedicated account manager</li>
        <li>• 24/7 phone support</li>
        <li>• White-label options</li>
      </ul>
    </div>
  );
};

const DocumentationTab = () => {
  return (
    <div className="p-4">
      <h1>hello world</h1>
    </div>
  );
};

export { DocumentationTab, FeaturTab, OperationTab, PerformanceTab };
