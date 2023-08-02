const { default: plugin } = require('tailwindcss');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.html"],
	theme: {
		screens: {
			'sm': '320px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1435px',
		},
		container: {
			center: true,
			padding: {
				sm: '0.5rem',
				md: '1rem',
			},
		},
		fontFamily: {
			sans: ['Rubik', 'sans-serif'],
		},
		colors: {
			white: '#fff',
			dark: '#262A2F',
			orange: '#FF5533',
			grey: '#868686',

		},
		extend: {
			fontSize: {
				'primary': '22px',
			},
			fontWeight: {
				'normal': '400',
				'medium': '700',
				'bold': '900',
			},
			gridTemplateRows: {
				'layout': 'auto 1fr auto',
			},
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
