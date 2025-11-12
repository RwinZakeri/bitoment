"use client";

import Button from "@/components/UI/button";
import CustomeInput from "@/components/UI/CustomeInput";
import axios from "@/config/axios.config";
import { useCurrency } from "@/context/currencyContext";
import { AddMoneyRequest, AddMoneyResponse } from "@/types/auth";
import MutationKey from "@/types/mutation_key";
import ReactQueryKey from "@/types/react_query_key";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";
import { translateErrorMessage } from "@/lib/translateErrors";
import {
  AddFundFormData,
  AddFundProps,
  addFundSchema,
  formatCardNumber,
  formatExpiryDate,
} from "./types";

const AddFund = ({
  showCardForm = true,
  buttonText,
  amountPlaceholder,
  amountLabel,
  onSuccess,
  onError,
}: AddFundProps) => {
  const t = useTranslations();
  const { currency } = useCurrency();
  const defaultPlaceholder = amountPlaceholder || `100.00 ${currency}`;
  const defaultAmountLabel = amountLabel || t("invest.investmentAmount");
  const defaultButtonText = buttonText || t("invest.payNow");
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    trigger,
  } = useForm<AddFundFormData>({
    resolver: zodResolver(addFundSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    },
  });

  const addFundMutation = useMutation({
    mutationKey: [MutationKey.addMoney],
    mutationFn: async (amount: number): Promise<AddMoneyResponse> => {
      const response = await axios.post<AddMoneyResponse>("/wallet", {
        amount,
      } as AddMoneyRequest);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success && data.wallet) {
        queryClient.invalidateQueries({ queryKey: [ReactQueryKey.wallet] });
        queryClient.invalidateQueries({
          queryKey: [ReactQueryKey.wallet, ReactQueryKey.walletBalance],
        });
        queryClient.invalidateQueries({
          queryKey: [ReactQueryKey.wallet, ReactQueryKey.walletHistory],
        });
        queryClient.invalidateQueries({
          queryKey: [
            ReactQueryKey.wallet,
            ReactQueryKey.walletAssetDistribution,
          ],
        });

        toast.success(data.message || t("invest.fundsAddedSuccessfully"));
        onSuccess?.(data.wallet);
        reset();
      } else {
        throw new Error(data.message || t("invest.failedToAddFunds"));
      }
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ||
        (error as { message?: string })?.message ||
        t("invest.failedToAddFunds");
      toast.error(errorMessage);
      onError?.(errorMessage);
    },
  });

  const onSubmit = async (data: AddFundFormData) => {
    try {
      const amount = parseFloat(data.amount);
      await addFundMutation.mutateAsync(amount);
    } catch {}
  };

  const handleCardNumberChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formatted = formatCardNumber(e.target.value);
    setValue("cardNumber", formatted);
    await trigger("cardNumber");
  };

  const handleExpiryDateChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formatted = formatExpiryDate(e.target.value);
    setValue("expiryDate", formatted);
    await trigger("expiryDate");
  };

  const handleInputChange = async (
    field: keyof AddFundFormData,
    value: string
  ) => {
    setValue(field, value);
    await trigger(field);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex flex-col gap-4"
    >
      {showCardForm && (
        <>
          <div>
            <Link
              href={"/wallet/add-card"}
              className="text-cyan-500 text-sm hover:text-cyan-600"
            >
              {t("invest.addNewCard")}
            </Link>
            <CustomeInput
              className="p-0 m-0"
              placeholder={t("invest.cardNumberPlaceholder")}
              inputType="stroke"
              {...register("cardNumber")}
              onChange={handleCardNumberChange}
              error={errors.cardNumber?.message ? translateErrorMessage(errors.cardNumber.message, t) : undefined}
              maxLength={19}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CustomeInput
              placeholder={t("invest.expirationDatePlaceholder")}
              label={t("invest.expirationDate")}
              inputType="stroke"
              {...register("expiryDate")}
              onChange={handleExpiryDateChange}
              error={errors.expiryDate?.message ? translateErrorMessage(errors.expiryDate.message, t) : undefined}
              maxLength={5}
            />
            <CustomeInput
              placeholder={t("invest.cvvPlaceholder")}
              label={t("invest.cvv")}
              inputType="stroke"
              {...register("cvv")}
              onChange={(e) => handleInputChange("cvv", e.target.value)}
              error={errors.cvv?.message ? translateErrorMessage(errors.cvv.message, t) : undefined}
              maxLength={4}
              type="password"
            />
          </div>

          <CustomeInput
            label={t("invest.cardholderName")}
            placeholder={t("invest.cardholderNamePlaceholder")}
            inputType="stroke"
            {...register("cardholderName")}
            onChange={(e) =>
              handleInputChange("cardholderName", e.target.value)
            }
            error={errors.cardholderName?.message ? translateErrorMessage(errors.cardholderName.message, t) : undefined}
          />
        </>
      )}

      <CustomeInput
        placeholder={defaultPlaceholder}
        label={defaultAmountLabel}
        inputType="stroke"
        type="number"
        step="0.01"
        min="0.01"
        max="1000000"
        {...register("amount")}
        onChange={(e) => handleInputChange("amount", e.target.value)}
        error={errors.amount?.message ? translateErrorMessage(errors.amount.message, t) : undefined}
      />

      <Button
        className="w-full"
        size="lg"
        type="submit"
        isLoading={isSubmitting || addFundMutation.isPending}
        disabled={isSubmitting || addFundMutation.isPending}
      >
        {isSubmitting || addFundMutation.isPending
          ? t("invest.processing")
          : defaultButtonText}
      </Button>

      <div className="text-xs text-gray-500 text-center">
        {t("invest.paymentInfoEncrypted")}
      </div>
    </form>
  );
};

export default AddFund;
