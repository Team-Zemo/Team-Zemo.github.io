/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        alice: ["Alice", "serif"],
        federant: ["Federant", "serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        "100px": "100px",
        "8xl": "6rem",
        "9xl": "8rem",
        "10xl": "15rem",
      },
      backgroundColor: {
        "custom-green": "#d9fddb",
      },
      animation: {
        "scale-smooth": "scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
