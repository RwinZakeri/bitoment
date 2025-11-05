"use client";
import Button from "@/components/UI/button";
import CustomeInput from "@/components/UI/CustomeInput";
import DoughnutChart from "@/components/UI/doughnut-chart";
import LineChart from "@/components/UI/line-chart";
import Paper from "@/components/UI/paper";
import Rank from "@/components/UI/rank";
import Stepper from "@/components/UI/stepper";
import TransformButton from "@/components/UI/transform-button";
import {
  assetAllocationData,
  chartData,
  durationLabels,
  returnPercentages,
  steps,
} from "@/lib/utils";
import AwardIcon from "@/public/icons/AwardIcon";
import ChartFrameIcon from "@/public/icons/ChartFrameIcon";
import DocumentIcon from "@/public/icons/DocumentIcon";
import LineChartIcon from "@/public/icons/LineChartIcon";
import WindowIcon from "@/public/icons/WindowIcon";
import womenBtc from "@/public/svgs/women-btc.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { palnFeatures } from "./type";

const PerformanceTab = () => {
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

  const handleInvestClick = () => {
    if (!price || parseFloat(price) <= 0) {
      toast.error("Please enter a valid investment amount");
      return;
    }

    const priceValue = parseFloat(price);
    toast.success(
      `Investment Details:\nAmount: ${priceValue.toFixed(
        2
      )} USDT\nDuration: ${currentDurationLabel}\nReturn: ${currentPercentage}%\nFinal Value: ${calculatedAmount.toFixed(
        2
      )} USDT`,
      {
        duration: 5000,
        style: {
          whiteSpace: "pre-line",
          maxWidth: "400px",
        },
      }
    );

    router.push("/wallet/invest");
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
              currency={"USDT"}
              label={`Asset Value After ${currentDurationLabel}:`}
              amount={calculatedAmount}
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

        <Button size="sm" variant="outline-dark" className="w-full mx-auto">
          <p>Learn More</p>
        </Button>
      </Paper>

      <Button
        onClick={handleInvestClick}
        size="sm"
        className="w-full mx-auto my-4"
      >
        Invest
      </Button>
    </div>
  );
};

export { PerformanceTab };
