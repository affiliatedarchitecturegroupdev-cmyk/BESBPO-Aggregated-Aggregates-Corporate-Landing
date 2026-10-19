import type { Config } from "tailwindcss";

// The store's brand system (apps/web/tailwind.config.ts in the store repo):
// Basalt Black, Limestone White, Slate Grey, Seam Blue accent, Ochre Gold
// reserve accent; Space Grotesk / Inter / IBM Plex Mono.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        basalt: "#1C1B1A",
        limestone: "#F2EFE9",
        slate: "#6B6560",
        "seam-blue": "#2C4A5E",
        "ochre-gold": "#C08A34",
        sand: "#DCD1BD",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { site: "76rem" },
      keyframes: {
        drift: { "0%": { transform: "scale(1.08) translate3d(0,0,0)" }, "100%": { transform: "scale(1.16) translate3d(-1.5%,-1%,0)" } },
      },
      animation: { drift: "drift 14s ease-out forwards" },
    },
  },
  plugins: [],
};

export default config;
