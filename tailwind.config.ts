import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#004d40',
          hover: '#00695c',
          light: '#00796b',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#20BA5A',
        },
        navy: '#1a2332',
        teal: {
          pale: '#b2dfdb',
          light: '#d1f2eb',
          bg: '#effcf9',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        opensans: ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
