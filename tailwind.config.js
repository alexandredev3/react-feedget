module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        brand: {
          100: 'var(--color-brandText)',
          300: 'var(--color-brandHover)',
          500: 'var(--color-brandPrimary)'
        },
        100: 'var(--color-textPrimary)',
        200: 'var(--color-tooltip)',
        400: 'var(--color-textSecondary)',
        600: 'var(--color-stroke)',
        700: 'var(--color-secondaryHover)',
        800: 'var(--color-secondary)',
        900: 'var(--color-primary)'
      },
      borderRadius: {
        md: '4px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')
  ],
}
