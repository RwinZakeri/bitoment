import {
  AddFundFormData,
  addFundSchema,
  formatCardNumber,
  formatExpiryDate,
  PayFromWalletFormData,
} from "@/schema/wallet/invest/investSchema";
import { AddMoneyResponse } from "@/types/auth";

export interface AddFundProps {
  showCardForm?: boolean;
  buttonText?: string;
  amountPlaceholder?: string;
  amountLabel?: string;
  onSuccess?: (wallet: AddMoneyResponse["wallet"]) => void;
  onError?: (error: string) => void;
}

export interface PayFromWalletProps {
  amountPlaceholder?: string;
  amountLabel?: string;
  buttonText?: string;
  stepperSteps?: string[];
  passedSteps?: number;
}

export { addFundSchema, formatCardNumber, formatExpiryDate };
export type { AddFundFormData, PayFromWalletFormData };
