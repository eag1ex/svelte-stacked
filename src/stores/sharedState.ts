// src/stores/sharedState.ts
import type { SharedState } from '@/types/index';
import { writable } from 'svelte/store';

export const sharedState = writable<SharedState>({
	id: null,
	data: null
});

export function setSharedState(newState: Partial<SharedState>) {
	sharedState.update((state) => ({ ...state, ...newState }));
}
