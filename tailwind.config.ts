import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'electric-violet': {
          '50': '#fbf4ff',
          '100': '#f4e6ff',
          '200': '#ecd2ff',
          '300': '#ddafff',
          '400': '#c87bff',
          '500': '#b249ff',
          '600': '#9e22f7',
          '700': '#8a16da',
          '800': '#7517b2',
          '900': '#60148f',
          '950': '#42006b',
        },
        'razzle-dazzle-rose': {
          '50': '#fff4ff',
          '100': '#fde9fe',
          '200': '#fad1fd',
          '300': '#faadfa',
          '400': '#f67cf4',
          '500': '#e830e5',
          '600': '#cf2ac9',
          '700': '#ab20a3',
          '800': '#8c1c84',
          '900': '#731c6b',
          '950': '#4c0646',
        },
      },
      fontFamily: {
        heading: 'Lexend',
        content: '"Source Sans 3"',
        dm: 'DM Sans',
      },
    },
  },
  plugins: [],
};
export default config;
