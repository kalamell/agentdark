/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        mp: "1025px",
        
      }
    },
    fontFamily: {
      athitiLight: ["Athiti-Light", "sans-serif"],
      athitiExtraLight: ["Athiti-ExtraLight", "sans-serif"],
      athitiRegular: ["Athiti-Regular", "sans-serif"],
      athitiMedium: ["Athiti-Medium", "sans-serif"],
      athitiBold: ["Athiti-Bold", "sans-serif"],
      athitiSemiBold: ["Athiti-SemiBold", "sans-serif"],
      nineMedium: ["Sarabun-Medium", "sans-serif"],
      nineBold: ["Sarabun-Bold", "sans-serif"],
      nineSemiBold: ["Sarabun-SemiBold", "sans-serif"]
    },
  },
  plugins: [],
};
