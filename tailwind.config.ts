import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        tight: '1.25',
        snug: '1.375',
        relaxed: '1.625',
      },
      fontFamily: {
        body: ["var(--font-outfit)", "sans-serif"],
        display: ["Orbitron", "sans-serif"],
        sans: ["var(--font-outfit)", "sans-serif"],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          neon: '#00f2ff',
        },
        accent: {
          500: '#8b5cf6',
          600: '#7c3AED',
          neon: '#ff00ae',
        },
        neon: {
          cyan: '#00f2ff',
          pink: '#ff00ae',
          violet: '#8b5cf6',
          blue: '#2d5bff',
        },
        dark: {
          900: '#050505',
          800: '#0a0a0c',
          700: '#121214',
        }
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { 'text-shadow': '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #00f2ff, 0 0 40px #00f2ff' },
          'to': { 'text-shadow': '0 0 20px #fff, 0 0 30px #ff00ae, 0 0 40px #ff00ae, 0 0 50px #ff00ae' },
        }
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
export default config;
