import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        inter: ["var(--font-inter)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
      colors: {
        green: {
          ...colors.green,
          400: "var(--primary-green-400)",
          500: "var(--primary-green-500)",
        },
        gray: {
          50: "var(--gray-50)",
          70: "var(--gray-70)",
          300: "var(--gray-300)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
        },
        black: {
          500: "var(--primary-black-500)",
          900: "var(--primary-black-900)",
        },
        blue: {
          500: "var(--blue-500)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
