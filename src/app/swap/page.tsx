"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import Button from "@/components/UI/button";
import CustomeInput from "@/components/UI/CustomeInput";
import Modal from "@/components/UI/modal";
import SwapCard from "@/components/UI/swap-card";
import BtcIcon from "@/public/icons/BtcIcon";
import SuccessTickIcon from "@/public/icons/SuccessTickIcon";
import SwapIcon from "@/public/icons/SwapIcon";
import Link from "next/link";
import { useState } from "react";

const SwapPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <PageLayout title="Swap">
      <div className="flex flex-col gap-4 relative mt-6">
        <SwapCard
          icon={<BtcIcon />}
          action="Send"
          balance="0.231"
          amount="0.231"
          zIndex={50}
        />
        <SwapCard
          icon={<BtcIcon />}
          action="Receive"
          balance="0.231"
          amount="0.231"
          zIndex={10}
        />
        <div className="w-14 h-14 bg-cyan-400 rounded-full flex items-center cursor-pointer justify-center absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
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
        onClick={() => setIsModalOpen(true)}
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
                3.927
              </span>{" "}
              <span className="text-gray-400">ETH</span>
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
    </PageLayout>
  );
};

export default SwapPage;
