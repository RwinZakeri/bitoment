import PageLayout from "@/components/layout/page/pageLayout";
import Tabs from "@/components/UI/tabs";
import AddFund from "./addFund";
import PayFromWallet from "./payFromWallet";

const Invest = () => {
  const tabs = [
    {
      id: "pay-from-wallet",
      label: "Pay from Wallet",
      content: <PayFromWallet />,
    },
    {
      id: "add-funds",
      label: "Add Funds",
      content: <AddFund />,
    },
  ];

  return (
    <PageLayout title="Invest">
      <Tabs tabs={tabs} defaultActiveTab="add-funds" />
    </PageLayout>
  );
};

export default Invest;
