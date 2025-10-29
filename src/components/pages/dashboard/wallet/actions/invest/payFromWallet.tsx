import CustomeInput from "@/components/UI/CustomeInput";
import Stepper from "@/components/UI/stepper";
import AddFund from "./addFund";

interface PayFromWalletProps {
  amountPlaceholder?: string;
  amountLabel?: string;
  buttonText?: string;
  stepperSteps?: string[];
  passedSteps?: number;
}

const PayFromWallet = ({
  amountPlaceholder = "100.00 USDT",
  amountLabel = "Investment Amount",
  buttonText = "Add Plan",
  stepperSteps = ["0%", "25%", "50%", "75%", "100%"],
  passedSteps = 5,
}: PayFromWalletProps) => {
  return (
    <div className="mt-6 flex flex-col gap-4">
      <CustomeInput
        placeholder={amountPlaceholder}
        inputType="stroke"
        label={amountLabel}
      />
      <Stepper steps={stepperSteps} passedSteps={passedSteps} />
      <AddFund
        showCardForm={false}
        buttonText={buttonText}
        amountPlaceholder={amountPlaceholder}
        amountLabel={amountLabel}
      />
    </div>
  );
};

export default PayFromWallet;
