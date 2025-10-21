import PageLayout from "@/components/layout/page/pageLayout";
import Button from "@/components/UI/button";
import CustomeInput from "@/components/UI/CustomeInput";
import Stepper from "@/components/UI/stepper";

const Invest = () => {
  return (
    <PageLayout title="Invest">
      <div className={"mt-6 flex flex-col gap-12"}>
        <CustomeInput
          placeholder="100.00 USDT"
          inputType="stroke"
          label="Investment Amount"
        />
        <Stepper steps={["0%", "25%", "50%", "75%", "100%"]} passedSteps={5} />
      </div>

      <Button size="lg" className="w-full my-8">
        Add Plan
      </Button>
    </PageLayout>
  );
};

export default Invest;
