import * as z from "zod";
import { passwordRegex } from "../regex/regex";

export const singUpSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name must be less than 50 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(5, "Password must be at least 5 characters")
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    passwordConfirmed: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirmed, {
    message: "Passwords do not match",
    path: ["passwordConfirmed"],
  });

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(5, "Password must be at least 5 characters")
    .regex(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

// Custom error messages for different scenarios
export const customErrorMessages = {
  networkError: "Network error. Please check your connection and try again.",
  serverError: "Server error. Please try again later.",
  emailAlreadyExists: "An account with this email already exists.",
  invalidCredentials: "Invalid email or password.",
  accountLocked: "Account temporarily locked. Please try again later.",
  emailNotVerified: "Please verify your email before signing in.",
  weakPassword: "Password is too weak. Please choose a stronger password.",
  invalidEmail: "Please enter a valid email address.",
  requiredField: "This field is required.",
  passwordMismatch: "Passwords do not match.",
  nameTooShort: "Name must be at least 2 characters long.",
  nameTooLong: "Name must be less than 50 characters.",
};

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, "Password is required")
    .min(5, "Password must be at least 5 characters")
    .regex(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export const profileUpdateSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 50 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, "Please enter a valid phone number"),
});

export const optionalProfileUpdateSchema = z.object({
  fullName: z
    .union([
      z
        .string()
        .min(2, "Full name must be at least 2 characters")
        .max(50, "Full name must be less than 50 characters"),
      z.literal(""),
    ])
    .optional(),

  email: z
    .union([
      z.string().email("Please enter a valid email address"),
      z.literal(""),
    ])
    .optional(),

  phoneNumber: z
    .union([
      z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must be less than 15 digits")
        .regex(/^[\+]?[0-9\s\-\(\)]+$/, "Please enter a valid phone number"),
      z.literal(""),
    ])
    .optional(),

  nationalInsuranceNumber: z
    .union([
      z
        .string()
        .min(1, "National Insurance Number cannot be empty")
        .max(20, "National Insurance Number must be less than 20 characters")
        .regex(
          /^[A-Z]{2}[0-9]{6}[A-Z]$/,
          "Please enter a valid National Insurance Number format (e.g., AB123456C)"
        ),
      z.literal(""),
    ])
    .optional(),

  birthDate: z
    .union([
      z
        .string()
        .min(1, "Birth date cannot be empty")
        .regex(
          /^\d{4}-\d{2}-\d{2}$/,
          "Please enter a valid birth date format (YYYY-MM-DD)"
        ),
      z.literal(""),
    ])
    .optional(),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export type SignUpFormData = z.infer<typeof singUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type resetPassword = z.infer<typeof resetPasswordSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
export type OptionalProfileUpdateFormData = z.infer<
  typeof optionalProfileUpdateSchema
>;
