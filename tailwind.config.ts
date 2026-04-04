import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono-ui)", "monospace"],
      },
      keyframes: {
        beam: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -18px, 0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" },
        },
        "terminal-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(220, 90, 50, 0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(220, 90, 50, 0.3)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          "100%": {
            transform: "rotate(360deg) translateX(120px) rotate(-360deg)",
          },
        },
      },
      animation: {
        beam: "beam 8s linear infinite",
        shimmer: "shimmer 2.8s linear infinite",
        "float-slow": "float-slow 12s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "terminal-blink": "terminal-blink 1.2s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.8s ease-out forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        orbit: "orbit 20s linear infinite",
      },
      boxShadow: {
        dashboard:
          "0 20px 60px -28px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        glow: "0 0 40px rgba(220, 90, 50, 0.15)",
        "glow-strong": "0 0 60px rgba(220, 90, 50, 0.25)",
      },
    },
  },
} satisfies Config;

export default config;
