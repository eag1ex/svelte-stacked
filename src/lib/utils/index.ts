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
