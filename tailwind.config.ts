import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: "375px",
        xs: "420px",
      },
      colors: {
        white: "#FAFAFA",
        light: "#C7C9D9",
        main: "#8F90A6",
        dark: "#555770",
        black: {
          light: "#555770",
          main: "#28293D",
          dark: "#242434",
        },
        primary: {
          light: "#6698FA",
          main: "#3E7BFA",
          dark: "#3568D4",
        },
        success: {
          light: "#39D98A",
          main: "#06C270",
          dark: "#05A660",
        },
        error: {
          light: "#ff7878",
          main: "#FF6464",
          dark: "#ff5050",
        },
        warning: {
          light: "#FDAC42",
          main: "#FF8800",
          dark: "#E57A00",
        },
        info: {
          light: "#5B8DEF",
          main: "#0063F7",
          dark: "#004FC4",
        },
      },
      keyframes: {
        wiggle: {
          "40%, 60%, 80%": { transform: "rotate(-12deg)" },
          "30%, 50%, 70%, 90%": { transform: "rotate(12deg)" },
          "0%, 10%, 20%, 100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
