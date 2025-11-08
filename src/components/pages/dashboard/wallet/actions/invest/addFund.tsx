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
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  AddFundFormData,
  AddFundProps,
  addFundSchema,
  formatCardNumber,
  formatExpiryDate,
} from "./types";

const AddFund = ({
  showCardForm = true,
  buttonText = "Pay Now",
  amountPlaceholder,
  amountLabel = "Investment Amount",
  onSuccess,
  onError,
}: AddFundProps) => {
  const { currency } = useCurrency();
  const defaultPlaceholder = amountPlaceholder || `100.00 ${currency}`;
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

        toast.success(data.message || "Funds added successfully!");
        onSuccess?.(data.wallet);
        reset();
      } else {
        throw new Error(data.message || "Failed to add funds");
      }
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ||
        (error as { message?: string })?.message ||
        "Failed to add funds";
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
              + Add New Card
            </Link>
            <CustomeInput
              className="p-0 m-0"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              inputType="stroke"
              {...register("cardNumber")}
              onChange={handleCardNumberChange}
              error={errors.cardNumber?.message}
              maxLength={19}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CustomeInput
              placeholder="MM/YY"
              label="Expiration Date"
              inputType="stroke"
              {...register("expiryDate")}
              onChange={handleExpiryDateChange}
              error={errors.expiryDate?.message}
              maxLength={5}
            />
            <CustomeInput
              placeholder="123"
              label="CVV"
              inputType="stroke"
              {...register("cvv")}
              onChange={(e) => handleInputChange("cvv", e.target.value)}
              error={errors.cvv?.message}
              maxLength={4}
              type="password"
            />
          </div>

          <CustomeInput
            label="Cardholder Name"
            placeholder="Full Name"
            inputType="stroke"
            {...register("cardholderName")}
            onChange={(e) =>
              handleInputChange("cardholderName", e.target.value)
            }
            error={errors.cardholderName?.message}
          />
        </>
      )}

      <CustomeInput
        placeholder={defaultPlaceholder}
        label={amountLabel}
        inputType="stroke"
        type="number"
        step="0.01"
        min="0.01"
        max="1000000"
        {...register("amount")}
        onChange={(e) => handleInputChange("amount", e.target.value)}
        error={errors.amount?.message}
      />

      <Button
        className="w-full"
        size="lg"
        type="submit"
        isLoading={isSubmitting || addFundMutation.isPending}
        disabled={isSubmitting || addFundMutation.isPending}
      >
        {isSubmitting || addFundMutation.isPending
          ? "Processing..."
          : buttonText}
      </Button>

      <div className="text-xs text-gray-500 text-center">
        🔒 Your payment information is encrypted and secure
      </div>
    </form>
  );
};

export default AddFund;
