






export enum TwoFactorMethod {
  SMS = 1,
  EMAIL = 2,
  GOOGLE_AUTHENTICATOR = 3,
}


export enum Language {
  ENGLISH = 11,
  SPANISH = 12,
  FRENCH = 13,
  GERMAN = 14,
  CHINESE = 15,
  ARABIC = 16,
}


export enum Theme {
  LIGHT = 21,
  DARK = 22,
  SYSTEM_DEFAULT = 23,
}


export enum Currency {
  USD = 31,
  EUR = 32,
}


export type ButtonSize = "sm" | "md" | "lg";


export enum RadioVariant {
  DEFAULT = "default",
  TURQUOISE = "turquoise",
}






export interface BaseOption {
  title: string;
  value: string | number;
}


export interface TwoFactorOption {
  label: string;
  icon: React.ReactNode;
  value: TwoFactorMethod;
  id: string;
}


export interface LinkedOptionsProps {
  label?: string;
  options: BaseOption[];
  onLinkedOption: (value: string | number) => void;
  centerized?: boolean;
}


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline" | "outline-dark" | "text" | "secondary";
  size?: ButtonSize;
  loading?: boolean;
}


export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  variant?: RadioVariant;
}


export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline";
}


export interface ProfileItem {
  text: string;
  address: string;
  icon: React.ReactNode;
  id: string;
}


export interface DrawerProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  isOpen?: boolean;
}






export type OptionType = BaseOption;


export type TwoFactorMethodType = TwoFactorMethod;


export type LanguageType = Language;


export type ThemeType = Theme;


export type CurrencyType = Currency;






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






export type EnumValues<T> = T[keyof T];


export type OptionValue = string | number;


export type ComponentVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "default"
  | "turquoise";






export const isTwoFactorMethod = (value: unknown): value is TwoFactorMethod => {
  return (
    typeof value === "number" &&
    Object.values(TwoFactorMethod).includes(value as TwoFactorMethod)
  );
};


export const isLanguage = (value: unknown): value is Language => {
  return (
    typeof value === "number" &&
    Object.values(Language).includes(value as Language)
  );
};


export const isTheme = (value: unknown): value is Theme => {
  return (
    typeof value === "number" && Object.values(Theme).includes(value as Theme)
  );
};


export const isCurrency = (value: unknown): value is Currency => {
  return (
    typeof value === "number" &&
    Object.values(Currency).includes(value as Currency)
  );
};






export const getEnumKeyByValue = <T extends Record<string, string | number>>(
  enumObject: T,
  value: string | number
): keyof T | undefined => {
  return Object.keys(enumObject).find((key) => enumObject[key] === value) as
    | keyof T
    | undefined;
};


export const getEnumValueByKey = <T extends Record<string, string | number>>(
  enumObject: T,
  key: string
): T[keyof T] | undefined => {
  return enumObject[key as keyof T];
};


export const enumToOptions = <T extends Record<string, string | number>>(
  enumObject: T,
  labelFormatter?: (key: string) => string
): BaseOption[] => {
  return Object.entries(enumObject).map(([key, value]) => ({
    title: labelFormatter ? labelFormatter(key) : key,
    value,
  }));
};

export interface AssetData {
  name: string;
  percentage: string;
  price: string;
  icon: string;
}

export interface AssetDistributionResponse {
  success: boolean;
  data: AssetData[];
}
