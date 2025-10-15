import PageLayout from "@/components/layout/page/pageLayout";
import LinkedCard from "@/components/UI/link-card/LinkCard";

const Security = () => {
  return (
    <PageLayout title="Security">
      <div className="mt-8 flex flex-col gap-3">
        <LinkedCard
          label="Two-Factor Authentication"
          title="Two-factor is off"
          link="/"
        />
        <LinkedCard
          label="Connected Devices"
          title="3 linked devices"
          link="/"
        />
        <LinkedCard
          label="Account Management"
          title="Lock user account"
          link="/"
        />
      </div>
    </PageLayout>
  );
};

export default Security;
