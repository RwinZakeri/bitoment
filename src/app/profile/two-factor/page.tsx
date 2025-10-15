"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import TwoFactorDescription from "@/components/pages/profile/two-factore/description";
import Drawer from "@/components/UI/drawer";
import SelectOption from "@/components/UI/radio-options";
import { twoFactorOption } from "@/components/UI/radio-options/type";
import { TwoFactorMethod } from "@/types";
import { useState } from "react";

const TwoFactorPage = () => {
  const [selectedOption, setSelectedOption] = useState<
    TwoFactorMethod | undefined
  >(undefined);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOptionSelect = (option: TwoFactorMethod) => {
    setSelectedOption(option);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  console.log(selectedOption);

  return (
    <PageLayout title="Security">
      <TwoFactorDescription />
      <div className="mt-8">
        <SelectOption
          onClickHandler={(e) => handleOptionSelect(e as TwoFactorMethod)}
          label={"Available Options"}
          twoFactorOptions={twoFactorOption}
        />
      </div>

      {isDrawerOpen && (
        <Drawer
          title={selectedOption == 1 ? "2FA" : "SMS"}
          onClose={handleCloseDrawer}
          isOpen={isDrawerOpen}
        >
          <h1>hello world</h1>
        </Drawer>
      )}
    </PageLayout>
  );
};

export default TwoFactorPage;
