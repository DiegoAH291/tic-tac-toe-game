/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        O: "1px 1px 20px #3b82f6",
        X: "1px 1px 20px #facc15",
      },

      backgroundColor: {
        modal: "#00000085",
      },

      width: {
        modal: "600px",
      },
    },
  },
  plugins: [],
};
