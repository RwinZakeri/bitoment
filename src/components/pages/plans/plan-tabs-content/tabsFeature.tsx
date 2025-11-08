"use client";
import Button from "@/components/UI/button";
import CustomeInput from "@/components/UI/CustomeInput";
import DoughnutChart from "@/components/UI/doughnut-chart";
import Paper from "@/components/UI/paper";
import Rank from "@/components/UI/rank";
import Stepper from "@/components/UI/stepper";
import TransformButton from "@/components/UI/transform-button";
import { useCurrency } from "@/context/currencyContext";
import {
  assetAllocationData,
  durationLabels,
  returnPercentages,
  steps,
} from "@/lib/utils";
import AwardIcon from "@/public/icons/AwardIcon";
import ChartFrameIcon from "@/public/icons/ChartFrameIcon";
import DocumentIcon from "@/public/icons/DocumentIcon";
import DocumentWithEyeIcon from "@/public/icons/DocumentWithEyeIcon";
import LineChartIcon from "@/public/icons/LineChartIcon";
import WindowIcon from "@/public/icons/WindowIcon";
import twoWomanOneBitcoin from "@/public/svgs/twoWomanOneBitcoin.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
const FeaturesTab = () => {
  const { currency } = useCurrency();
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const [price, setPrice] = useState<string>("");
  const router = useRouter();
  const calculatedAmount = useMemo(() => {
    const priceValue = parseFloat(price) || 0;
    if (priceValue <= 0) return 0;

    const percentage = returnPercentages[selectedStep] || 10;
    const amount = priceValue * (1 + percentage / 100);
    return Math.round(amount * 100) / 100;
  }, [price, selectedStep]);

  const currentPercentage = returnPercentages[selectedStep] || 10;
  const currentDurationLabel = durationLabels[selectedStep] || "1 Month";
  return (
    <div className="p-2 mt-4">
      <div className="w-full flex bg-white dark:bg-gray-200 justify-between rounded-2xl p-4">
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
        className="bg-white dark:bg-gray-200 p-4 rounded-2xl mt-4"
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
        className="bg-white dark:bg-gray-200 p-2 rounded-2xl mt-4"
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
        className="bg-white dark:bg-gray-200 p-4 rounded-2xl mt-4"
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
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <Paper className="mt-4" label="Investment Duration">
          <div className="mt-2 flex items-center justify-center w-full">
            <Stepper
              steps={steps}
              passedSteps={selectedStep + 1}
              onStepClick={setSelectedStep}
            />
          </div>
          <div className="mt-6">
            <Rank
              icon={<AwardIcon />}
              percentage={currentPercentage}
              currency={currency}
              label={`Asset Value After ${currentDurationLabel}:`}
              amount={calculatedAmount}
            />
          </div>
        </Paper>
      </Paper>
      <Paper
        label="Documentation"
        className="bg-white dark:bg-gray-200 rounded-2xl p-4 mt-4"
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

      <Button
        onClick={() => router.push("/wallet/invest")}
        size="sm"
        className="w-full mx-auto my-4"
      >
        Invest
      </Button>
    </div>
  );
};

export { FeaturesTab };
