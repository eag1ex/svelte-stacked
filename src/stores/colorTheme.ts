import { writable } from 'svelte/store';

export const theme = writable<'light' | 'dark'>('light');

export const setTheme = (themeColor = 'light', onTheme) => {
	theme.set(themeColor);
	if (typeof onTheme === 'function') {
		onTheme(themeColor);
	}
};
export function toggleTheme() {
	theme.update((currentTheme) => {
		const newTheme = currentTheme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', newTheme);

		localStorage.setItem('theme', newTheme);
		return newTheme;
	});
}
