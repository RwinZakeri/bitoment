"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import SelectAssetModal from "@/components/module/selectAssets/selectAssetsModal";
import { CryptoCurrency } from "@/components/module/selectAssets/type";
import Alert from "@/components/UI/alert";
import AutoComplete from "@/components/UI/auto-complete";
import Button from "@/components/UI/button";
import CryptoAssets from "@/components/UI/crypto-assets";
import { useCurrency } from "@/context/currencyContext";
import { handleCopyAddress } from "@/lib/utils";
import BtcIcon from "@/public/icons/BtcIcon";
import {
  ReceiveCryptoFormData,
  receiveCryptoSchema,
} from "@/schema/wallet/invest/investSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const Receive = () => {
  const { currency } = useCurrency();
  const {
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<ReceiveCryptoFormData>({
    resolver: zodResolver(receiveCryptoSchema),
    mode: "onChange",
    defaultValues: {
      selectedCrypto: null,
      blockchainNetwork: "",
    },
  });

  const watchedCrypto = watch("selectedCrypto");
  const watchedNetwork = watch("blockchainNetwork");
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const blockchainNetworks = ["TRC20", "ERC20", "BEP20", "SOL"];

  const networkInfo = useMemo(() => {
    const network = watchedNetwork || "TRC20";
    const crypto = watchedCrypto?.shortName || currency;

    const networkNames: Record<string, string> = {
      TRC20: "TRX (TRC20)",
      ERC20: "ETH (ERC20)",
      BEP20: "BNB (BEP20)",
      SOL: "SOL",
    };

    const minDeposits: Record<string, Record<string, string>> = {
      TRC20: { USDT: "0.001", default: "0.001" },
      ERC20: { USDT: "0.001", ETH: "0.001", default: "0.001" },
      BEP20: { USDT: "0.001", BNB: "0.001", default: "0.001" },
      SOL: { SOL: "0.01", USDT: "0.001", default: "0.01" },
    };

    const networkName = networkNames[network] || network;
    const minAmount =
      minDeposits[network]?.[crypto] ||
      minDeposits[network]?.default ||
      "0.001";

    return {
      networkName,
      minAmount,
      crypto,
    };
  }, [watchedNetwork, watchedCrypto, currency]);

  useEffect(() => {
    const generateRandomAddress = () => {
      const chars =
        "`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`";
      let address = "";
      const length = Math.floor(Math.random() * 10) + 26;
      for (let i = 0; i < length; i++) {
        address += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return address;
    };
    setWalletAddress(generateRandomAddress());
  }, []);

  const handleAssetSelect = async (item: CryptoCurrency) => {
    setValue("selectedCrypto", item, { shouldValidate: true });
    await trigger("selectedCrypto");
    setIsSelectModalOpen(false);
  };

  const handleNetworkSelect = (network: string) => {
    setValue("blockchainNetwork", network, { shouldValidate: true });
    trigger("blockchainNetwork");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Wallet Address",
          text: walletAddress,
        });
      } catch (err) {
        console.error("Failed to share address:", err);
      }
    } else {
      handleCopyAddress(walletAddress);
    }
  };

  return (
    <PageLayout title="Receive">
      <div className="mt-6 flex flex-col gap-4">
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
        <AutoComplete
          onClick={handleNetworkSelect}
          list={blockchainNetworks}
          label={"Blockchain Network"}
        />
        {errors.blockchainNetwork && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.blockchainNetwork.message}
          </span>
        )}

        <Alert>
          <p className="text-sm">
            The minimum deposit amount on {networkInfo.networkName} in Bitoment
            is {networkInfo.minAmount} {networkInfo.crypto}.
          </p>
        </Alert>

        <div className="w-full flex items-center justify-center">
          <div className="w-32 h-32 bg-white dark:bg-gray-200 flex items-center justify-center rounded-lg p-2">
            {walletAddress ? (
              <QRCodeSVG
                value={walletAddress}
                size={120}
                level="M"
                includeMargin={false}
              />
            ) : (
              <div className="text-gray-400 text-xs">Generating...</div>
            )}
          </div>
        </div>

        <div className="w-60 bg-white dark:bg-gray-200 rounded-2xl p-4 mx-auto my-4">
          <p className="text-gray-500 text-center">
            Your {watchedCrypto?.shortName || "BTC"} Address
          </p>
          <p className="text-center font-semibold break-all">
            {walletAddress || "Generating address..."}
          </p>
        </div>

        <p className="text-gray-500 text-center">
          Send only {watchedCrypto?.name.toLowerCase() || "bitcoin"} (
          {watchedCrypto?.shortName || "BTC"}) to this address. Sending any
          other coins may lead to their irretrievable loss.
        </p>
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={handleShare}
          >
            Share
          </Button>
          <Button
            size="lg"
            className="w-full"
            onClick={() => handleCopyAddress(walletAddress)}
          >
            Copy
          </Button>
        </div>
      </div>
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

export default Receive;
