import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Pastel Palette
        primary: {
          50: "#FFF5F5",
          100: "#FFE4E6",
          200: "#FECDD3",
          300: "#FDA4AF",
          400: "#FB7185",
          500: "#F43F5E",
          DEFAULT: "#FDA4AF",
        },
        // Cream/Beige
        cream: {
          50: "#FFFBF5",
          100: "#FEF3E2",
          200: "#FCE7C5",
          300: "#F9D5A0",
          DEFAULT: "#FEF3E2",
        },
        // Mint Green
        mint: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          DEFAULT: "#D1FAE5",
        },
        // Lavender
        lavender: {
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D5FF",
          300: "#D8B4FE",
          DEFAULT: "#F3E8FF",
        },
        // Text colors (soft grays instead of pure black)
        text: {
          primary: "#374151",
          secondary: "#6B7280",
          muted: "#9CA3AF",
        },
        // Background
        background: "#FFFBF8",
        foreground: "#374151",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "soft-lg": "0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 10px -2px rgba(0, 0, 0, 0.04)",
        "soft-xl": "0 20px 50px -12px rgba(0, 0, 0, 0.15)",
        glow: "0 0 40px rgba(253, 164, 175, 0.3)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-soft": "linear-gradient(135deg, #FFF5F5 0%, #FEF3E2 50%, #F3E8FF 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
