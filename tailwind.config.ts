import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        condensed: ['var(--font-condensed)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        green: { DEFAULT: '#008C3A', dark: '#006B2D' },
        yellow: { DEFAULT: '#F5C400', gold: '#D9A300' },
        brand: {
          black: '#050505',
          dark: '#111111',
          dark2: '#181818',
          card: '#161616',
        },
      },
    },
  },
  plugins: [],
};

export default config;
