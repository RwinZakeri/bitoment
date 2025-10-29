import {
  AddFundFormData,
  addFundSchema,
  formatCardNumber,
  formatExpiryDate,
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

export { addFundSchema, formatCardNumber, formatExpiryDate };
export type { AddFundFormData };
