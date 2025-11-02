import { z } from "zod";

export const createCpgLinkSchema = z.object({
  order_id: z.string().optional(),
  price: z
    .number()
    .min(0.01, "Price must be at least 0.01")
    .max(1000000, "Price cannot exceed 1,000,000"),
  currency: z
    .string()
    .min(1, "Currency is required")
    .regex(/^[A-Z]+$/, "Currency must be uppercase letters only"),
  status: z
    .enum(["active", "inactive", "completed", "expired"], {
      message: "Status must be one of: active, inactive, completed, expired",
    })
    .optional(),
});

export type CreateCpgLinkFormData = z.infer<typeof createCpgLinkSchema>;
