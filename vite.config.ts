import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { sveltekit } from '@sveltejs/kit/vite';
import dotenv from 'dotenv';

const NODE_ENV = process.env.NODE_ENV || 'development';
const envPath = NODE_ENV === 'test' ? '.test' : '';
try {
	dotenv.config({ path: `./.env${envPath}` });
} catch (err: any) {
	console.warn('[env]', 'make sure to use correct .env file ', err.toString());
}

const PORT = Number(process.env.PORT || 3000);

export default defineConfig({
	define: {
		'import.meta.env.VITE_ENVIRONMENT': JSON.stringify(process.env.NODE_ENV),
		'import.meta.env.VITE_PORT': JSON.stringify(process.env.PORT),
		'import.meta.env.VITE_API_URI': JSON.stringify(process.env.API_URI)
	},
	server: {
		port: PORT
	},

	css: {
		transformer: 'lightningcss'
	},

	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
	resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined,
	test: {
		expect: { requireAssertions: true },
		silent: true, // disable debug logs
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					environment: 'jsdom',
					name: 'client',
					globals: true,
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},

					include: ['src/tests/ui/**/*.{test,spec}.{ts,js}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',
				test: {
					environment: 'jsdom',
					name: 'server',
					globals: true,
					include: ['src/tests/unit/**/*.{test,spec}.{ts,js}']
				}
			}
		]
	}
});
