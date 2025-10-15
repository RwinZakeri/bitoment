import PageLayout from "@/components/layout/page/pageLayout";
import TwoFactorDescription from "@/components/pages/profile/two-factore/description";
import SelectOption from "@/components/UI/radio-options";
import { twoFactorOption } from "@/components/UI/radio-options/type";

const TwoFactorPage = () => {
  return (
    <PageLayout title="Security">
      <TwoFactorDescription />
      <div className="mt-8">
        <SelectOption
          label={"Available Options"}
          twoFactorOptions={twoFactorOption}
        />
      </div>
    </PageLayout>
  );
};

export default TwoFactorPage;
