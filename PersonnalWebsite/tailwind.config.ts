import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      colors: {
        // Warm, premium light palette — cream paper, soft sand, earth accents.
        cream: {
          DEFAULT: "#faf6f0",
          deep: "#f5efe6",
        },
        sand: {
          DEFAULT: "#f0e8dd",
          deep: "#e7dccd",
        },
        shell: "#fffdfa",
        ink: {
          DEFAULT: "#231f1a",
          soft: "#5d554b",
          faint: "#938979",
        },
        clay: {
          DEFAULT: "#c2603f",
          deep: "#a4492c",
          soft: "#d98a6a",
        },
        sage: "#7c8a6f",
        gold: "#b07d3b",
      },
      maxWidth: {
        prose: "60ch",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(35,31,26,0.04), 0 18px 40px -24px rgba(70,50,30,0.22)",
        lift: "0 2px 4px rgba(35,31,26,0.05), 0 30px 60px -28px rgba(70,50,30,0.28)",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
