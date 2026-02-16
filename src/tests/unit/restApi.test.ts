import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createMockServer } from '../../lib/mockServer';
import { getStacks } from '../../lib/api/index';
import { Server, type Registry } from 'miragejs';
import type {
	Assign,
	FactoryDefinition,
	FlattenFactoryMethods,
	ModelDefinition
} from 'miragejs/-types';

import type { StackApi } from '@/types/api.stacks';

type ServerType = Server<
	Registry<
		{
			stack: ModelDefinition<Assign<{}, Partial<StackApi>>>;
		},
		{
			stack: FactoryDefinition<Assign<{}, FlattenFactoryMethods<StackApi>>>;
		}
	>
>;

let server: ServerType;

beforeAll(() => {
	server = createMockServer();
});

afterAll(() => {
	server.shutdown();
});

describe('[api][get] getStacks()', () => {
	it('should fetch the list of stacks from the mock server', async () => {
		const result = await getStacks();
		const expectedStacks = server.db.stacks.length;

		// Assert that the result is correct
		expect(result.ok).toBe(true);
		expect(result.stacks.length).toBe(expectedStacks);

		const _stacks = result.stacks.map((n) => {
			if ((n as any).createdAt) delete (n as any).createdAt;
			return n;
		});
		expect(_stacks[0]).toEqual({
			id: '1',
			title: 'React',
			status: 'Published',
			author: 'Facebook'
		});

		expect(_stacks[1]).toEqual({
			id: '2',
			title: 'Vue.js',
			status: 'Draft',
			author: 'Evan You'
		});
	});

	it('should handle errors when the API call fails', async () => {
		server.shutdown();
		const result = await getStacks();
		expect(result.ok).toBe(false);
		expect(result.error).toBe('RESPONSE_ERROR');
	});
});
