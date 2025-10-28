"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import TwoFactorDescription from "@/components/pages/dashboard/profile/two-factore/description";
import Button from "@/components/UI/button";
import Drawer from "@/components/UI/drawer";
import SelectOption from "@/components/UI/radio-options";
import { twoFactorOption } from "@/components/UI/radio-options/type";
import VerifyInput from "@/components/UI/verify-input";
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
          title={selectedOption == 1 ? "2FA" : "Email"}
          onClose={handleCloseDrawer}
          isOpen={isDrawerOpen}
        >
          <div className="px-10">
            <VerifyInput
              placeholder={"Enter the code you receive"}
              label={selectedOption == 1 ? "Phone Number" : "Add Email"}
            />
            <Button className="w-full my-8" size="lg">
              Confirm Code
            </Button>
          </div>
        </Drawer>
      )}
    </PageLayout>
  );
};

export default TwoFactorPage;
