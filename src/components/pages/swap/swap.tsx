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
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Swap = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [fromCrypto, setFromCrypto] = useState<CryptoCurrency | null>(null);
  const [toCrypto, setToCrypto] = useState<CryptoCurrency | null>(null);
  const [selectingFor, setSelectingFor] = useState<"from" | "to">("from");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapButtonRotation, setSwapButtonRotation] = useState(0);
  const [isButtonPulsing, setIsButtonPulsing] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
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

  const swapPositions = (showSuccessModal = false) => {
    if (!fromCrypto || !toCrypto) {
      return;
    }

    // Trigger swap animation
    setIsSwapping(true);
    setIsButtonPulsing(true);
    setSwapButtonRotation((prev) => prev + 180);

    // Swap the cryptos after a brief delay for animation
    setTimeout(() => {
      const tempCrypto = fromCrypto;
      const tempAmount = fromAmount;

      setFromCrypto(toCrypto);
      setToCrypto(tempCrypto);
      setFromAmount(toAmount);
      setToAmount(tempAmount);

      // Reset pulse animation
      setTimeout(() => {
        setIsButtonPulsing(false);
      }, 600);

      // Reset animation state after animation completes
      setTimeout(() => {
        setIsSwapping(false);
        // Show success modal only if requested (for bottom swap button)
        if (showSuccessModal) {
          setIsModalOpen(true);
        }
      }, 600);
    }, 300);
  };

  const handleSwap = () => {
    if (!fromCrypto || !toCrypto || !fromAmount || !toAmount) {
      return;
    }
    // Just swap positions without showing success modal
    swapPositions(false);
  };

  const handleSwapSubmit = () => {
    if (!fromCrypto || !toCrypto || !fromAmount || !toAmount) {
      return;
    }
    // Open confirmation modal
    setIsConfirmModalOpen(true);
  };

  const handleConfirmSwap = () => {
    if (!fromCrypto || !toCrypto) {
      return;
    }
    // Close confirmation modal
    setIsConfirmModalOpen(false);
    // Execute swap and show success modal
    handleCloseConfirmModal();
  };

  return (
    <PageLayout title="Swap">
      <div className="flex flex-col gap-4 relative mt-6">
        <div
          className={`swap-card-transition ${
            isSwapping ? "swap-card-swapping" : ""
          }`}
        >
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
        </div>
        <div
          className={`swap-card-transition ${
            isSwapping ? "swap-card-swapping" : ""
          }`}
        >
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
        </div>
        <div
          className={`w-14 h-14 bg-cyan-400 rounded-full flex items-center cursor-pointer justify-center absolute left-1/2 top-1/2 hover:bg-cyan-500 z-50 transition-all duration-300 ease-in-out ${
            !fromCrypto || !toCrypto || !fromAmount || !toAmount
              ? "opacity-50 cursor-not-allowed"
              : ""
          } ${isButtonPulsing ? "swap-button-active" : ""}`}
          onClick={handleSwap}
          style={{
            transform: `translate(-50%, -50%) rotate(${swapButtonRotation}deg)`,
            transition: isButtonPulsing ? "none" : "transform 0.3s ease-in-out",
          }}
        >
          <SwapIcon
            width={23}
            height={23}
            className={`transition-transform duration-300 rotate-90 ${
              isButtonPulsing ? "swap-icon-pulse" : ""
            }`}
          />
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
        disabled={!fromCrypto || !toCrypto || !fromAmount || !toAmount}
      >
        Swap
      </Button>

      {/* Confirmation Modal */}
      <Modal className="rounded-xl" isOpen={isConfirmModalOpen} onClose={handleCloseConfirmModal}>
        <div className="flex flex-col space-y-6 p-2">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Confirm Swap</h2>
            <p className="text-gray-500 text-sm">
              Please review your swap details before confirming
            </p>
          </div>

          <div className="flex flex-col gap-4 bg-gray-50 rounded-xl p-4">
            {/* From Section */}
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500">From</p>
              <div className="flex items-center justify-between bg-white rounded-lg p-3">
                <div className="flex items-center gap-3">
                  {fromCrypto?.icon ? (
                    <div className="w-10 h-10 rounded-full bg-gray-250 flex items-center justify-center">
                      <Image
                        src={fromCrypto.icon}
                        alt={fromCrypto.name}
                        width={24}
                        height={24}
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-250 flex items-center justify-center">
                      <div className="w-6 h-6 bg-gray-400 rounded-full" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">
                      {fromCrypto?.shortName || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {fromCrypto?.name || "Select crypto"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">{fromAmount || "0"}</p>
                </div>
              </div>
            </div>

            {/* Swap Icon */}
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center">
                <SwapIcon
                  width={20}
                  height={20}
                  className="rotate-90 text-white"
                />
              </div>
            </div>

            {/* To Section */}
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500">To</p>
              <div className="flex items-center justify-between bg-white rounded-lg p-3">
                <div className="flex items-center gap-3">
                  {toCrypto?.icon ? (
                    <div className="w-10 h-10 rounded-full bg-gray-250 flex items-center justify-center">
                      <Image
                        src={toCrypto.icon}
                        alt={toCrypto.name}
                        width={24}
                        height={24}
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-250 flex items-center justify-center">
                      <div className="w-6 h-6 bg-gray-400 rounded-full" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">
                      {toCrypto?.shortName || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {toCrypto?.name || "Select crypto"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">{toAmount || "0"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleCloseConfirmModal}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button size="lg" onClick={handleConfirmSwap} className="flex-1">
              Confirm Swap
            </Button>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col items-center text-center space-y-4">
          <SuccessTickIcon className="w-16 h-16 text-green-500" />
          <h2 className="text-2xl font-semibold ">Swap Success</h2>
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
