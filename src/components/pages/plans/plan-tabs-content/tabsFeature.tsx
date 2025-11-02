"use client";
import Button from "@/components/UI/button";
import CustomeInput from "@/components/UI/CustomeInput";
import DoughnutChart from "@/components/UI/doughnut-chart";
import Paper from "@/components/UI/paper";
import Rank from "@/components/UI/rank";
import Stepper from "@/components/UI/stepper";
import TransformButton from "@/components/UI/transform-button";
import AwardIcon from "@/public/icons/AwardIcon";
import ChartFrameIcon from "@/public/icons/ChartFrameIcon";
import DocumentIcon from "@/public/icons/DocumentIcon";
import DocumentWithEyeIcon from "@/public/icons/DocumentWithEyeIcon";
import LineChartIcon from "@/public/icons/LineChartIcon";
import WindowIcon from "@/public/icons/WindowIcon";
import twoWomanOneBitcoin from "@/public/svgs/twoWomanOneBitcoin.svg";
import Image from "next/image";
import { v4 as uuid } from "uuid";
const FeaturesTab = () => {
  const assetAllocationData = {
    labels: ["Bitcoin", "Ethereum", "Solana", "Tether", "Others"],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "#F7931A",
          "#627EEA",
          "#9945FF",
          "#26A17B",
          "#6B7280",
        ],
        borderColor: ["#F7931A", "#627EEA", "#9945FF", "#26A17B", "#6B7280"],
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className="p-2 mt-4">
      <div className="w-full flex bg-white justify-between rounded-2xl p-4">
        <p className="text-sm w-64">
          Smart investing in traditional markets and cryptocurrencies with a
          focus on maximizing returns and managing risk.
        </p>
        <Image
          src={twoWomanOneBitcoin}
          alt="women btc"
          width={100}
          height={100}
        />
      </div>

      <div className="flex mt-7 justify-between items-center">
        <TransformButton
          className="bg-teal-light"
          icon={
            <Image src="/svgs/rington.svg" alt="Send" width={24} height={24} />
          }
          label="News"
          clickHandler={() => ""}
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
          clickHandler={() => ""}
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
          clickHandler={() => ""}
        />
        <TransformButton
          className="bg-teal-light"
          icon={
            <Image src="/svgs/plus-teal.svg" alt="Add" width={24} height={24} />
          }
          label="Invest"
          clickHandler={() => ""}
        />
      </div>
      <Paper
        icon={<DocumentWithEyeIcon />}
        className="bg-white p-4 rounded-2xl mt-4"
        label="Asset Allocation"
      >
        <div className="grid grid-cols-2">
          {Array.from({ length: 4 }).map(() => {
            return (
              <div
                key={uuid()}
                className="w-full text-center py-2 flex flex-col gap-2"
              >
                <p className="text-base">Last Month</p>
                <p className="text-2xl font-semibold text-teal-500">+22.28%</p>
              </div>
            );
          })}
        </div>
      </Paper>
      <Paper
        icon={<LineChartIcon className="ml-2" />}
        className="bg-white p-2 rounded-2xl mt-4"
        label="Fund Performance Chart"
      >
        <div className="mt-4 flex-col flex gap-4">
          <div className="flex justify-between border-b-[1px] border-gray-300 ">
            <p className="text-xs">Fund Type :</p>{" "}
            <p className="text-gray-400 text-xs">Active</p>
          </div>

          <div className="flex justify-between border-b-[1px] border-gray-300 ">
            <p className="text-xs">Fund Performance Fee :</p>{" "}
            <p className="text-gray-400 text-xs"> 20%</p>
          </div>
          <div className="flex justify-between border-b-[1px] border-gray-300 ">
            <p className="text-xs">Risk Level: :</p>{" "}
            <p className="text-gray-400 text-xs">High Risk</p>
          </div>
          <div className="flex justify-between border-b-[1px] border-gray-300 ">
            <p className="text-xs">Establishment Date :</p>{" "}
            <p className="text-gray-400 text-xs">1401/12/20 - 10:00</p>
          </div>
          <div className="flex justify-between border-b-[1px] border-gray-300 ">
            <p className="text-xs">Minimum Investment Amount :</p>{" "}
            <p className={`text-xs`}>ssss</p>
          </div>
        </div>
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

        <Button
          size="sm"
          variant="outline-dark"
          className="w-9/12 w-full mx-auto"
        >
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

export { DocumentationTab, FeaturesTab, FeaturTab, OperationTab };
