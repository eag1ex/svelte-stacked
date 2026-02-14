import { writable } from 'svelte/store';

import type { LoadState, StackApi } from '@/types/index';
import { addStackPost, deleteStack, getStacks, patchStack } from '@/lib/api';

export const stackFormStore = writable<StackApi[]>([]);
export const stackState = writable<LoadState>('initial');
export const dataLoaded = writable<boolean | null>(null);

export const updateStackState = (id, updateStack, done) => {
	stackState.set('loading');
	patchStack(id, updateStack).then((n) => {
		if (n.error) stackState.set('error');
		else {
			stackFormStore.update((stacks) => {
				return stacks.map((stack) => (stack.id === n.stack.id ? { ...stack, ...n.stack } : stack));
			});
			stackState.set('complete');
		}
		if (typeof done === 'function') done();
	});
};

export const addStackState = (newStack, done) => {
	stackState.set('loading');
	addStackPost(newStack).then((n) => {
		if (n.error) {
			stackState.set('error');
		} else {
			stackFormStore.update((stacks) => {
				return [n.stack, ...stacks];
			});
			stackState.set('complete');
		}
		if (typeof done === 'function') done();
	});
};

export const deleteStackState = (id, done) => {
	stackState.set('loading');
	deleteStack(id).then((n) => {
		console.log('deleteStackState', n);
		if (n.error) {
			stackState.set('error');
		} else {
			stackFormStore.update((stacks) => {
				return stacks.filter((stack) => stack.id !== n.deletedId && !!n.deletedId);
			});
			stackState.set('complete');
		}
		if (typeof done === 'function') done();
	});
};
