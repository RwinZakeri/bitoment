"use client";
import Button from "@/components/UI/button";
import CustomeInput from "@/components/UI/CustomeInput";
import Stepper from "@/components/UI/stepper";
import { useCurrency } from "@/context/currencyContext";
import { payFromWalletSchema } from "@/schema/wallet/invest/investSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { translateErrorMessage } from "@/lib/translateErrors";
import { PayFromWalletFormData, PayFromWalletProps } from "./types";

const PayFromWallet = ({
  amountPlaceholder,
  amountLabel,
  buttonText,
  stepperSteps = ["0%", "25%", "50%", "75%", "100%"],
  passedSteps = 5,
}: PayFromWalletProps) => {
  const t = useTranslations();
  const { currency } = useCurrency();
  const defaultPlaceholder = amountPlaceholder || `100.00 ${currency}`;
  const defaultAmountLabel = amountLabel || t("invest.investmentAmount");
  const defaultButtonText = buttonText || t("invest.addPlan");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useForm<PayFromWalletFormData>({
    resolver: zodResolver(payFromWalletSchema),
    mode: "onChange",
    defaultValues: {
      amount: "",
    },
  });

  const watchedAmount = watch("amount");
  const [selectedStep, setSelectedStep] = useState<number>(
    Math.max(0, (passedSteps || 1) - 1)
  );

  const handleAmountChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("amount", e.target.value, { shouldValidate: true });
    await trigger("amount");
  };

  const onSubmit = async (data: PayFromWalletFormData) => {
    const selectedStepLabel = stepperSteps[selectedStep] || "0%";
    const amount = data.amount || "0.00";

    toast.success(
      `${t("invest.investmentDetails")}\n${t("invest.amount")}: ${amount} ${currency}\n${t("invest.percentage")}: ${selectedStepLabel}`,
      {
        duration: 5000,
        style: {
          whiteSpace: "pre-line",
          maxWidth: "400px",
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex flex-col gap-4"
    >
      <div>
        <CustomeInput
          placeholder={defaultPlaceholder}
          label={defaultAmountLabel}
          inputType="stroke"
          type="number"
          step="0.01"
          min="0.01"
          max="1000000"
          {...register("amount")}
          onChange={handleAmountChange}
          error={errors.amount?.message ? translateErrorMessage(errors.amount.message, t) : undefined}
        />
        {watchedAmount && !errors.amount && (
          <span className="text-green-500 text-sm mt-1 block">
            {t("invest.validAmount")}
          </span>
        )}
      </div>

      <Stepper
        steps={stepperSteps}
        passedSteps={selectedStep + 1}
        onStepClick={setSelectedStep}
      />

      <Button
        className="w-full"
        size="lg"
        type="submit"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? t("invest.processing") : defaultButtonText}
      </Button>
    </form>
  );
};

export default PayFromWallet;
