"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import Button from "@/components/UI/button";
import CpgCard from "@/components/UI/cpg-card";
import Modal from "@/components/UI/modal";
import VerifyInput from "@/components/UI/verify-input";
import SearchIcon from "@/public/icons/SearchIcon";

const CpgPage = () => {
  return (
    <PageLayout title="CPG">
      <div className="flex flex-col gap-3">
        <Button className="w-full mt-5" size="md">
          Create payment link
        </Button>
        <VerifyInput
          icon={<SearchIcon />}
          inputSize="sm"
          placeholder="Payment link ID , Order ID"
        />
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <CpgCard
          status="wait"
          currency="USDT"
          id="5199761970"
          orderId="1222"
          price="100 USDT"
          url="Bitoment.com/pay/?iid=5199761970"
        />
        <CpgCard
          status="wait"
          currency="USDT"
          id="5199761970"
          orderId="1222"
          price="100 USDT"
          url="Bitoment.com/pay/?iid=5199761970"
        />
        <CpgCard
          status="wait"
          currency="USDT"
          id="5199761970"
          orderId="1222"
          price="100 USDT"
          url="Bitoment.com/pay/?iid=5199761970"
        />
      </div>
      <Modal isOpen={false} onClose={() => {}}>
        <h1>hello world</h1>
      </Modal>
    </PageLayout>
  );
};

export default CpgPage;
