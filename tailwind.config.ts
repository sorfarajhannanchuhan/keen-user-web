import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./admin-panel/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          linen: "var(--bg-canvas)",
          "linen-dark": "var(--bg-card)",
          "linen-subtle": "var(--bg-card-subtle)",
          elevated: "var(--bg-elevated)",
          sand: "var(--border-subtle)",
          "sand-dark": "var(--border-hover)",
          charcoal: "var(--text-main)",
          "charcoal-muted": "var(--text-muted)",
          "charcoal-light": "var(--text-light)",
          gold: "#D4AF37",
          "gold-hover": "#E5C04E",
          forest: "#1F342B",
          olive: "#3F4D38",
          taupe: "#A8A29E",
          terracotta: "#C87A65",
        },
      },
      fontFamily: {
        brandon: ["'Brandon Grotesque'", "'Brandon Text'", "'Hind Siliguri'", "'Nirmala UI'", "sans-serif"],
        "brandon-text": ["'Brandon Text'", "'Brandon Grotesque'", "'Hind Siliguri'", "'Nirmala UI'", "sans-serif"],
        heading: ["'Brandon Grotesque'", "'Brandon Text'", "'Hind Siliguri'", "'Nirmala UI'", "sans-serif"],
        jost: ["'Brandon Grotesque'", "'Brandon Text'", "'Hind Siliguri'", "'Nirmala UI'", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "'Hind Siliguri'", "'Nirmala UI'", "-apple-system", "sans-serif"],
        serif: ["'Brandon Grotesque'", "'Brandon Text'", "'Hind Siliguri'", "'Nirmala UI'", "sans-serif"],
        bengali: ["'Hind Siliguri'", "'Plus Jakarta Sans'", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 10px 30px -10px rgba(0, 0, 0, 0.06)",
        "luxury-hover": "0 20px 40px -15px rgba(212, 175, 55, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
