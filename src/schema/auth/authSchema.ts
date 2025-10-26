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

export type SignUpFormData = z.infer<typeof singUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
