"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import Drawer from "@/components/UI/drawer";
import LinkedOptions from "@/components/UI/linked-options";
import { settingLinkedOptions } from "@/components/UI/linked-options/type";

const SettingPage = () => {
  return (
    <PageLayout title="Settings">
      <div className="mt-6">
        <LinkedOptions
          onLinkedOption={(e) => console.log(e)}
          options={settingLinkedOptions}
          label="Available Options"
        />
      </div>
      <Drawer title="Language">
        <h1>hello world</h1>
      </Drawer>
    </PageLayout>
  );
};

export default SettingPage;
