"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import {
  DocumentationTab,
  FeaturTab,
  OperationTab,
  PerformanceTab,
} from "@/components/pages/plans/plan-tabs-content/tabsContent";
import Tabs from "@/components/UI/tabs";
import { TabItem } from "@/components/UI/tabs/type";
import { useState } from "react";

const PlanPage = () => {
  const [activeTabId, setActiveTabId] = useState<string>("Performance");

  const tabs: TabItem[] = [
    {
      id: "performance",
      label: "Performance",
      content: <PerformanceTab />,
    },
    {
      id: "features",
      label: "Features",
      content: <FeaturTab />,
    },
    {
      id: "operation",
      label: "Operation",
      content: <OperationTab />,
    },
    {
      id: "documentation",
      label: "Documentation",
      content: <DocumentationTab />,
    },
  ];

  const getTitleForTab = (tabId: string) => {
    const tabTitles: Record<string, string> = {
      performance: "Performance",
      features: "Features",
      operation: "Operation",
      documentation: "Documentation",
    };
    return tabTitles[tabId] || "Performance";
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
