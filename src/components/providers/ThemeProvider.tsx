"use client";

import { useCurrency } from "@/context/currencyContext";
import { useEffect } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, isLoading } = useCurrency();

  useEffect(() => {
    if (isLoading) return;

    const root = document.documentElement;

    root.classList.remove("dark", "light");
    root.removeAttribute("data-theme");

    let themeToApply = theme || "dark";

    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      themeToApply = prefersDark ? "dark" : "light";
    }

    if (themeToApply === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.add("light");
      root.setAttribute("data-theme", "light");
    }

    // Sync theme to localStorage for FOUC prevention on next page load
    try {
      if (theme) {
        localStorage.setItem("theme", theme);
      } else {
        localStorage.setItem("theme", "dark");
      }
    } catch (e) {
      // localStorage might not be available in some environments
      console.warn("Failed to save theme to localStorage:", e);
    }
  }, [theme, isLoading]);

  useEffect(() => {
    if (isLoading) return;

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = (e: MediaQueryListEvent) => {
        const root = document.documentElement;
        root.classList.remove("dark", "light");
        root.removeAttribute("data-theme");

        if (e.matches) {
          root.classList.add("dark");
          root.setAttribute("data-theme", "dark");
        } else {
          root.classList.add("light");
          root.setAttribute("data-theme", "light");
        }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, isLoading]);

  return <>{children}</>;
}
