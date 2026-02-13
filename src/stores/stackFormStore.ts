import { writable } from 'svelte/store';
import { stacksMockData } from '@/data/index';

export const stackFormStore = writable(stacksMockData);

export const updateStackState = (id, updateStack) => {
	stackFormStore.update((stacks) => {
		return stacks.map((stack) => (stack.id === id ? { ...stack, ...updateStack } : stack));
	});
};

export const addStackState = (newStack) => {
	stackFormStore.update((stacks) => {
		return [...stacks, newStack];
	});
};

export const deleteStackState = (id) => {
	stackFormStore.update((stacks) => {
		return stacks.filter((stack) => stack.id !== id);
	});
};
