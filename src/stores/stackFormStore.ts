import { writable } from 'svelte/store';
import { stacksMockData } from '@/data/index';

export const stackFormStore = writable(stacksMockData);

export const updateStackState = (id, updatedCard) => {
	stackFormStore.update((stacks) => {
		return stacks.map((stack) => (stack.id === id ? { ...stack, ...updatedCard } : stack));
	});
};

export const deleteStackState = (id) => {
	stackFormStore.update((stacks) => {
		return stacks.filter((stack) => stack.id !== id);
	});
};
