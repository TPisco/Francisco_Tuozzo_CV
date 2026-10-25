import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        // A mouse or trackpad. Gates hover-only UI so touch devices never see it.
        "hover-fine": { raw: "(hover: hover) and (pointer: fine)" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // Headings use the same grotesk as the body; contrast comes from size and weight.
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        // Only for the italic accent word in a headline.
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      colors: {
        // Warm light palette: a toned paper background (cream) so the near-white
        // surfaces (shell) read clearly as cards, plus sand and earth accents.
        cream: {
          DEFAULT: "#efe8dd",
          deep: "#e8e0d3",
        },
        sand: {
          DEFAULT: "#e6ddcf",
          deep: "#dbd0bf",
        },
        shell: "#fffdfa",
        ink: {
          DEFAULT: "#231f1a",
          soft: "#5d554b",
          // Dark enough for small labels: 5.9:1 on shell, 4.9:1 on cream.
          faint: "#6b6257",
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
        // The only two radii besides full pills: big surfaces (hero, project
        // cards, panels) and the frames or photos that sit inside them.
        surface: "2.25rem",
        frame: "1.25rem",
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
