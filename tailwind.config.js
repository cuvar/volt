module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-reverse': 'spin-reverse 10s linear infinite;',
      },
      keyframes: {
        "spin-reverse": {
          'from': { transform: 'rotate(3600deg)' },
          'to': { transform: 'rotate(0deg)' },
        }
      }

    },
  },
  plugins: [],
}