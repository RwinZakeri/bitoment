import ConfigProvider from "@/provider/provider";
import { Toaster } from "react-hot-toast";

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gray-200 min-h-screen transition-colors duration-200">
      <ConfigProvider>{children}</ConfigProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "var(--gray-200)",
            color: "var(--foreground)",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "var(--primary-cyan-400)",
              secondary: "var(--foreground)",
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: "var(--red-500)",
              secondary: "var(--foreground)",
            },
          },
        }}
      />
    </main>
  );
}
