/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Spartan', 'sans-serif']
    },
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
      purple: {
        100: '#7E88C3',
        200: '#9277FF',
        300: '#7C5DFA'
      },
      blue: {
        100: '#373B53',
        200: '#252945',
        300: '#1E2139',
        400: '#141625',
        500: '#0C0E16'
      },
      red: {
        100: '#FF9797',
        200: '#EC5757'
      },
      gray: {
        100: '#F8F8FB',
        200: '#DFE3FA',
        300: '#888EB0',
        400: '#494E6E',
        500: '#979797',
        600: '#F9FAFE'
      },
      green: '#33D69F',
      orange: '#FF8F00'
    },
    lineHeight: {
      sm: '0.9375rem',
      md: '1.125rem',
      lg: '1.375rem',
      xl: '1.5rem',
      '2xl': '2.25rem'
    },

    letterSpacing: {
      tighest: '-0.23px',
      tighter: '-0.25px',
      tight: '-0.63px',
      normal: '-0.8px',
      wide: '-1px'
    },
    extend: {
      fontSize: {
        xs: '0.6875rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.25rem',
        xl: '2rem'
      }
    }
  },
  plugins: []
}
