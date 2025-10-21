import PageLayout from "@/components/layout/page/pageLayout";
import Button from "@/components/UI/button";
import CustomeInput from "@/components/UI/CustomeInput";
import Stepper from "@/components/UI/stepper";
import Tabs from "@/components/UI/tabs";
import Link from "next/link";

const Invest = () => {
  const tabs = [
    {
      id: "pay-from-wallet",
      label: "Pay from Wallet",
      content: (
        <div className="mt-6 flex flex-col gap-4">
          <CustomeInput
            placeholder="100.00 USDT"
            inputType="stroke"
            label="Investment Amount"
          />
          <Stepper
            steps={["0%", "25%", "50%", "75%", "100%"]}
            passedSteps={5}
          />
          <Button size="lg" className="w-full my-8">
            Add Plan
          </Button>
        </div>
      ),
    },
    {
      id: "add-funds",
      label: "Add Funds",
      content: (
        <div className="mt-6 flex flex-col gap-4">
         <div>
           <Link href={"/wallet/add-card"} className="text-cyan-500 text-sm">+ Add New Card</Link>
          <CustomeInput className="p-0 m-0" placeholder="XXXX-XXXX-XXXX-XXXX" inputType="stroke" />
         </div>
          <CustomeInput placeholder="MM/YY" label="Expiration Date " inputType="stroke" />

          <CustomeInput placeholder="123" label="CVV" inputType="stroke" />

          <CustomeInput label="Cardholder Name" placeholder="Full Name" inputType="stroke" />

          <CustomeInput placeholder="100.00 USD" label="Investment Amount" inputType="stroke" />
        <Button className="w-full" size="lg">Pay Now</Button>
        </div>
      ),
    },
  ];

  return (
    <PageLayout title="Invest">
      <Tabs tabs={tabs} defaultActiveTab="pay-from-wallet" />
    </PageLayout>
  );
};

export default Invest;
