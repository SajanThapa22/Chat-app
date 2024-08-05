/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "index.html"],
  theme: {
    extend: {
      colors: {
        txtClr: "var(--txt-clr)",
        bgClr: "var(--bg-clr)",
        bgComp: "var(--bg-comp)",
        purp: "var(--purp)",
        "txt-gray": "var(--txt-gray)",
        laal: "var(--laal)",
        light: "var(--light)",
        "bg-dd": "var( --bg-dd)",
        hariyo: "var(--hariyo)",
        primary: "var(--primary)",
        selected: "var(--bg-selected)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".hide-scrollbar": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none" /* Chrome, Safari, and Opera */,
        },
      };

      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};
