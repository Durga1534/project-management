import formsPlugin from '@tailwindcss/forms';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    formsPlugin,
    daisyui,
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
  darkMode: 'class',
};
