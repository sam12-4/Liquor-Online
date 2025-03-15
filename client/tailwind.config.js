/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // Liquor Online colors
        primary: {
          DEFAULT: "#cc375b", // Pink-red color from Liquor Online
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#b1a856", // Gold color from the website
          foreground: "#ffffff",
        },
        background: "#f9f9f9", // Light background color
        darkBg: "#0e0c0b",    // Dark background color
        accent: "#c89255",    // Accent color from the site
        neutral: {
          DEFAULT: "#9e9d9a",
          light: "#f8f8f6",
          dark: "#2f3029",
        },
        border: "#e5e5e5",
        input: "#e5e5e5",
        muted: {
          DEFAULT: "#f6f6f6",
          foreground: "#6c757d",
        },
        // Keep other needed colors
        card: {
          DEFAULT: "#ffffff",
          foreground: "#333333",
        },
        destructive: {
          DEFAULT: "#ff4d4f",
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        serif: ['Marcellus', 'serif'],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
