// tailwind.config.js
module.exports = {
  content: [
    "./index.html",             // For Vite
    "./src/**/*.{js,ts,jsx,tsx}" // For all React components
  ],
  theme: {
    extend: {
       keyframes: {
        'fade-slide': {
          '0%': {
            opacity: 0,
            transform: 'translateY(-20%) scaleY(0.95)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0) scaleY(1)',
          },
        },
      },
      animation: {
        'fade-slide': 'fade-slide 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
