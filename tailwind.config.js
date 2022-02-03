module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    fontFamily: {
      primaryFont: ['Red Hat Display, sans-serif']
    },


    container: {
      center: true,
      padding: "1rem",
      screens: { lg: "1400px", xl: "1124px", "2xl": "1124px" },
    },
    extend: {
      colors: {
        subtleOrange: {
          100: "#efe9db",
          200: "#dfd3b8",
          300: "#cfbe94",
          400: "#bfa871",
          500: "#af924d",
          600: "#8c753e",
          700: "#69582e",
          800: "#463a1f",
          900: "#231d0f",
        },
        seaFoam: {
          100: "#e2e7e6",
          200: "#c4cfcd",
          300: "#a7b6b5",
          400: "#899e9c",
          500: "#6c8683",
          600: "#566b69",
          700: "#41504f",
          800: "#2b3634",
          900: "#161b1a"
},
      },
    },
  },
  plugins: [],
};
