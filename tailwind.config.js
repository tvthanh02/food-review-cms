/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

const BASE_FONT_SIZE = 10;

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
    './node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        constructive: {
          DEFAULT: 'hsl(var(--constructive))',
          foreground: 'hsl(var(--constructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
      spacing: () => ({
        ...Array.from({ length: 96 }, (_, index) => index * 0.5)
          .filter((i) => i)
          .reduce(
            (acc, i) => ({ ...acc, [i]: `${i / (BASE_FONT_SIZE / 4)}rem` }),
            {}
          ),
      }),
      fontSize: {
        xs: [
          `${(16 * 0.75) / BASE_FONT_SIZE}rem` /* 12px */,
          {
            lineHeight: `${(16 * 1) / BASE_FONT_SIZE}rem` /* 16px */,
          },
        ],
        sm: [
          `${(16 * 0.875) / BASE_FONT_SIZE}rem` /* 14px */,
          {
            lineHeight: `${(16 * 1.25) / BASE_FONT_SIZE}rem` /* 20px */,
          },
        ],
        base: [
          `${(16 * 1) / BASE_FONT_SIZE}rem` /* 16px */,
          {
            lineHeight: `${(16 * 1.5) / BASE_FONT_SIZE}rem` /* 24px */,
          },
        ],
        lg: [
          `${(16 * 1.125) / BASE_FONT_SIZE}rem` /* 18px */,
          {
            lineHeight: `${(16 * 1.75) / BASE_FONT_SIZE}rem` /* 28px */,
          },
        ],
        xl: [
          `${(16 * 1.25) / BASE_FONT_SIZE}rem` /* 20px */,
          {
            lineHeight: `${(16 * 1.75) / BASE_FONT_SIZE}rem` /* 28px */,
          },
        ],
        '2xl': [
          `${(16 * 1.5) / BASE_FONT_SIZE}rem` /* 24px */,
          {
            ineHeight: `${(16 * 2) / BASE_FONT_SIZE}rem` /* 32px */,
          },
        ],
        '3xl': [
          `${(16 * 1.875) / BASE_FONT_SIZE}rem` /* 30px */,
          {
            lineHeight: `${(16 * 2.25) / BASE_FONT_SIZE}rem` /* 36px */,
          },
        ],
        '4xl': [
          `${(16 * 2.25) / BASE_FONT_SIZE}rem` /* 36px */,
          {
            lineHeight: `${(16 * 2.5) / BASE_FONT_SIZE}rem` /* 40px */,
          },
        ],
        '5xl': [
          `${(16 * 3) / BASE_FONT_SIZE}rem` /* 48px */,
          {
            lineHeight: (16 * 1) / BASE_FONT_SIZE,
          },
        ],
        '6xl': [
          `${(16 * 3.75) / BASE_FONT_SIZE}rem` /* 60px */,
          {
            lineHeight: (16 * 1) / BASE_FONT_SIZE,
          },
        ],
        '7xl': [
          `${(16 * 4.5) / BASE_FONT_SIZE}rem` /* 72px */,
          {
            lineHeight: (16 * 1) / BASE_FONT_SIZE,
          },
        ],
        '8xl': [
          `${(16 * 6) / BASE_FONT_SIZE}rem` /* 96px */,
          {
            lineHeight: (16 * 1) / BASE_FONT_SIZE,
          },
        ],
        '9xl': [
          `${(16 * 8) / BASE_FONT_SIZE}rem` /* 128px */,
          {
            lineHeight: (16 * 1) / BASE_FONT_SIZE,
          },
        ],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  presets: [require('@medusajs/ui-preset')],
};
