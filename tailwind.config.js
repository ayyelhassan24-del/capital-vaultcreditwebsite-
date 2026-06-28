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
          bg:      "#0B0B0F",              // obsidian black — page background
          card:    "#111116",              // slightly lighter obsidian — card surface
          ink:     "#F0EDE8",              // titanium white — primary text on dark bg
          muted:   "#9a948a",              // warm muted gray — secondary text
          gold:    "#D4AF37",              // muted gold — CTA borders, accent markers
          cta:     "#D4AF37",              // gold CTA fill
          border:  "rgba(255,255,255,0.10)", // subtle white hairline on dark bg
          black:   "#0B0B0F",
          surface: "#161616",
          cream:   "#F0EDE8",
          dark:    "#2a2a2a",
        },
        hairline: "rgba(212, 175, 55, 0.15)",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans:  ["Sora", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.02em",
        wider:   "0.10em",
        widest:  "0.28em",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
