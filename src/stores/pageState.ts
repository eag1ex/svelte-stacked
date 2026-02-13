import { writable } from 'svelte/store';
import { appNavigation } from '@/data/navigation';

interface PageState {
	title: string;
	pageName?: string;
	slug?: string;
}

export const pageState = writable<PageState>({ title: 'Welcome to My App' });

export function updateTitle(pathname: string) {
	let isSet = false;
	const route = appNavigation.find((n) => n.slug.includes(pathname));

	if (route) {
		pageState.set({ ...route });
		isSet = true;
	} else if (!isSet) {
		pageState.set({ title: 'Not found', pageName: 'Error', slug: '/error' });
	}
}
