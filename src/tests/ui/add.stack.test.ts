/* eslint-disable */

import { createMockServer } from '../../lib/mockServer';
import { Server, type Registry } from 'miragejs';
import type {
	Assign,
	FactoryDefinition,
	FlattenFactoryMethods,
	ModelDefinition
} from 'miragejs/-types';

import { render, fireEvent } from '@testing-library/svelte';
import { tick } from 'svelte';
import { get } from 'svelte/store';
import { expect, test, describe, beforeAll, afterAll } from 'vitest';
import StackPage from '@/routes/stacks/+page.svelte';
import { stackFormStore } from '@/stores/index';
import { delay } from '@/lib/utils';

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

describe('<StackPage/> form test', () => {
	test('can add a new <StackView/> item and see it in DOM + store', async () => {
		stackFormStore.set([]);

		const { container } = render(StackPage, {
			props: { data: { stacks: [] } }
		});

		const addButton = container.querySelector('button.add-new-stack') as HTMLButtonElement;
		await fireEvent.click(addButton);

		const titleInput = container.querySelector('input[placeholder="Title"]') as HTMLInputElement;
		const authorInput = container.querySelector('input[placeholder="Author"]') as HTMLInputElement;
		const statusSelect = container.querySelector('select') as HTMLSelectElement;

		await fireEvent.input(titleInput, { target: { value: 'React' } });
		await fireEvent.input(authorInput, { target: { value: 'Facebook' } });
		statusSelect.value = 'Published';
		await fireEvent.change(statusSelect);

		const submitButton = container.querySelector('form.stack-edit-item') as HTMLButtonElement;
		await fireEvent.submit(submitButton);

		// Wait for reactive updates
		await tick();
		// adjust delay based on mockserver response also delay set in /apis controllers
		await delay(1100);

		const stacks = get(stackFormStore);

		expect(stacks.length).toBe(1);
		expect(stacks[0].title).toBe('React');
		expect(stacks[0].author).toBe('Facebook');
		expect(stacks[0].status).toBe('Published');

		const newStackRow = container.querySelector('[class*="stack-view-item-"]');
		expect(newStackRow).not.toBeNull();
		expect(newStackRow?.querySelector('.title-item')?.textContent).toBe('React');
		expect(newStackRow?.querySelector('.author-item')?.textContent).toBe('Facebook');
		expect(newStackRow?.querySelector('.status-item')?.textContent).toBe('Published');
	});
});
