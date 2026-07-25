/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    fontFamily: {
      primary: ["JetBrains Mono", "monospace"],
    },
    extend: {
      colors: {
        primary: "#1c1c22",
        secondary: "#141418",
        accent: {
          DEFAULT: "#00ff99",
          hover: "#00e68a",
        },
      },
    },
  },
  plugins: [],
}
