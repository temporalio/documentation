module.exports = {
  mode: "jit",
  purge: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false, // to use Docusaurus base styles
    container: false, // use container style from docusaurus
  },
  important: "#tailwind", // incrementally adopt Tailwind by wrapping pages with <div id="tailwind"> </div>
  theme: {
    extend: {
      transitionDelay: {
        3000: "3000ms",
      },
      fontFamily: {
        light: ["Aeonik-Light"],
        bold: ["Aeonik-Bold"],
      },
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
      },
      colors: {
        offwhite: "#F2F2F2",
        temporalblue: "#B2E7EA",
        temporalbrightblue: "#127AE5",
        temporalpurple: "#B8B4DC",
        temporalbrightpurple: "#8F86DA",
        spaceblack: "#141414",
        green1: "#9EE587",
        green2: "#32D67B",
        orange1: "#FFA280",
        orange2: "#FF7065",
        gray5: "#E0E0E0",
        lightgray: "rgba(242,242,242,0.5)",
        lightteal: "#C7EDEF",
      },
      boxShadow: {
        temporalblue: "0 25px 50px -12px rgba(178, 231, 234, 0.1)",
      },
      gridTemplateColumns: {
        usecases: "200px minmax(0, 1fr)",
      },
      maxWidth: {
        700: "700px",
      },
      width: {
        200: "200px",
        300: "300px",
        700: "700px",
        800: "800px",
        "3/1": "300%",
      },
      height: {
        60: "60px",
        200: "200px",
        300: "300px",
        400: "400px",
        700: "700px",
        800: "800px",
        "3/1": "300%",
      },
      fontSize: {
        60: "60px",
        144: "144px",
      },
      lineHeight: {
        36: "36px",
        48: "48px",
        60: "60px",
        72: "72px",
        144: "144px",
      },
      zIndex: {
        "-1": "-1",
      },
    },
  },
  variants: {
    visibility: ["responsive", "hover", "focus"],
    animation: ["responsive", "hover", "focus"],
  },
  plugins: [require("@tailwindcss/typography")],
};
