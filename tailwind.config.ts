import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "text-slate-600",
    "text-gray-600",
    "text-zinc-600",
    "text-neutral-600",
    "text-stone-600",
    "text-red-600",
    "text-orange-600",
    "text-amber-600",
    "text-yellow-600",
    "text-lime-600",
    "text-green-600",
    "text-emerald-600",
    "text-teal-600",
    "text-cyan-600",
    "text-sky-600",
    "text-blue-600",
    "text-indigo-600",
    "text-violet-600",
    "text-purple-600",
    "text-fuchsia-600",
    "text-pink-600",
    "text-rose-600",
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
          825: "#1E2C3B",
          850: "#1F2937",
          875: "#181F2D",
          900: "#111827",
          925: "#0C141D",
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
      screens: {
        "3xl": "1800px",
      },
    },
  },
  plugins: [],
};
export default config;
