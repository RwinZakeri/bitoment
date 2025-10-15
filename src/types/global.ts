/**
 * Global Types and Enums
 *
 * This file contains all global types, enums, and constants used throughout the application.
 * Following TypeScript best practices for maintainability and type safety.
 */

// ============================================================================
// ENUMS
// ============================================================================

/**
 * Two-factor authentication method selection enum
 */
export enum TwoFactorMethod {
  SMS = 1,
  EMAIL = 2,
  GOOGLE_AUTHENTICATOR = 3,
}

/**
 * Language options enum
 */
export enum Language {
  ENGLISH = 11,
  SPANISH = 12,
  FRENCH = 13,
  GERMAN = 14,
  CHINESE = 15,
  ARABIC = 16,
}

/**
 * Theme options enum
 */
export enum Theme {
  LIGHT = 21,
  DARK = 22,
  SYSTEM_DEFAULT = 23,
}

/**
 * Currency options enum
 */
export enum Currency {
  USD = 31,
  EUR = 32,
}

/**
 * Button size variants
 */
export enum ButtonSize {
  MEDIUM = "md",
  LARGE = "lg",
}

/**
 * Radio button variants
 */
export enum RadioVariant {
  DEFAULT = "default",
  TURQUOISE = "turquoise",
}

// ============================================================================
// INTERFACES
// ============================================================================

/**
 * Base option type for dropdowns, radio buttons, etc.
 */
export interface BaseOption {
  title: string;
  value: string | number;
}

/**
 * Two-factor authentication option interface
 */
export interface TwoFactorOption {
  label: string;
  icon: React.ReactNode;
  value: TwoFactorMethod;
  id: string;
}

/**
 * Linked options component props
 */
export interface LinkedOptionsProps {
  label?: string;
  options: BaseOption[];
  onLinkedOption: (value: string | number) => void;
  centerized?: boolean;
}

/**
 * Button component props
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: ButtonSize;
  loading?: boolean;
}

/**
 * Radio button component props
 */
export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  variant?: RadioVariant;
}

/**
 * Profile item interface
 */
export interface ProfileItem {
  text: string;
  address: string;
  icon: React.ReactNode;
  id: string;
}

/**
 * Drawer component props
 */
export interface DrawerProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  isOpen?: boolean;
}

// ============================================================================
// TYPE ALIASES
// ============================================================================

/**
 * Generic option type alias
 */
export type OptionType = BaseOption;

/**
 * Two-factor method type alias
 */
export type TwoFactorMethodType = TwoFactorMethod;

/**
 * Language type alias
 */
export type LanguageType = Language;

/**
 * Theme type alias
 */
export type ThemeType = Theme;

/**
 * Currency type alias
 */
export type CurrencyType = Currency;

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Setting linked options configuration
 */
export const SETTING_LINKED_OPTIONS: BaseOption[] = [
  {
    title: "Language",
    value: "language",
  },
  {
    title: "Theme",
    value: "theme",
  },
  {
    title: "Base Currency",
    value: "currency",
  },
];

/**
 * Language options configuration
 */
export const LANGUAGE_OPTIONS: BaseOption[] = [
  {
    title: "English (EN)",
    value: Language.ENGLISH,
  },
  {
    title: "Español (ES) - Spanish",
    value: Language.SPANISH,
  },
  {
    title: "Français (FR) - French",
    value: Language.FRENCH,
  },
  {
    title: "Deutsch (DE) - German",
    value: Language.GERMAN,
  },
  {
    title: "中文 (ZH) - Chinese",
    value: Language.CHINESE,
  },
  {
    title: "العربية (AR) - Arabic",
    value: Language.ARABIC,
  },
];

/**
 * Theme options configuration
 */
export const THEME_OPTIONS: BaseOption[] = [
  {
    title: "Light Mode",
    value: Theme.LIGHT,
  },
  {
    title: "Dark Mode",
    value: Theme.DARK,
  },
  {
    title: "System Default",
    value: Theme.SYSTEM_DEFAULT,
  },
];

/**
 * Currency options configuration
 */
export const CURRENCY_OPTIONS: BaseOption[] = [
  {
    title: "USD",
    value: Currency.USD,
  },
  {
    title: "EUR",
    value: Currency.EUR,
  },
];

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Utility type to extract enum values
 */
export type EnumValues<T> = T[keyof T];

/**
 * Utility type for option value types
 */
export type OptionValue = string | number;

/**
 * Utility type for component variant props
 */
export type ComponentVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "default"
  | "turquoise";

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard to check if value is a valid TwoFactorMethod
 */
export const isTwoFactorMethod = (value: unknown): value is TwoFactorMethod => {
  return (
    typeof value === "number" &&
    Object.values(TwoFactorMethod).includes(value as TwoFactorMethod)
  );
};

/**
 * Type guard to check if value is a valid Language
 */
export const isLanguage = (value: unknown): value is Language => {
  return (
    typeof value === "number" &&
    Object.values(Language).includes(value as Language)
  );
};

/**
 * Type guard to check if value is a valid Theme
 */
export const isTheme = (value: unknown): value is Theme => {
  return (
    typeof value === "number" && Object.values(Theme).includes(value as Theme)
  );
};

/**
 * Type guard to check if value is a valid Currency
 */
export const isCurrency = (value: unknown): value is Currency => {
  return (
    typeof value === "number" &&
    Object.values(Currency).includes(value as Currency)
  );
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get enum key by value
 */
export const getEnumKeyByValue = <T extends Record<string, string | number>>(
  enumObject: T,
  value: string | number
): keyof T | undefined => {
  return Object.keys(enumObject).find((key) => enumObject[key] === value) as
    | keyof T
    | undefined;
};

/**
 * Get enum value by key
 */
export const getEnumValueByKey = <T extends Record<string, string | number>>(
  enumObject: T,
  key: string
): T[keyof T] | undefined => {
  return enumObject[key as keyof T];
};

/**
 * Convert enum to options array
 */
export const enumToOptions = <T extends Record<string, string | number>>(
  enumObject: T,
  labelFormatter?: (key: string) => string
): BaseOption[] => {
  return Object.entries(enumObject).map(([key, value]) => ({
    title: labelFormatter ? labelFormatter(key) : key,
    value,
  }));
};
