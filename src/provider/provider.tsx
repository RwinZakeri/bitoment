import ReactQueryProvider from "@/config/reactQuery";

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default ConfigProvider;
