import { Toaster } from "react-hot-toast";

import ReactQueryProvider from "@/config/reactQuery";

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      {children}

      <Toaster />
    </ReactQueryProvider>
  );
};

export default ConfigProvider;
