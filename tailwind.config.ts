import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'base': ['Open Sans', '-apple-system', 'BlinkMacSystemFont', 'avenir next', 'avenir', 'helvetica', 'helvetica neue', 'ubuntu', 'roboto', 'noto', 'segoe ui', 'arial', 'sans-serif'],
        'code': ['San Francisco Mono', 'Monaco', 'Consolas', 'Lucida Console', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'monospace'],
      },
      colors: {
        'light-primary': '#111',
        'light-secondary': '#111',
        'light-background': '#fff',
        'light-code': '#fff',
        'light-code-background': '#fff',
        'dark-primary': '#c9d1d9',
        'dark-secondary': '#c9d1d9',
        'dark-background': '#0d1117',
        'dark-code': '#0d1117',
        'dark-code-background': '#0d1117',
        'dark-border-default': '#30363d',
        'dark-canvas-subtle': '#161b22',
      },
      fontSize: {
        'base': '1rem',
      },
      maxWidth: {
        'body': '800px',
        'container': '800px',
      },
      spacing: {
        'container': '20px',
      },
      lineHeight: {
        'body': '1.8rem',
      },
      borderRadius: {
        'box': '6px',
      },
      borderWidth: {
        'box': '1px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config; 
