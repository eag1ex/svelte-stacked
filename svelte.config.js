import { mdsvex } from 'mdsvex';
import sveltePreprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import path from 'path';
import dotenv from 'dotenv';

const NODE_ENV = process.env.NODE_ENV || 'development';
const envPath = NODE_ENV === 'test' ? '.test' : '';
try {
	dotenv.config({ path: `./.env${envPath}` });
} catch (err) {
	console.warn('[env]', 'make sure to use correct .env file ', err.toString());
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		//appDir: '_app',
		adapter: adapter({
			// adapter-static
			pages: 'docs', // for github
			assets: 'docs' // for github
			//	fallback: '200.html' // no difference
		}),
		paths: {
			// for prod  process.env.BASE_PATH ===svelte-stacked
			base: process.env.NODE_ENV === 'production' ? '/' + process.env.BASE_PATH : ''
			//	assets: ''
		},

		alias: {
			'@/routes': path.resolve('src/routes'),
			'@/data': path.resolve('src/data'),
			'@/types': path.resolve('src/types'),
			'@/components': path.resolve('src/components'),
			'@/stores': path.resolve('src/stores'),
			'@/assets': path.resolve('src/lib/assets'),
			'@/lib': path.resolve('src/lib')
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
