"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import Drawer from "@/components/UI/drawer";
import LinkedOptions from "@/components/UI/linked-options";
import {
  Currency,
  Language,
  settingLinkedOptions,
  Theme,
} from "@/components/UI/linked-options/type";
import { useState } from "react";

const drawerItems = {
  language: {
    label: "Language",
    options: Language,
  },
  currency: {
    label: "Base Currency",
    options: Currency,
  },
  theme: {
    label: "Theme",
    options: Theme,
  },
} as const;

const SettingPage = () => {
  const [selectedOption, setSelectedOption] = useState<string | number>();

  const chooseDrawerOption = (selected: string) => {
    return drawerItems[selected as keyof typeof drawerItems];
  };

  const handleCloseDrawer = () => {
    setSelectedOption(undefined);
  };
  return (
    <PageLayout title="Settings">
      <div className="mt-6">
        <LinkedOptions
          onLinkedOption={(e) => setSelectedOption(e)}
          options={settingLinkedOptions}
          label="Available Options"
        />
      </div>
      {selectedOption && (
        <Drawer
          title={chooseDrawerOption(selectedOption as string).label}
          onClose={handleCloseDrawer}
        >
          <LinkedOptions
            centerized
            onLinkedOption={(e) => console.log(e)}
            options={chooseDrawerOption(selectedOption as string).options}
          />
        </Drawer>
      )}
    </PageLayout>
  );
};

export default SettingPage;
