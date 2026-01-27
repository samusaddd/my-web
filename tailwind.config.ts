import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        surface: "rgba(255, 255, 255, 0.045)",
        stroke: "rgba(255, 255, 255, 0.12)",
      },
      boxShadow: {
        soft: "0 30px 90px -45px rgba(15, 23, 42, 0.8)",
        glow: "0 20px 60px -30px rgba(125, 211, 252, 0.35)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "36px 36px",
      },
    },
  },
  plugins: [typography],
} satisfies Config;

export default config;
