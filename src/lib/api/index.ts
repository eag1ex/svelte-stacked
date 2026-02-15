import type { StackApi } from '@/types/api.stacks';
import { ErrorType } from '../enums';
import { delay, prefixApi } from '../utils';

export async function getStacks(): Promise<{ stacks: StackApi[]; ok: boolean; error?: string }> {
	try {
		const uri = prefixApi('/stacks');
		console.log('calling uri:', uri);
		const response = await fetch(uri);

		if (!response.ok) {
			const { error } = await response.json();
			throw new Error(error || 'Error');
		}

		const data = await response.json();

		const stackList = (data.stacks as StackApi[]).map((n) => {
			const id = n.id.toString();
			return {
				...n,
				id
			};
		});

		return { stacks: stackList, ok: true };
	} catch (err) {
		console.error(err);
		return { error: ErrorType.RESPONSE_ERROR, ok: false } as any;
	}
}

type Add = Omit<StackApi, 'id' | 'createdAt'>;
export async function addStackPost(
	newStack: Add
): Promise<{ stack: StackApi; ok: boolean; error?: string }> {
	try {
		await delay(500);
		const response = await fetch(prefixApi('/api/stack'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newStack)
		});

		if (!response.ok) {
			const { error } = await response.json();
			throw new Error(error || 'Error');
		}

		const data = await response.json();

		data.stack.id = data.stack.id.toString();
		return { stack: data.stack, ok: true };
	} catch (err) {
		console.error(err);
		return { error: ErrorType.RESPONSE_ERROR, ok: false } as any;
	}
}

export async function patchStack(
	id: string,
	updateStack: StackApi
): Promise<{ stack: StackApi; ok: boolean; error?: string }> {
	try {
		await delay(500);
		const response = await fetch(prefixApi(`/api/stack/${id}`), {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updateStack)
		});

		if (!response.ok) {
			const { error } = await response.json();
			throw new Error(error || 'Error');
		}

		const data = await response.json();
		data.stack.id = data.stack.id.toString();
		return { stack: data.stack, ok: true };
	} catch (err) {
		console.error(err);
		return { error: ErrorType.RESPONSE_ERROR, ok: false } as any;
	}
}

export async function deleteStack(
	id: string
): Promise<{ deletedId: string; ok: boolean; error?: string }> {
	try {
		await delay(500);
		const response = await fetch(prefixApi(`/api/stack/${id}`), {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			const { error } = await response.json();
			throw new Error(error || 'Error');
		}

		const data = await response.json();
		console.log('deleteStack', data);
		return { deletedId: data.deletedId, ok: true };
	} catch (err) {
		console.error(err);
		return { error: ErrorType.RESPONSE_ERROR, ok: false } as any;
	}
}
