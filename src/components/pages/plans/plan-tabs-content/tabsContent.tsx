"use client";
import Button from "@/components/UI/button";
import CustomeInput from "@/components/UI/CustomeInput";
import DoughnutChart from "@/components/UI/doughnut-chart";
import LineChart from "@/components/UI/line-chart";
import Paper from "@/components/UI/paper";
import Rank from "@/components/UI/rank";
import Stepper from "@/components/UI/stepper";
import TransformButton from "@/components/UI/transform-button";
import { useCurrency } from "@/context/currencyContext";
import { useRouter } from "@/i18n/routing";
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
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { palnFeatures } from "./type";

const PerformanceTab = () => {
  const t = useTranslations();
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

  const handleInvestClick = () => {
    if (!price || parseFloat(price) <= 0) {
      toast.error(t("invest.pleaseEnterValidAmount"));
      return;
    }

    const priceValue = parseFloat(price);
    toast.success(
      `${t("invest.investmentDetails")}\n${t(
        "invest.amount"
      )}: ${priceValue.toFixed(2)} ${currency}\n${t(
        "invest.duration"
      )} ${currentDurationLabel}\n${t(
        "invest.return"
      )} ${currentPercentage}%\n${t(
        "invest.finalValue"
      )} ${calculatedAmount.toFixed(2)} ${currency}`,
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
        <p className="text-xs text-foreground">
          {t("plans.lowRiskInvestments")}
        </p>
        <Image src={womenBtc} alt="women btc" width={100} height={100} />
      </div>

      <div className="flex mt-7 justify-between items-center">
        <TransformButton
          className="bg-teal-light"
          icon={
            <Image src="/svgs/rington.svg" alt="Send" width={24} height={24} />
          }
          label={t("plans.news")}
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
          label={t("plans.transactions")}
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
          label={t("plans.calculation")}
          clickHandler={() => ""}
        />
        <TransformButton
          className="bg-teal-light"
          icon={
            <Image src="/svgs/plus-teal.svg" alt="Add" width={24} height={24} />
          }
          label={t("plans.invest")}
          clickHandler={() => ""}
        />
      </div>
      <Paper
        className="bg-white p-4 mt-2 rounded-xl"
        label={t("plans.featuresLabel")}
      >
        <div className="flex flex-col gap-4 ">
          {palnFeatures.map((item, index) => (
            <div
              className="flex shadow-lg dark:shadow-cyan-400/20 p-3 mt-2 rounded-xl items-center justify-between gap-2 text-sm"
              key={item.titleKey + index}
            >
              <Image
                src={item.address}
                alt={t(item.titleKey)}
                width={500}
                height={500}
                className="w-[50px] h-[50px] rounded-lg p-2 bg-white dark:bg-gray-100"
              />
              <p className="text-foreground">{t(item.titleKey)}</p>{" "}
            </div>
          ))}
        </div>
      </Paper>
      <Paper
        icon={
          <LineChartIcon className="ml-2 rtl:mr-2 rtl:ml-0 text-foreground dark:text-white" />
        }
        className="bg-white p-2 rounded-2xl mt-4"
        label={t("plans.fundPerformanceChart")}
      >
        <LineChart data={chartData} />
      </Paper>

      <Paper
        icon={<WindowIcon className="text-foreground dark:text-white" />}
        className="bg-white p-4 rounded-2xl mt-4"
        label={t("plans.assetAllocation")}
      >
        <div className="h-80">
          <DoughnutChart data={assetAllocationData} />
        </div>
      </Paper>
      <Paper
        className="mt-4 bg-white rounded-2xl p-4"
        label={t("plans.capitalGrowthEstimate")}
        icon={<ChartFrameIcon className="text-foreground dark:text-white" />}
      >
        <div className="mt-4">
          <CustomeInput
            placeholder={t("plans.pricePlaceholder")}
            label={t("plans.price")}
            variant="secondary"
            inputType="stroke"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <Paper className="mt-4" label={t("plans.investmentDuration")}>
          <div className="mt-2 flex items-center justify-center w-full">
            <Stepper
              steps={steps}
              passedSteps={selectedStep + 1}
              onStepClick={setSelectedStep}
            />
          </div>
          <div className="mt-6">
            <Rank
              icon={<AwardIcon className="text-foreground dark:text-white" />}
              percentage={currentPercentage}
              currency={currency}
              label={t("plans.assetValueAfter", {
                duration: currentDurationLabel,
              })}
              amount={calculatedAmount}
            />
          </div>
        </Paper>
      </Paper>
      <Paper
        label={t("plans.documentationLabel")}
        className="bg-white rounded-2xl p-4 mt-4"
        icon={<DocumentIcon className="text-foreground dark:text-white" />}
      >
        <div className="flex flex-col gap-4">
          <p className="my-6 text-gray-500 dark:text-gray-400">
            {t("plans.documentationDescription1")}
          </p>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            {t("plans.documentationDescription2")}
          </p>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            {t("plans.documentationDescription3")}
          </p>
        </div>

        <Button
          size="sm"
          variant="outline-dark"
          className="w-full border-white!"
        >
          <p>{t("plans.learnMore")}</p>
        </Button>
      </Paper>

      <Button
        onClick={handleInvestClick}
        size="sm"
        className="w-full mx-auto my-4"
      >
        {t("plans.invest")}
      </Button>
    </div>
  );
};

export { PerformanceTab };
