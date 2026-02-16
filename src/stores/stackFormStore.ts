import { writable } from 'svelte/store';

import type { LoadState, StackApi } from '@/types/index';
import { addStackPost, deleteStack, patchStack } from '@/lib/api';

export const stackFormStore = writable<StackApi[]>([]);
// manage loading status
export const stackState = writable<{
	id: string | number | null;
	state: LoadState;
	_new?: boolean;
} | null>(null);

export const dataLoaded = writable<boolean | null>(null);

export const updateStackState = (id: any, updateStack: StackApi, done: any) => {
	stackState.set({ id, state: 'loading' });
	patchStack(id, updateStack).then((n) => {
		if (n.error) stackState.set({ id, state: 'error' });
		else {
			stackFormStore.update((stacks) => {
				return stacks.map((stack) => (stack.id === n.stack.id ? { ...stack, ...n.stack } : stack));
			});
			stackState.set({ id, state: 'complete' });
		}
		if (typeof done === 'function') done();
	});
};

export const addStackState = (newStack: StackApi, done: any) => {
	stackState.set({ id: null, state: 'loading', _new: true });
	addStackPost(newStack).then((n) => {
		if (n.error) {
			stackState.set({ id: null, state: 'error', _new: true });
		} else {
			stackFormStore.update((stacks) => {
				return [n.stack, ...stacks];
			});
			stackState.set({ id: n.stack.id, state: 'complete', _new: true });
		}
		if (typeof done === 'function') done();
	});
};

export const deleteStackState = (id: any, done: any) => {
	stackState.set({ id, state: 'loading' });
	deleteStack(id).then((n) => {
		if (n.error) {
			stackState.set({ id, state: 'error' });
		} else {
			stackFormStore.update((stacks) => {
				return stacks.filter((stack) => stack.id !== n.deletedId && !!n.deletedId);
			});

			stackState.set({ id, state: 'complete' });
		}
		if (typeof done === 'function') done();
	});
};
