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
        blue: {
          DEFAULT: "#0057FF",
          dark: "#0040CC",
          glow: "rgba(0, 87, 255, 0.12)",
        },
        orange: {
          DEFAULT: "#FF7A00",
          dark: "#CC6200",
          glow: "rgba(255, 122, 0, 0.12)",
        },
        bg: {
          DEFAULT: "#ffffff",
          alt: "#f5f5f7",
          card: "#f0f0f5",
        },
        lines: "#e0e0e8",
        "menu-bg": "#ffffff",
        text: {
          100: "#0a0a0f",
          64: "rgba(10,10,15,0.64)",
          50: "rgba(10,10,15,0.50)",
          30: "rgba(10,10,15,0.30)",
          20: "rgba(10,10,15,0.12)",
        },
        dark: {
          bg: "#04050F",
          card: "#0D1020",
          lines: "#1a1d2e",
        },
      },
      fontFamily: {
        display: ["'Clash Display'", "sans-serif"],
        body: ["'Satoshi'", "sans-serif"],
      },
      borderRadius: {
        pill: "99rem",
        card: "2rem",
        sm: "0.5rem",
      },
      spacing: {
        section: "10rem",
        lg: "5rem",
        md: "2rem",
      },
      transitionDuration: {
        fast: "200ms",
        mid: "400ms",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "marquee-left": "marquee-left var(--duration, 45s) linear infinite",
        "marquee-right": "marquee-right var(--duration, 55s) linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
