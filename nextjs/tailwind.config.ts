import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("daisyui")],
  // @ts-ignore
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#60a5fa",
          "primary-content": "#0f172a",
          secondary: "#a78bfa",
          "secondary-content": "#0f172a",
          accent: "#22d3ee",
          "accent-content": "#0f172a",
          neutral: "#64748b",
          "neutral-content": "#f1f5f9",
          "base-100": "#0f172a",
          "base-200": "#1e293b",
          "base-300": "#334155",
          "base-content": "#f1f5f9",
          info: "#38bdf8",
          "info-content": "#0f172a",
          success: "#34d399",
          "success-content": "#0f172a",
          warning: "#fbbf24",
          "warning-content": "#0f172a",
          error: "#f87171",
          "error-content": "#0f172a",
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};
export default config;
