/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vault: {
          black: "#0a0a0a",
          gold: "#d4af37",
          cream: "#f7f4ed",
          ink: "#16130d",
          muted: "#9a948a",
        },
        hairline: "rgba(212, 175, 55, 0.20)",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Sora", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.02em",
        wider: "0.1em",
        widest: "0.28em",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
