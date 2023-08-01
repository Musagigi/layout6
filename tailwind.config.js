const { default: plugin } = require('tailwindcss');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.html"],
	theme: {
		screens: {
			sm: '320px',
			md: '768px',
			lg: '875px',
			xl: '1152px',
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
		},
		fontFamily: {
			sans: ['Roboto', 'sans-serif'],
		},
		extend: {
			backgroundImage: {
				'about-section': 'url("/img/main/back.png")',
				'promo-section': 'url("/img/main/promo.jpg")'
			},
			keyframes: {
				emergenceLeft: {
					'0%': {
						opacity: 0,
						transform: 'translate3d(-100%,0,0)'
					},
					'100%': {
						opacity: 1,
						transform: 'translate3d(0,0,0)'
					}
				},
				emergenceRight: {
					'0%': {
						opacity: 0,
						transform: 'translate3d(100%,0,0)'
					},
					'100%': {
						opacity: 1,
						transform: 'translate3d(0,0,0)'
					}
				},
				rotationSun: {
					'100%': {
						transform: 'rotate(360deg)',
					}
				},
			},
			animation: {
				emergenceLeft: 'emergenceLeft 1.5s ease-in-out 0s;',
				emergenceRight: 'emergenceRight 1.5s ease-in-out 0s',
				rotationSun: 'rotationSun 10s linear infinite'
			}
		},
		colors: {
			dark: '#213053',
			white: '#fff',
			darkWhite: '#E7EAF9',
			darkBlue: '#1d263a',
			btnColor: '#23a030',
			bthColorHover: '#f6980c',
			shadowColor: 'rgb(52,213,68,0.4)',
			shadowColorHover: 'rgb(246,152,12,0.3)',
			borderColor: '#D9E4E6',
			bgFeatures: '#eaeff9',
			bgFeaturesCardL: '#dc5e26',
			bgFeaturesCardLShadow: 'rgb(221,95,38,0.3)',
			bgFeaturesCardR: '#1D263A',
			bgFeaturesCardRShadow: 'rgb(29,38,58,0.3)',
			bgPromo: '#dd5f26',
		},
	},
	plugins: [
		function ({ matchUtilities }) {
			matchUtilities({
				'grid-cols-ideal': value => {
					return {
						gridTemplateColumns: `repeat(auto-fill, minmax(${value}, 1fr))`
					}
				}
			})
		}
	],
}
