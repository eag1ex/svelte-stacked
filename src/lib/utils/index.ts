export const prefixApi = (route: string) => {
	const apiPrefix = import.meta.env.VITE_API_URI || process.env.API_URI;
	return apiPrefix + route;
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
