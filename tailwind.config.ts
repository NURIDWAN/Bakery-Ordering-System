import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#fff8f1",
        surface: "#fffdf9",
        sand: "#f5ede3",
        cream: "#fff4e7",
        ink: "#22160e",
        cocoa: "#5c2d12",
        copper: "#9a5b30",
        butter: "#f4c27b",
        sage: "#9eb28b",
        rose: "#d9897f",
        line: "#ead9ca"
      },
      boxShadow: {
        card: "0 20px 60px rgba(92, 45, 18, 0.08)"
      },
      fontFamily: {
        sans: ["'Be Vietnam Pro'", "'Avenir Next'", "Avenir", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["'Libre Caslon Text'", "'Iowan Old Style'", "'Palatino Linotype'", "'Book Antiqua'", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
