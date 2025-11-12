"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import Tabs from "@/components/UI/tabs";
import { useTranslations } from "next-intl";
import AddFund from "./addFund";
import PayFromWallet from "./payFromWallet";

const Invest = () => {
  const t = useTranslations();
  const tabs = [
    {
      id: "pay-from-wallet",
      label: t("invest.payFromWallet"),
      content: <PayFromWallet />,
    },
    {
      id: "add-funds",
      label: t("invest.addFunds"),
      content: <AddFund />,
    },
  ];

  return (
    <PageLayout title={t("invest.title")}>
      <Tabs tabs={tabs} defaultActiveTab="add-funds" />
    </PageLayout>
  );
};

export default Invest;
