"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import { PerformanceTab } from "@/components/pages/plans/plan-tabs-content/tabsContent";
import { FeaturesTab } from "@/components/pages/plans/plan-tabs-content/tabsFeature";
import Tabs from "@/components/UI/tabs";
import { TabItem } from "@/components/UI/tabs/type";
import { useState } from "react";
import { useTranslations } from "next-intl";

const PlanPage = () => {
  const t = useTranslations();
  const [activeTabId, setActiveTabId] = useState<string>("Performance");

  const tabs: TabItem[] = [
    {
      id: "performance",
      label: t("plans.performance"),
      content: <PerformanceTab />,
    },
    {
      id: "features",
      label: t("plans.features"),
      content: <FeaturesTab />,
    },
  ];

  const getTitleForTab = (tabId: string) => {
    const tabTitles: Record<string, string> = {
      performance: t("plans.performance"),
      features: t("plans.features"),
      operation: t("plans.operation"),
      documentation: t("plans.documentation"),
    };
    return tabTitles[tabId] || t("plans.performance");
  };

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
  };

  return (
    <PageLayout className="p-3" title={getTitleForTab(activeTabId)}>
      <div className="mt-4">
        <Tabs
          tabs={tabs}
          defaultActiveTab="performance"
          onTabChange={handleTabChange}
          className=""
          tabClassName=""
          contentClassName="min-h-[300px]"
        />
      </div>
    </PageLayout>
  );
};

export default PlanPage;

