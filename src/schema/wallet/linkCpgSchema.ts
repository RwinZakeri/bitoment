import { z } from "zod";

export const linkCpgSchema = z.object({
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
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0 && num <= 1000000;
    }, "Please enter a valid price (0.01 - 1,000,000)"),
  orderDescription: z.string().optional(),
  orderId: z.string().optional(),
  feePaidByUser: z.boolean(),
  multiplePayment: z.boolean(),
  amlCheck: z.boolean(),
});

export type LinkCpgFormData = z.infer<typeof linkCpgSchema>;
