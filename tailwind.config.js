module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'header': ['"Luckiest Guy"']
    },
    screens: {
      'xs': {'max': '360px'},
      'sm': {'min': '361px', 'max': '649px'},
      'tablet': { 'min': '650px', 'max': '800px' },
      'md': '801px'
    },
    extend: {
      colors: {
        'blue-gray': 'rgb(147, 173, 176)'
      }
    },
  },
  plugins: [],
}
