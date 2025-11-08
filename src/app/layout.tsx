import ConfigProvider from "@/provider/provider";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/bitoment_rounded.png", sizes: "any" },
      { url: "/bitoment_rounded.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/bitoment_rounded.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/bitoment_rounded.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00e4cc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} relative max-w-[520px] w-full mx-auto`}
      >
        <main className="bg-gray-200 dark:bg-gray-100 min-h-screen transition-colors duration-200">
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
      </body>
    </html>
  );
}
