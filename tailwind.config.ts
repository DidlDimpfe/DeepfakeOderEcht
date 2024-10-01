import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#edf6fa",
          75: "#d7ecf5",
          100: "#c8e3f0",
          200: "#a4d0e6",
          300: "#80bddc",
          400: "#5baad2",
          500: "#49a0cd",
          600: "#3a80a4",
          700: "#2c607b",
          800: "#1d4052",
          850: "#1F2937",
          900: "#111827",
          950: "#071014",
        },
        accent: {
          50: "#f7fbfb",
          100: "#E5E7EB",
          200: "#c1c2c4",
          300: "#a9a9ac",
          400: "#919193",
          500: "#858587",
          600: "#79797b",
          700: "#606162",
          800: "#303031",
          900: "#161616",
          950: "#0c0c0d",
        },
      },
    },
  },
  plugins: [],
};
export default config;
