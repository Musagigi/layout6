import { defineConfig } from "vite";
const { resolve } = require('path')


export default defineConfig({
	root: './src',
	base: '',
	build: {
		outDir: './../dist', //  путь относительно root
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: resolve('./src/index.html'),
				fashion: resolve('./src/pages/fashion.html'),
				politics: resolve('./src/pages/politics.html'),
				sport: resolve('src/pages/sport.html'),
				tech: resolve('./src/pages/tech.html'),
			}
		}
	},
	publicDir: './../public',
})


