"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import SelectAssetModal from "@/components/module/selectAssets/selectAssetsModal";
import { CryptoCurrency } from "@/components/module/selectAssets/type";
import AutoComplete from "@/components/UI/auto-complete";
import Button from "@/components/UI/button";
import Checkbox from "@/components/UI/checkbox";
import CryptoAssets from "@/components/UI/crypto-assets";
import CustomeInput from "@/components/UI/CustomeInput";
import axios from "@/config/axios.config";
import BtcIcon from "@/public/icons/BtcIcon";
import CorrosIcon from "@/public/icons/CorrosIcon";
import { LinkCpgFormData, linkCpgSchema } from "@/schema/wallet/linkCpgSchema";
import { CreateCpgLinkResponse } from "@/types/auth";
import MutationKey from "@/types/mutation_key";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const LinkCpg = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<LinkCpgFormData>({
    resolver: zodResolver(linkCpgSchema),
    mode: "onChange",
    defaultValues: {
      selectedCrypto: null,
      blockchainNetwork: "",
      price: "",
      orderDescription: "",
      orderId: "",
      feePaidByUser: false,
      multiplePayment: false,
      amlCheck: false,
    },
  });

  const watchedCrypto = watch("selectedCrypto");
  const watchedNetwork = watch("blockchainNetwork");
  const watchedPrice = watch("price");
  const watchedFeePaidByUser = watch("feePaidByUser");
  const watchedMultiplePayment = watch("multiplePayment");
  const watchedAmlCheck = watch("amlCheck");

  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

  const blockchainNetworks = ["TRC20", "ERC20", "BEP20", "SOL"];

  const { mutate, isPending: isSubmitting } = useMutation({
    mutationKey: [MutationKey.createCpgLink],
    mutationFn: async (data: LinkCpgFormData) => {
      const response = await axios.post<CreateCpgLinkResponse>("/wallet/cpg", {
        order_id: data.orderId || undefined,
        price: parseFloat(data.price),
        currency: data.selectedCrypto?.shortName.toUpperCase() || "USDT",
        status: "active" as const,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Payment link created successfully!");
      if (data.link) {
        console.log("Created link:", data.link);
      }
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to create payment link";
      toast.error(errorMessage);
      console.error("Create CPG link error:", error);
    },
  });

  const onSubmit = (data: LinkCpgFormData) => {
    mutate(data);
  };

  const handleAssetSelect = async (item: CryptoCurrency) => {
    setValue("selectedCrypto", item, { shouldValidate: true });
    await trigger("selectedCrypto");
    setIsSelectModalOpen(false);
  };

  const handleNetworkSelect = (network: string) => {
    setValue("blockchainNetwork", network, { shouldValidate: true });
    trigger("blockchainNetwork");
  };

  const handleClearOrderId = () => {
    setValue("orderId", "", { shouldValidate: false });
  };
  return (
    <PageLayout title="Create payment link">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex flex-col gap-4"
      >
        <div>
          <CryptoAssets
            onClick={() => setIsSelectModalOpen(true)}
            icon={
              watchedCrypto?.icon ? (
                <Image
                  src={watchedCrypto.icon}
                  alt={watchedCrypto.name}
                  width={17}
                  height={17}
                />
              ) : (
                <BtcIcon />
              )
            }
            label="Select a coin"
            title={watchedCrypto?.shortName || "BTC"}
          />
          {errors.selectedCrypto && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.selectedCrypto.message}
            </span>
          )}
          {watchedCrypto && !errors.selectedCrypto && (
            <span className="text-green-500 text-sm mt-1 block">
              ✓ Valid cryptocurrency selected
            </span>
          )}
        </div>

        <div>
          <AutoComplete
            onClick={handleNetworkSelect}
            list={blockchainNetworks}
            label="Blockchain Network"
            value={watchedNetwork}
            onChange={(value) => {
              setValue("blockchainNetwork", value, { shouldValidate: true });
              trigger("blockchainNetwork");
            }}
          />
          {errors.blockchainNetwork && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.blockchainNetwork.message}
            </span>
          )}
          {watchedNetwork && !errors.blockchainNetwork && (
            <span className="text-green-500 text-sm mt-1 block">
              ✓ Valid network selected
            </span>
          )}
        </div>

        <div>
          <CustomeInput
            icon={<p className="text-sm font-medium">USDT</p>}
            placeholder="0.00"
            label="Price"
            inputType="stroke"
            type="number"
            step="0.01"
            min="0.01"
            max="1000000"
            {...register("price", {
              onChange: async () => {
                await trigger("price");
              },
            })}
            error={errors.price?.message}
          />
          {watchedPrice && !errors.price && (
            <span className="text-green-500 text-sm mt-1 block">
              ✓ Valid price
            </span>
          )}
        </div>

        <div>
          <CustomeInput
            placeholder="Optional"
            label="Order description"
            inputType="stroke"
            type="text"
            {...register("orderDescription")}
            error={errors.orderDescription?.message}
          />
        </div>

        <div>
          <CustomeInput
            icon={<CorrosIcon onClick={handleClearOrderId} />}
            placeholder="Optional"
            label="Order ID"
            inputType="stroke"
            type="text"
            {...register("orderId")}
            error={errors.orderId?.message}
          />
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <Checkbox
            id="fee-paid-by-user"
            label="Fee paid by user"
            checked={watchedFeePaidByUser}
            onChange={(e) => {
              setValue("feePaidByUser", e.target.checked, {
                shouldValidate: false,
              });
            }}
          />
          <Checkbox
            id="multiple-payment"
            label="Multiple payment"
            checked={watchedMultiplePayment}
            onChange={(e) => {
              setValue("multiplePayment", e.target.checked, {
                shouldValidate: false,
              });
            }}
          />
          <Checkbox
            id="aml-check"
            label="AML check"
            checked={watchedAmlCheck}
            onChange={(e) => {
              setValue("amlCheck", e.target.checked, {
                shouldValidate: false,
              });
            }}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="mx-auto mt-8 block px-12"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Confirm"}
        </Button>
      </form>

      {isSelectModalOpen && (
        <SelectAssetModal
          isOpen={isSelectModalOpen}
          onClose={() => setIsSelectModalOpen(false)}
          onClick={handleAssetSelect}
        />
      )}
    </PageLayout>
  );
};

export default LinkCpg;
