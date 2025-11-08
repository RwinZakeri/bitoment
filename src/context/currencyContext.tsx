"use client";
import axios from "@/config/axios.config";
import MutationKey from "@/types/mutation_key";
import ReactQueryKey from "@/types/react_query_key";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { CurrencyContextType } from "./type";


const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<string>("USD");
  const [theme, setThemeState] = useState<string>("light");
  const [language, setLanguageState] = useState<string>("en");
  const queryClient = useQueryClient();

  // Fetch user settings
  const { data, isLoading } = useQuery({
    queryKey: [ReactQueryKey.currency],
    queryFn: async () => {
      const response = await axios.get("user/settings");
      return response.data;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Update local state when data is fetched
  useEffect(() => {
    if (data?.settings) {
      setCurrencyState(data.settings.currency || "USD");
      setThemeState(data.settings.theme || "light");
      setLanguageState(data.settings.language || "en");
    }
  }, [data]);

  // Mutation for updating settings
  const { mutate: updateSettingsMutation } = useMutation({
    mutationKey: [MutationKey.updateSettings],
    mutationFn: async (settings: {
      currency?: string;
      theme?: string;
      language?: string;
    }) => {
      const response = await axios.put("user/settings", settings);
      return response.data;
    },
    onSuccess: (data) => {
      // Update local state
      if (data?.settings) {
        if (data.settings.currency) {
          setCurrencyState(data.settings.currency);
        }
        if (data.settings.theme) {
          setThemeState(data.settings.theme);
        }
        if (data.settings.language) {
          setLanguageState(data.settings.language);
        }
      }
      // Invalidate and refetch settings
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKey.currency],
      });
    },
    onError: (error) => {
      console.error("Failed to update settings:", error);
    },
  });

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);
    updateSettingsMutation({ currency: newCurrency });
  };

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    updateSettingsMutation({ theme: newTheme });
  };

  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage);
    updateSettingsMutation({ language: newLanguage });
  };

  const updateSettings = async (settings: {
    currency?: string;
    theme?: string;
    language?: string;
  }) => {
    return new Promise<void>((resolve, reject) => {
      updateSettingsMutation(settings, {
        onSuccess: () => resolve(),
        onError: (error) => reject(error),
      });
    });
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        theme,
        language,
        setCurrency,
        setTheme,
        setLanguage,
        isLoading,
        updateSettings,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
