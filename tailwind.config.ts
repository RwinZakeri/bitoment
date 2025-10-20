import type { Config } from "tailwindcss";

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
        // Blue Palette
        blue: {
          50: "var(--blue-50)",
          100: "var(--blue-100)",
          200: "var(--blue-200)",
          300: "var(--blue-300)",
          400: "var(--blue-400)",
          500: "var(--blue-500)",
          600: "var(--blue-600)",
          700: "var(--blue-700)",
          800: "var(--blue-800)",
          900: "var(--blue-900)",
        },
        // Cyan Palette
        cyan: {
          50: "var(--cyan-50)",
          100: "var(--cyan-100)",
          200: "var(--cyan-200)",
          300: "var(--cyan-300)",
          400: "var(--cyan-400)",
          500: "var(--cyan-500)",
          600: "var(--cyan-600)",
          700: "var(--cyan-700)",
          800: "var(--cyan-800)",
          900: "var(--cyan-900)",
        },
        // Primary Cyan Variants
        "primary-cyan": {
          100: "var(--primary-cyan-100)",
          200: "var(--primary-cyan-200)",
          300: "var(--primary-cyan-300)",
          400: "var(--primary-cyan-400)",
          500: "var(--primary-cyan-500)",
          600: "var(--primary-cyan-600)",
          700: "var(--primary-cyan-700)",
          800: "var(--primary-cyan-800)",
          900: "var(--primary-cyan-900)",
        },
        // Gray Palette
        gray: {
          50: "var(--gray-50)",
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          250: "var(--gray-250)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          "400-alt": "var(--gray-400-alt)",
          "400-alt2": "var(--gray-400-alt2)",
          500: "var(--gray-500)",
          550: "var(--gray-550)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          "700-alt": "var(--gray-700-alt)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
        },
        // Red Palette
        red: {
          50: "var(--red-50)",
          100: "var(--red-100)",
          200: "var(--red-200)",
          300: "var(--red-300)",
          400: "var(--red-400)",
          500: "var(--red-500)",
          600: "var(--red-600)",
          700: "var(--red-700)",
          800: "var(--red-800)",
          900: "var(--red-900)",
        },
        // Green Palette
        green: {
          50: "var(--green-50)",
          100: "var(--green-100)",
          200: "var(--green-200)",
          300: "var(--green-300)",
          400: "var(--green-400)",
          500: "var(--green-500)",
          600: "var(--green-600)",
          700: "var(--green-700)",
          800: "var(--green-800)",
          900: "var(--green-900)",
        },
        // Slate Palette
        slate: {
          50: "var(--slate-50)",
          100: "var(--slate-100)",
          200: "var(--slate-200)",
          300: "var(--slate-300)",
          400: "var(--slate-400)",
          500: "var(--slate-500)",
          600: "var(--slate-600)",
          700: "var(--slate-700)",
          800: "var(--slate-800)",
          900: "var(--slate-900)",
        },
        // Custom Colors
        teal: {
          custom: "var(--custom-teal)",
        },
        coral: {
          custom: "var(--custom-coral)",
        },
        orange: {
          custom: "var(--custom-orange)",
        },
        purple: {
          custom: "var(--custom-purple)",
        },
        yellow: {
          custom: "var(--custom-yellow)",
        },
        // Semantic Colors
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)",
      },
    },
  },
  plugins: [],
};

export default config;
