import { Toaster } from "react-hot-toast";

import ReactQueryProvider from "@/config/reactQuery";
import CurrencyProvider from "@/context/currencyContext";

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <CurrencyProvider>{children}</CurrencyProvider>
      <Toaster />
    </ReactQueryProvider>
  );
};

export default ConfigProvider;
