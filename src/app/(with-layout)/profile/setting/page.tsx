"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import Drawer from "@/components/UI/drawer";
import LinkedOptions from "@/components/UI/linked-options";
import {
  Currency,
  Language,
  settingLinkedOptions,
  Theme,
} from "@/components/UI/linked-options/type";
import { useCurrency } from "@/context/currencyContext";
import {
  Currency as CurrencyEnum,
  Language as LanguageEnum,
  Theme as ThemeEnum,
} from "@/types";
import { useState } from "react";

const drawerItems = {
  language: {
    label: "Language",
    options: Language,
  },
  currency: {
    label: "Base Currency",
    options: Currency,
  },
  theme: {
    label: "Theme",
    options: Theme,
  },
} as const;

const mapCurrencyToApi = (currencyEnum: number): string => {
  switch (currencyEnum) {
    case CurrencyEnum.USD:
      return "USD";
    case CurrencyEnum.EUR:
      return "EUR";
    default:
      return "USD";
  }
};

const mapLanguageToApi = (languageEnum: number): string => {
  switch (languageEnum) {
    case LanguageEnum.ENGLISH:
      return "en";
    case LanguageEnum.SPANISH:
      return "es";
    case LanguageEnum.FRENCH:
      return "fr";
    case LanguageEnum.GERMAN:
      return "de";
    case LanguageEnum.CHINESE:
      return "zh";
    case LanguageEnum.ARABIC:
      return "ar";
    default:
      return "en";
  }
};

const mapThemeToApi = (themeEnum: number): string => {
  switch (themeEnum) {
    case ThemeEnum.LIGHT:
      return "light";
    case ThemeEnum.DARK:
      return "dark";
    case ThemeEnum.SYSTEM_DEFAULT:
      return "system";
    default:
      return "light";
  }
};

const mapApiToCurrency = (currencyString: string): number => {
  switch (currencyString) {
    case "USD":
      return CurrencyEnum.USD;
    case "EUR":
      return CurrencyEnum.EUR;
    default:
      return CurrencyEnum.USD;
  }
};

const mapApiToLanguage = (languageString: string): number => {
  switch (languageString) {
    case "en":
      return LanguageEnum.ENGLISH;
    case "es":
      return LanguageEnum.SPANISH;
    case "fr":
      return LanguageEnum.FRENCH;
    case "de":
      return LanguageEnum.GERMAN;
    case "zh":
      return LanguageEnum.CHINESE;
    case "ar":
      return LanguageEnum.ARABIC;
    default:
      return LanguageEnum.ENGLISH;
  }
};

const mapApiToTheme = (themeString: string): number => {
  switch (themeString) {
    case "light":
      return ThemeEnum.LIGHT;
    case "dark":
      return ThemeEnum.DARK;
    case "system":
      return ThemeEnum.SYSTEM_DEFAULT;
    default:
      return ThemeEnum.LIGHT;
  }
};

const SettingPage = () => {
  const [selectedOption, setSelectedOption] = useState<string | number>();
  const { setCurrency, setLanguage, setTheme, currency, language, theme } =
    useCurrency();

  const getCurrentValue = (selected: string): number | undefined => {
    if (selected === "currency" && currency) {
      return mapApiToCurrency(currency);
    } else if (selected === "language" && language) {
      return mapApiToLanguage(language);
    } else if (selected === "theme" && theme) {
      return mapApiToTheme(theme);
    }
    return undefined;
  };

  const chooseDrawerOption = (selected: string) => {
    return drawerItems[selected as keyof typeof drawerItems];
  };

  const handleCloseDrawer = () => {
    setSelectedOption(undefined);
  };

  const handleOptionSelect = (value: string | number) => {
    if (!selectedOption) return;

    const optionType = selectedOption as string;

    if (optionType === "currency" && typeof value === "number") {
      const currencyString = mapCurrencyToApi(value);
      setCurrency(currencyString);
    } else if (optionType === "language" && typeof value === "number") {
      const languageString = mapLanguageToApi(value);
      setLanguage(languageString);
    } else if (optionType === "theme" && typeof value === "number") {
      const themeString = mapThemeToApi(value);
      setTheme(themeString);
    }

    handleCloseDrawer();
  };

  return (
    <PageLayout title="Settings">
      <div className="mt-6">
        <LinkedOptions
          onLinkedOption={(e) => setSelectedOption(e)}
          options={settingLinkedOptions}
          label="Available Options"
        />
      </div>
      {selectedOption && (
        <Drawer
          title={chooseDrawerOption(selectedOption as string).label}
          onClose={handleCloseDrawer}
        >
          <LinkedOptions
            centerized
            onLinkedOption={handleOptionSelect}
            options={chooseDrawerOption(selectedOption as string).options}
            selectedValue={getCurrentValue(selectedOption as string)}
          />
        </Drawer>
      )}
    </PageLayout>
  );
};

export default SettingPage;
