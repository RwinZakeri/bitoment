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
        blue: {
          500: "var(--blue-500)",
        },
        cyan: {
          ...colors.cyan,
          300: "var(--primary-cyan-300)",
          400: "var(--primary-cyan-400)",
          500: "var(--primary-cyan-500)",
        },
        gray: {
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          "400-alt2": "var(--gray-400-alt2)",
          400: "var(--gray-400)",
          "400-alt": "var(--gray-400-alt)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          "700-alt": "var(--gray-700-alt)",
          700: "var(--gray-700)",
        },
        red: {
          500: "var(--red-500)",
        },
        slate: {
          ...colors.slate,
          800: "var(--primary-slate-800)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
