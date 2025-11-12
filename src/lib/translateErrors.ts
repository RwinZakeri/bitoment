import { ZodError } from "zod";

/**
 * Translates Zod error messages using next-intl translation function
 * @param error - Zod error object or error message string
 * @param t - Translation function from useTranslations()
 * @returns Translated error message
 */
export const translateZodError = (
  error: ZodError | string | undefined,
  t: (key: string, values?: Record<string, string | number>) => string
): string | undefined => {
  if (!error) return undefined;

  // If error is a string, try to translate it directly
  if (typeof error === "string") {
    return translateErrorMessage(error, t);
  }

  // If error is a ZodError, get the first error message
  if (error instanceof ZodError) {
    const zodErrors = (error as ZodError).issues || [];
    if (zodErrors.length > 0) {
      const firstError = zodErrors[0];
      return translateErrorMessage(firstError.message, t);
    }
  }

  return undefined;
};

/**
 * Translates a specific error message string
 * @param message - Error message string
 * @param t - Translation function from useTranslations()
 * @returns Translated error message
 */
export const translateErrorMessage = (
  message: string,
  t: (key: string, values?: Record<string, string | number>) => string
): string => {
  if (!message) return message;

  // Normalize the message: trim whitespace and normalize multiple spaces
  const normalizedMessage = message.trim().replace(/\s+/g, " ");

  // Map common error messages to translation keys
  const errorMap: Record<string, string> = {
    "Full name is required": "validation.fullNameRequired",
    "Full name must be at least 2 characters": "validation.fullNameMinLength",
    "Full name must be less than 50 characters": "validation.fullNameMaxLength",
    "Email is required": "validation.emailRequired",
    "Please enter a valid email address": "validation.email",
    "Password is required": "validation.passwordRequired",
    "Password must be at least 5 characters": "validation.passwordMinLength",
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character":
      "validation.passwordPattern",
    "Please confirm your password": "validation.passwordConfirmRequired",
    "Passwords do not match": "validation.passwordMatch",
    "Phone number is required": "validation.phoneNumberRequired",
    "Phone number must be at least 10 digits":
      "validation.phoneNumberMinLength",
    "Phone number must be less than 15 digits":
      "validation.phoneNumberMaxLength",
    "Please enter a valid phone number": "validation.phoneNumberInvalid",
    "Amount is required": "validation.amountRequired",
    "Please enter a valid amount (0.01 - 1,000,000)":
      "validation.amountInvalid",
    "Price is required": "validation.priceRequired",
    "Please enter a valid price (0.01 - 1,000,000)": "validation.priceInvalid",
    "Card number is required": "validation.cardNumberRequired",
    "Please enter a valid card number (13-19 digits)":
      "validation.cardNumberInvalid",
    "Expiry date is required": "validation.expiryDateRequired",
    "Please enter a valid expiry date (MM/YY)": "validation.expiryDateInvalid",
    "CVV is required": "validation.cvvRequired",
    "Please enter a valid CVV (3-4 digits)": "validation.cvvInvalid",
    "Cardholder name is required": "validation.cardholderNameRequired",
    "Cardholder name must be at least 2 characters":
      "validation.cardholderNameMinLength",
    "Bank account is required": "validation.bankAccountRequired",
    "Bank account must be at least 10 characters":
      "validation.bankAccountMinLength",
    "Account holder name is required": "validation.accountHolderNameRequired",
    "Account holder name must be at least 2 characters":
      "validation.accountHolderNameMinLength",
    "Routing number is required": "validation.routingNumberRequired",
    "Routing number must be exactly 9 digits": "validation.routingNumberLength",
    "Recipient email is required": "validation.recipientEmailRequired",
    "Please select a cryptocurrency": "validation.cryptocurrencyRequired",
    "Blockchain network is required": "validation.blockchainNetworkRequired",
    "Recipient address is required": "validation.recipientAddressRequired",
    "Address must be at least 26 characters":
      "validation.recipientAddressMinLength",
    "Address must be less than 64 characters":
      "validation.recipientAddressMaxLength",
    "Address must contain only alphanumeric characters":
      "validation.recipientAddressInvalid",
    "National Insurance Number cannot be empty":
      "validation.nationalInsuranceNumberRequired",
    "National Insurance Number must be less than 20 characters":
      "validation.nationalInsuranceNumberMaxLength",
    "Please enter a valid National Insurance Number format (e.g., AB123456C)":
      "validation.nationalInsuranceNumberInvalid",
    "Birth date cannot be empty": "validation.birthDateRequired",
    "Please enter a valid birth date format (YYYY-MM-DD)":
      "validation.birthDateInvalid",
    // Zod default error messages
    "Expected string, received undefined": "validation.required",
    "Expected string, received null": "validation.required",
    "String must contain at least 1 character(s)": "validation.amountRequired",
    "Expected string, received number": "validation.required",
    Invalid: "validation.required",
  };

  // Check if normalized message exists in error map (exact match first)
  let translationKey = errorMap[normalizedMessage] || errorMap[message];

  // If still not found, try case-insensitive match (fallback)
  if (!translationKey) {
    const lowerMessage = normalizedMessage.toLowerCase();
    for (const [key, value] of Object.entries(errorMap)) {
      if (key.toLowerCase() === lowerMessage) {
        translationKey = value;
        break;
      }
    }
  }

  if (translationKey) {
    try {
      // Extract numeric values from message if present
      const minMatch = normalizedMessage.match(/at least (\d+)/i);
      const maxMatch = normalizedMessage.match(/less than (\d+)/i);
      const exactMatch = normalizedMessage.match(/exactly (\d+)/i);

      const values: Record<string, number> = {};
      if (minMatch) values.min = parseInt(minMatch[1], 10);
      if (maxMatch) values.max = parseInt(maxMatch[1], 10);
      if (exactMatch) values.exact = parseInt(exactMatch[1], 10);

      // Call translation function
      const translated =
        Object.keys(values).length > 0
          ? t(translationKey, values)
          : t(translationKey);

      // Return the translated message
      return translated;
    } catch {
      // If translation fails, return original message
      return message;
    }
  }

  // If no translation key found, return original message
  return message;
};
