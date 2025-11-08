"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import ScreenerModal from "@/components/module/screener/screener";
import SelectAssetModal from "@/components/module/selectAssets/selectAssetsModal";
import { CryptoCurrency } from "@/components/module/selectAssets/type";
import AutoComplete from "@/components/UI/auto-complete";
import Button from "@/components/UI/button";
import CryptoAssets from "@/components/UI/crypto-assets";
import CustomeInput from "@/components/UI/CustomeInput";
import Modal from "@/components/UI/modal";
import BtcIcon from "@/public/icons/BtcIcon";
import CorrosIcon from "@/public/icons/CorrosIcon";
import QrIcon from "@/public/icons/QrIcon";
import SuccessTickIcon from "@/public/icons/SuccessTickIcon";
import {
  SendCryptoFormData,
  sendCryptoSchema,
} from "@/schema/wallet/invest/investSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Send = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useForm<SendCryptoFormData>({
    resolver: zodResolver(sendCryptoSchema),
    mode: "onChange",
    defaultValues: {
      selectedCrypto: null,
      blockchainNetwork: "",
      amount: "",
      toAddress: "",
    },
  });

  const watchedCrypto = watch("selectedCrypto");
  const watchedAmount = watch("amount");
  const watchedNetwork = watch("blockchainNetwork");
  const watchedAddress = watch("toAddress");
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isScreenerModalOpen, setIsScreenerModalOpen] = useState(false);

  const blockchainNetworks = ["TRC20", "ERC20", "BEP20", "SOL"];

  const calculateFee = (): string => {
    if (!watchedCrypto || !watchedNetwork || !watchedAmount) {
      return "0";
    }

    const amount = parseFloat(watchedAmount);
    if (isNaN(amount) || amount <= 0) {
      return "0";
    }

    const cryptoShortName = watchedCrypto.shortName.toUpperCase();
    let fee = 0;

    switch (watchedNetwork) {
      case "TRC20":
        fee = 0.1;
        break;

      case "ERC20":
        if (cryptoShortName === "ETH" || cryptoShortName === "ETHEREUM") {
          fee = 0.005;
        } else {
          fee = amount * 0.001;
        }
        break;

      case "BEP20":
        if (cryptoShortName === "BNB" || cryptoShortName === "BINANCE") {
          fee = 0.00021;
        } else {
          fee = amount * 0.0005;
        }
        break;

      case "SOL":
        if (cryptoShortName === "SOL" || cryptoShortName === "SOLANA") {
          fee = 0.000005;
        } else {
          fee = amount * 0.0001;
        }
        break;

      default:
        fee = amount * 0.001;
    }

    if (fee < 0.0001) {
      return fee.toFixed(6);
    } else if (fee < 1) {
      return fee.toFixed(4);
    } else {
      return fee.toFixed(2);
    }
  };

  const calculatedFee = calculateFee();
  const feeDisplay =
    watchedCrypto && watchedNetwork && watchedAmount
      ? `${calculatedFee} ${watchedCrypto.shortName}`
      : "0";

  const handleAssetSelect = async (item: CryptoCurrency) => {
    setValue("selectedCrypto", item, { shouldValidate: true });
    await trigger("selectedCrypto");
    setIsSelectModalOpen(false);
  };

  const handleNetworkSelect = (network: string) => {
    setValue("blockchainNetwork", network, { shouldValidate: true });
    trigger("blockchainNetwork");
  };

  const onSubmit = async (_data: SendCryptoFormData) => {
    try {
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleOpenScreener = () => {
    setIsScreenerModalOpen(true);
  };

  const handleCloseScreener = () => {
    setIsScreenerModalOpen(false);
  };

  const handleScanSuccess = (decodedText: string) => {
    setValue("toAddress", decodedText, { shouldValidate: true });
    trigger("toAddress");
    setIsScreenerModalOpen(false);
  };

  const handleClearAmount = () => {
    setValue("amount", "", { shouldValidate: true });
    trigger("amount");
  };

  return (
    <PageLayout title="Send">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-4"
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
                <BtcIcon className="text-foreground" />
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
            icon={
              <QrIcon
                onClick={handleOpenScreener}
                className="text-foreground"
              />
            }
            placeholder="13agdGAFDe...3SmkjUYR"
            label="To"
            inputType="stroke"
            type="text"
            step="0.01"
            min="0.01"
            max="1000000"
            {...register("toAddress", {
              onChange: async () => {
                await trigger("toAddress");
              },
            })}
            error={errors.toAddress?.message}
          />
          {watchedAddress && !errors.toAddress && (
            <span className="text-green-500 text-sm mt-1 block">
              ✓ Valid address
            </span>
          )}
        </div>

        <div>
          <CustomeInput
            icon={
              <CorrosIcon
                onClick={handleClearAmount}
                className="text-foreground"
              />
            }
            placeholder="amount"
            label="Amount"
            inputType="stroke"
            {...register("amount", {
              onChange: async () => {
                await trigger("amount");
              },
            })}
            error={errors.amount?.message}
          />
          {watchedAmount && !errors.amount && (
            <span className="text-green-500 text-sm mt-1 block">
              ✓ Valid amount
            </span>
          )}
        </div>

        <CustomeInput
          disabled
          placeholder={feeDisplay || "0"}
          value={feeDisplay}
          label="Fee"
          inputType="stroke"
        />

        <Button
          size="lg"
          className="w-full mt-6"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Confirm"}
        </Button>

        <Modal isOpen={isSuccessModalOpen} onClose={handleCloseSuccessModal}>
          <div className="flex flex-col items-center text-center space-y-4 p-6">
            <SuccessTickIcon className="w-16 h-16 text-green-500" />
            <h2 className="text-2xl font-semibold">Send Successfully</h2>
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

        <ScreenerModal
          isOpen={isScreenerModalOpen}
          onClose={handleCloseScreener}
          onScanSuccess={handleScanSuccess}
        />
        {isSelectModalOpen && (
          <SelectAssetModal
            isOpen={isSelectModalOpen}
            onClose={() => setIsSelectModalOpen(false)}
            onClick={handleAssetSelect}
          />
        )}
      </form>
    </PageLayout>
  );
};

export default Send;
