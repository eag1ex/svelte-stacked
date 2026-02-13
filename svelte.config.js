import { mdsvex } from 'mdsvex';
import sveltePreprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			'@data': path.resolve('src/data'),
			'@types': path.resolve('src/types'),
			'@components': path.resolve('src/components'),
			'@stores': path.resolve('src/stores'),
			'@assets': path.resolve('src/assets'),
			'@lib': path.resolve('src/lib')
		}
	},
	preprocess: [
		sveltePreprocess({
			scss: {
				includePaths: ['src/styles'],
				prependData: `@import './src/styles/vars.scss';`
			}
		}),
		mdsvex()
	],
	extensions: ['.svelte', '.svx']
};

export default config;
