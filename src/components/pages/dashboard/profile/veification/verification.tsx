"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import { PlanCardSkeleton } from "@/components/module/skeleton";
import VerifyCard from "@/components/UI/verify-card";
import axios from "@/config/axios.config";
import { GetVerificationStepResponse } from "@/types/auth";
import ReactQueryKey from "@/types/react_query_key";
import { useQuery } from "@tanstack/react-query";

const Verification = () => {
  const { data: verificationStep, isLoading } =
    useQuery<GetVerificationStepResponse>({
      queryKey: [ReactQueryKey.profileVerificationStep],
      queryFn: async () => {
        const response = await axios.get<GetVerificationStepResponse>(
          "profile/verificationStep"
        );
        return response.data;
      },
    });

  return (
    <PageLayout title="Verification">
      <p className="text-gray-600/90 text-sm font-light mt-8">
        Verify your identity and enjoy higher deposit and withdrawal limits as
        you progress through each level.
      </p>

      <div className="mt-12 flex flex-col gap-4">
        {isLoading ? (
          <PlanCardSkeleton count={3} />
        ) : (
          verificationStep?.verificationStep.steps.map((item, index) => (
            <VerifyCard
              key={item.stepName}
              index={index}
              passedSteps={
                verificationStep?.verificationStep.verificationStep || 0
              }
              img={
                index === 0
                  ? "/svgs/level-one.svg"
                  : index === 1
                  ? "/svgs/level-two.svg"
                  : "/svgs/threelayer.svg"
              }
              stepsLength={verificationStep?.verificationStep.steps.length || 0}
              steps={item.passSteps}
              title={item.stepName}
              isPassed={item.passSteps.every((step) => step.isPassed)}
            />
          ))
        )}
      </div>
    </PageLayout>
  );
};

export default Verification;
