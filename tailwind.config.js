/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    // './html/*.html',
    "./src/**/*.{js,jsx,ts,tsx}",
    // './*.html',   // Include your HTML files
    // './src/**/*.{html,js}',
  ],
  darkMode:'class',
  theme: {
    // screens: {
    //   sm: '480px',
    //   md: '768px',
    //   lg: '976px',
    //   xl: '1440px'
    // },
    // container: {
    //   center: true,
    //   padding: '2rem'
    // },
    extend: {
      colors: {
        brightRed: 'hsl(12,88%,59%)',
        brightRedLight: 'hsl(12, 88%, 69%)',
        brightRedSupLight: 'hsl(12, 88%, 95%)',
        darkBlue: 'hsl(228, 39%, 23%)',
        darkGrayishBlue: 'hsl(227, 12%, 61%)',
        veryDarkBlue: 'hsl(233, 12%, 13%)',
        veryPaleRed: 'hsl(13, 100%, 96%)',
        veryLightGray: 'hsl(0, 0%, 98%)',
        twitter:'#1da1f2',
      },
      spacing: {
        '38': '9.5rem',  // Adding 9.5rem as custom spacing
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-100%)', opacity: '0' },
        },
        expand: {
          '0%': { maxHeight: '0px', opacity: '0' },
          '100%': { maxHeight: '500px', opacity: '1' }, // Adjust maxHeight as needed
        },
        collapse: {
          '0%': { maxHeight: '500px', opacity: '1' },
          '100%': { maxHeight: '0px', opacity: '0' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.5s',
        slideUp: 'slideUp 0.5s',
        expand: 'expand 0.5s ease-in-out forwards',
        collapse: 'collapse 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}

