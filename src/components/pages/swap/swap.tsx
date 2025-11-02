"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import SelectAssetModal from "@/components/module/selectAssets/selectAssetsModal";
import { CryptoCurrency } from "@/components/module/selectAssets/type";
import Button from "@/components/UI/button";
import CustomeInput from "@/components/UI/CustomeInput";
import Modal from "@/components/UI/modal";
import SwapCard from "@/components/UI/swap-card";
import SuccessTickIcon from "@/public/icons/SuccessTickIcon";
import SwapIcon from "@/public/icons/SwapIcon";
import Link from "next/link";
import { useState } from "react";

const Swap = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [fromCrypto, setFromCrypto] = useState<CryptoCurrency | null>(null);
  const [toCrypto, setToCrypto] = useState<CryptoCurrency | null>(null);
  const [selectingFor, setSelectingFor] = useState<"from" | "to">("from");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenSelectModal = (type: "from" | "to") => {
    setSelectingFor(type);
    setIsSelectModalOpen(true);
  };

  const handleCloseSelectModal = () => {
    setIsSelectModalOpen(false);
  };

  const handleAssetSelect = (item: CryptoCurrency) => {
    if (selectingFor === "from") {
      setFromCrypto(item);
      // Reset amount when changing crypto
      setFromAmount("");
    } else {
      setToCrypto(item);
      setToAmount("");
    }
    setIsSelectModalOpen(false);
  };

  const handleSwap = () => {
    // Swap the cryptos
    const tempCrypto = fromCrypto;
    const tempAmount = fromAmount;

    setFromCrypto(toCrypto);
    setToCrypto(tempCrypto);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSwapSubmit = () => {
    if (!fromCrypto || !toCrypto) {
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <PageLayout title="Swap">
      <div className="flex flex-col gap-4 relative mt-6">
        <SwapCard
          action="Send"
          balance={fromCrypto ? "0.231" : "0"}
          amount={fromAmount}
          zIndex={50}
          crypto={fromCrypto}
          onClick={() => handleOpenSelectModal("from")}
          label="Select a coin"
          onAmountChange={(value) => setFromAmount(value)}
        />
        <SwapCard
          action="Receive"
          balance={toCrypto ? "0.231" : "0"}
          amount={toAmount}
          zIndex={10}
          crypto={toCrypto}
          onClick={() => handleOpenSelectModal("to")}
          label="Select a coin"
          onAmountChange={(value) => setToAmount(value)}
        />
        <div
          className="w-14 h-14 bg-cyan-400 rounded-full flex items-center cursor-pointer justify-center absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 hover:bg-cyan-500 z-50 transition-colors"
          onClick={handleSwap}
        >
          <SwapIcon width={23} height={23} className="rotate-90" />
        </div>
      </div>
      <CustomeInput
        className="mt-7"
        placeholder="638,532.21 USDT"
        label="Available Portfolio"
        inputType="stroke"
      />

      <Link
        href={"/swap/history"}
        className="block w-fit my-2 text-blue-500 p-0 m-0 ml-auto text-sm"
      >
        Swap History{" "}
      </Link>

      <Button
        size="lg"
        className="w-full my-4"
        onClick={handleSwapSubmit}
        disabled={!fromCrypto || !toCrypto}
      >
        Swap
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col items-center text-center space-y-4">
          <SuccessTickIcon className="w-16 h-16 text-green-500" />
          <h2 className="text-2xl font-semibold ">Transfer Success</h2>
          <p className="text-gray-600 flex flex-col gap-1">
            <span className="text-xs">Amount:</span>
            <span>
              {" "}
              <span className="text-black text-2xl font-semibold">
                {toAmount}
              </span>{" "}
              <span className="text-gray-400">
                {toCrypto?.shortName || "ETH"}
              </span>
            </span>
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleCloseModal}
            className="mt-4 w-full"
          >
            Back
          </Button>
        </div>
      </Modal>

      {isSelectModalOpen && (
        <SelectAssetModal
          isOpen={isSelectModalOpen}
          onClose={handleCloseSelectModal}
          onClick={handleAssetSelect}
        />
      )}
    </PageLayout>
  );
};

export default Swap;
