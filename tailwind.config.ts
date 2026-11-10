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
        paper: "#f5f0e7",
        ivory: "#fcf8f1",
        ink: "#24231f",
        muted: "#686155",
        accent: "#87432f",
        lavender: "#d9c6aa",
        coral: "#b9684e",
        surface: "#fcf8f1",
        stroke: "rgba(36, 35, 31, 0.14)",
      },
      boxShadow: {
        soft: "0 24px 70px -48px rgba(42, 31, 43, 0.28)",
        lift: "0 30px 80px -52px rgba(42, 31, 43, 0.34)",
      },
      borderRadius: {
        editorial: "1.35rem",
      },
      maxWidth: {
        editorial: "80rem",
        reading: "46rem",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [typography],
} satisfies Config;

export default config;
