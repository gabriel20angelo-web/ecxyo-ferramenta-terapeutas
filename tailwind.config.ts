import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--c-bg)", surface: "var(--c-surface)", "surface-hover": "var(--c-surface-hover)",
        card: "var(--c-card)", "card-hover": "var(--c-card-hover)",
        border: "var(--c-border)", "border-light": "var(--c-border-light)",
        text: "var(--c-text)", "text-muted": "var(--c-text-muted)", "text-dim": "var(--c-text-dim)",
        accent: "var(--c-accent)", "accent-soft": "var(--c-accent-soft)",
        psi: {
          green: "var(--c-green)", "green-soft": "var(--c-green-soft)",
          rose: "var(--c-rose)", "rose-soft": "var(--c-rose-soft)",
          blue: "var(--c-blue)", "blue-soft": "var(--c-blue-soft)",
          amber: "var(--c-amber, var(--c-accent))", "amber-soft": "var(--c-accent-soft)",
          couple: "var(--c-couple)", "couple-soft": "var(--c-couple-soft)",
          blocked: "var(--c-blocked)",
        },
      },
      fontFamily: {
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        sans: ["'Outfit'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
