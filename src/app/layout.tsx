import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  
  const rtlLocales = ["ar", "he", "fa", "ur"];
  const isRTL = rtlLocales.includes(locale);

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Check if user has a saved theme preference
                  const savedTheme = localStorage.getItem('theme');
                  const root = document.documentElement;
                  
                  // Set dark mode as default if no saved preference
                  if (!savedTheme || savedTheme === 'dark') {
                    root.classList.add('dark');
                    root.setAttribute('data-theme', 'dark');
                  } else if (savedTheme === 'light') {
                    root.classList.add('light');
                    root.setAttribute('data-theme', 'light');
                  } else if (savedTheme === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    if (prefersDark) {
                      root.classList.add('dark');
                      root.setAttribute('data-theme', 'dark');
                    } else {
                      root.classList.add('light');
                      root.setAttribute('data-theme', 'light');
                    }
                  } else {
                    // Default to dark mode
                    root.classList.add('dark');
                    root.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {
                  // Fallback to dark mode if localStorage is not available
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${poppins.className} relative max-w-[520px] w-full mx-auto`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
