import PageLayout from "@/components/layout/page/pageLayout";
import Button from "@/components/UI/button";
import CustomeInput from "@/components/UI/CustomeInput";
import { LogoutIcon } from "@/public/icons/LogoutIcon";

const ProfileInformationPage = () => {
  return (
    <PageLayout title="Profile Information">
      <div className="gap-2 flex flex-col mt-6">
        <CustomeInput
          label="Email"
          placeholder="example@gmail.com"
          className="w-full"
        />
        <CustomeInput
          label="Phone Number"
          placeholder="+1 (555) 000-0000"
          className="w-full"
        />
      </div>
      <div>
        <Button icon={<LogoutIcon />} className="w-full mt-12" size="lg">Log Out</Button>
      </div>
    </PageLayout>
  );
};

export default ProfileInformationPage;
