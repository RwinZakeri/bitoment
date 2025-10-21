"use client";

import React, { useCallback, useState } from "react";
import { TabsProps } from "./type";

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveTab,
  onTabChange,
  className = "",
  tabClassName = "",
  contentClassName = "",
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    defaultActiveTab || tabs[0]?.id || ""
  );

  const handleTabClick = useCallback(
    (tabId: string) => {
      setActiveTab(tabId);
      onTabChange?.(tabId);
    },
    [onTabChange]
  );

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className={`${className} w-full`}>
      <div
        className={`flex border-b-[1px] overflow-x-auto scrollbar-hide border-gray-300 bg-transparent justify-between ${tabClassName}`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
             text-xs
             p-4
              ${
                activeTab === tab.id
                  ? "border-cyan-400 text-black border-b-2 border-b-cyan-40"
                  : "text-gray-500"
              }
            `}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        className={contentClassName}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        id={`tabpanel-${activeTab}`}
      >
        {activeTabContent}
      </div>
    </div>
  );
};

export default Tabs;
