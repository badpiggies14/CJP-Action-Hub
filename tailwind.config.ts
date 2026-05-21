import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        coal: "rgb(var(--coal) / <alpha-value>)",
        stamp: "rgb(var(--stamp) / <alpha-value>)",
        ochre: "rgb(var(--ochre) / <alpha-value>)",
        newsprint: "rgb(var(--newsprint) / <alpha-value>)"
      },
      boxShadow: {
        brutal: "7px 7px 0 rgb(var(--ink) / 1)",
        "brutal-red": "7px 7px 0 rgb(var(--stamp) / 1)"
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Arial Narrow", "sans-serif"],
        body: ["var(--font-body)", "Inter", "Arial", "sans-serif"],
        editorial: ["var(--font-editorial)", "Georgia", "serif"]
      },
      backgroundImage: {
        "paper-noise":
          "radial-gradient(circle at 20% 20%, rgb(0 0 0 / 0.045) 0 1px, transparent 1px), radial-gradient(circle at 80% 0%, rgb(185 28 28 / 0.06) 0 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
