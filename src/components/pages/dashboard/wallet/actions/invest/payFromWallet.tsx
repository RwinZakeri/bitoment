"use client";
import SelectAssetModal from "@/components/module/selectAssets/selectAssetsModal";
import { CryptoCurrency } from "@/components/module/selectAssets/type";
import Button from "@/components/UI/button";
import CryptoAssets from "@/components/UI/crypto-assets";
import CustomeInput from "@/components/UI/CustomeInput";
import Modal from "@/components/UI/modal";
import Stepper from "@/components/UI/stepper";
import BtcIcon from "@/public/icons/BtcIcon";
import SuccessTickIcon from "@/public/icons/SuccessTickIcon";
import { payFromWalletSchema } from "@/schema/wallet/invest/investSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PayFromWalletFormData, PayFromWalletProps } from "./types";

const PayFromWallet = ({
  amountPlaceholder = "100.00 USDT",
  amountLabel = "Investment Amount",
  buttonText = "Add Plan",
  stepperSteps = ["0%", "25%", "50%", "75%", "100%"],
  passedSteps = 5,
}: PayFromWalletProps) => {
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
      selectedCrypto: null,
      amount: "",
    },
  });

  const watchedCrypto = watch("selectedCrypto");
  const watchedAmount = watch("amount");
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleAssetSelect = async (item: CryptoCurrency) => {
    setValue("selectedCrypto", item, { shouldValidate: true });
    await trigger("selectedCrypto");
    setIsSelectModalOpen(false);
  };

  useEffect(() => {
    if (watchedCrypto) {
      console.log("Selected asset:", watchedCrypto);
    }
  }, [watchedCrypto]);

  const handleAmountChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("amount", e.target.value, { shouldValidate: true });
    await trigger("amount");
  };

  const onSubmit = async (data: PayFromWalletFormData) => {
    try {
      console.log("Form submitted:", data);
      // Add your submission logic here (API call, etc.)
      // After successful submission, show success modal
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Submission error:", error);
      // Handle error here (show error toast, etc.)
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    // Optionally reset form or redirect
  };

  return (
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

      <Stepper steps={stepperSteps} passedSteps={passedSteps} />

      <div>
        <CustomeInput
          placeholder={amountPlaceholder}
          label={amountLabel}
          inputType="stroke"
          type="number"
          step="0.01"
          min="0.01"
          max="1000000"
          {...register("amount")}
          onChange={handleAmountChange}
          error={errors.amount?.message}
        />
        {watchedAmount && !errors.amount && (
          <span className="text-green-500 text-sm mt-1 block">
            ✓ Valid amount
          </span>
        )}
      </div>

      <Button
        className="w-full"
        size="lg"
        type="submit"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : buttonText}
      </Button>

      <SelectAssetModal
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        onClick={handleAssetSelect}
      />

      <Modal isOpen={isSuccessModalOpen} onClose={handleCloseSuccessModal}>
        <div className="flex flex-col items-center text-center space-y-4">
          <SuccessTickIcon className="w-16 h-16 text-green-500" />
          <h2 className="text-2xl font-semibold">Invest Successfully</h2>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleCloseSuccessModal}
            className="mt-4 w-full"
          >
            Back
          </Button>
        </div>
      </Modal>
    </form>
  );
};

export default PayFromWallet;
