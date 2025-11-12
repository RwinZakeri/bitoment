export interface CurrencyContextType {
  currency: string;
  theme: string;
  language: string;
  setCurrency: (currency: string) => void;
  setTheme: (theme: string) => void;
  setLanguage: (language: string) => void;
  isLoading: boolean;
  updateSettings: (settings: {
    currency?: string;
    theme?: string;
    language?: string;
  }) => Promise<{
    success: boolean;
    message: string;
    settings: {
      currency: string;
      theme: string;
      language: string;
    };
  }>;
}
