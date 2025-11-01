import { z } from "zod";

export const addFundSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0 && num <= 1000000;
    }, "Please enter a valid amount (0.01 - 1,000,000)"),
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .refine((val) => {
      const cleaned = val.replace(/\s/g, "");
      return /^\d{13,19}$/.test(cleaned);
    }, "Please enter a valid card number (13-19 digits)"),
  expiryDate: z
    .string()
    .min(1, "Expiry date is required")
    .refine((val) => {
      const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      return regex.test(val);
    }, "Please enter a valid expiry date (MM/YY)"),
  cvv: z
    .string()
    .min(1, "CVV is required")
    .refine(
      (val) => /^\d{3,4}$/.test(val),
      "Please enter a valid CVV (3-4 digits)"
    ),
  cardholderName: z
    .string()
    .min(1, "Cardholder name is required")
    .min(2, "Cardholder name must be at least 2 characters"),
});

export const withdrawFundSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0 && num <= 1000000;
    }, "Please enter a valid amount (0.01 - 1,000,000)"),
  bankAccount: z
    .string()
    .min(1, "Bank account is required")
    .min(10, "Bank account must be at least 10 characters"),
  accountHolderName: z
    .string()
    .min(1, "Account holder name is required")
    .min(2, "Account holder name must be at least 2 characters"),
  routingNumber: z
    .string()
    .min(1, "Routing number is required")
    .length(9, "Routing number must be exactly 9 digits"),
});

export const transferFundSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0 && num <= 1000000;
    }, "Please enter a valid amount (0.01 - 1,000,000)"),
  recipientEmail: z
    .string()
    .min(1, "Recipient email is required")
    .email("Please enter a valid email address"),
  note: z.string().optional(),
});

export type AddFundFormData = z.infer<typeof addFundSchema>;
export type WithdrawFundFormData = z.infer<typeof withdrawFundSchema>;
export type TransferFundFormData = z.infer<typeof transferFundSchema>;

export const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\s/g, "");
  const groups = cleaned.match(/.{1,4}/g);
  return groups ? groups.join(" ") : cleaned;
};

export const formatExpiryDate = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  }
  return cleaned;
};

export const formatRoutingNumber = (value: string): string => {
  return value.replace(/\D/g, "").slice(0, 9);
};

export const payFromWalletSchema = z.object({
  selectedCrypto: z
    .object({
      name: z.string(),
      shortName: z.string(),
      icon: z.string(),
      price: z.string(),
      percentage: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select a cryptocurrency",
    }),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0 && num <= 1000000;
    }, "Please enter a valid amount (0.01 - 1,000,000)"),
});

export const sendCryptoSchema = z.object({
  selectedCrypto: z
    .object({
      name: z.string(),
      shortName: z.string(),
      icon: z.string(),
      price: z.string(),
      percentage: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select a cryptocurrency",
    }),
  blockchainNetwork: z.string().min(1, "Blockchain network is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0 && num <= 1000000;
    }, "Please enter a valid amount (0.01 - 1,000,000)"),
  toAddress: z
    .string()
    .min(1, "Recipient address is required")
    .min(26, "Address must be at least 26 characters")
    .max(64, "Address must be less than 64 characters")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "Address must contain only alphanumeric characters"
    ),
});

export const receiveCryptoSchema = z.object({
  selectedCrypto: z
    .object({
      name: z.string(),
      shortName: z.string(),
      icon: z.string(),
      price: z.string(),
      percentage: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select a cryptocurrency",
    }),
  blockchainNetwork: z.string().optional(),
});

export type PayFromWalletFormData = z.infer<typeof payFromWalletSchema>;
export type SendCryptoFormData = z.infer<typeof sendCryptoSchema>;
export type ReceiveCryptoFormData = z.infer<typeof receiveCryptoSchema>;
