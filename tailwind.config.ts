import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { dark: "#064E3B", DEFAULT: "#059669", light: "#D1FAE5" },
        surface: "#F8FAFC",
        ink: "#0F172A",
        muted: "#64748B",
        danger: "#DC2626",
        warn: "#F59E0B",
      },
      fontFamily: { sans: ["var(--font-cairo)", "system-ui", "sans-serif"] },
      boxShadow: { soft: "0 4px 24px -6px rgba(6,78,59,0.12)" },
      borderRadius: { xl2: "1.25rem" },
    },
  },
  plugins: [],
};
export default config;
