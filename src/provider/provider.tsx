import { Toaster } from "react-hot-toast";

import ReactQueryProvider from "@/config/reactQuery";
import CurrencyProvider from "@/context/currencyContext";
import ThemeProvider from "@/components/providers/ThemeProvider";

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <CurrencyProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </CurrencyProvider>
      <Toaster />
    </ReactQueryProvider>
  );
};

export default ConfigProvider;
