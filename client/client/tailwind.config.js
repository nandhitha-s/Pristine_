import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f38c10",

          secondary: "#a7763b",

          accent: "#d2b6ba",

          neutral: "#2f1710",

          "base-100": "#ccd7d8",

          info: "#ffda43",

          success: "#91ba96",

          warning: "#be3f12",

          error: "#4c482e",
        },
      },
    ],
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'or' : '#f38c10',
      }
    },
  },
  plugins: [daisyui],
};
