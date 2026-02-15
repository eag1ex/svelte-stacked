export const prefixApi = (route: string) => {
	// const env = import.meta.env.VITE_ENVIRONMENT || process.env;
	// if running in browser or server side tests
	const apiPrefix = import.meta.env.VITE_API_URI || process.env.API_URI;
	// const port = import.meta.env.VITE_PORT;
	const _r = route.replace('/', '');
	return apiPrefix + '/' + _r;
	// if (env === 'development') return api;
	// if (env === 'test') return `http://localhost:${port}`;
	// else return api;
};
export function generateUniqueId() {
	return Date.now() + Math.floor(Math.random() * 1000);
}

export function getCurrentISODate() {
	return new Date().toISOString();
}

export function delay(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
