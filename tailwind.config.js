// tailwind.config.js

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f8796c",
        white: "#ffffff",
        dark: "#000000",
        transparent: "transparent",
        borderColor: "#ededed",
        success: "#10b981",
        warn: "#ffb702",
        error: "#ff623d",
        pending: "#ffb702",
        cancle: "#ff623d"
      },
    },
  },
  plugins: [],
};
