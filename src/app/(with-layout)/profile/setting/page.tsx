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

// Mapping functions to convert enum values to API string values
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

const SettingPage = () => {
  const [selectedOption, setSelectedOption] = useState<string | number>();
  const { setCurrency, setLanguage, setTheme } = useCurrency();

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

    // Close the drawer after selection
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
          />
        </Drawer>
      )}
    </PageLayout>
  );
};

export default SettingPage;
