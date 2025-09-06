/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#f3f4f6",
          dark: "#111827",
        },
        foreground: {
          light: "#111827",
          dark: "#f9fafb",
        },
      },
    },
  },
  plugins: [],
};
