import PageLayout from "@/components/layout/page/pageLayout";
import TwoFactorDescription from "@/components/pages/profile/two-factore/description";
import SelectOption from "@/components/UI/options";
import { twoFactorSelecOption } from "@/components/UI/options/type";

const TwoFactorPage = () => {
  return (
    <PageLayout title="Security">
      <TwoFactorDescription />
      <div className="mt-8">
        <SelectOption label={"Available Options"} twoFactorSelecOption={twoFactorSelecOption} />
      </div>
    </PageLayout>
  );
};

export default TwoFactorPage;
