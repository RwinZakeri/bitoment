import PageLayout from "@/components/layout/page/pageLayout";
import VerifyCard from "@/components/UI/verify-card";
import { verifyLevel } from "@/components/UI/verify-card/type";

const VerificationPage = () => {
  return (
    <PageLayout title="Verification">
      <p className="text-gray-600/90 text-sm font-light mt-8">
        Verify your identity and enjoy higher deposit and withdrawal limits as
        you progress through each level.
      </p>

      <div className="mt-12 flex flex-col gap-4">
        {verifyLevel.map((item) => (
          <VerifyCard
            isPassed={item.isPassed}
            img={item.img}
            steps={item.steps}
            title={item.title}
            key={item.title}
          />
        ))}
      </div>
    </PageLayout>
  );
};

export default VerificationPage;
