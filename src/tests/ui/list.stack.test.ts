/* eslint-disable */

import { render } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import StackView from '@/components/StackView.svelte';
import { stacksMockData } from '@/data/index';

test('<StackView/> renders correctly and shows progress icon when updating', async () => {
	const stackData = stacksMockData[0];

	const { container, unmount } = render(StackView, {
		props: { stack: stackData, updating: false } as any
	});

	const wrapper = container.querySelector(`.stack-view-item-${stackData.id}`);
	expect(wrapper).not.toBeNull();

	// Check basic elements
	expect(wrapper?.querySelector('.title-item')?.textContent).toBe(stackData.title);
	expect(wrapper?.querySelector('.author-item')?.textContent).toBe(stackData.author);
	expect(wrapper?.querySelector('.date-item')?.textContent).toBe(
		new Date(stackData.createdAt).toLocaleDateString()
	);
	expect(wrapper?.querySelector('.status-item')?.textContent).toBe(stackData.status);

	expect(wrapper?.querySelector('.progress-icon')).toBeNull();

	unmount();
	const { container: updatedContainer } = render(StackView, {
		props: { stack: stackData, updating: true } as any
	});

	const updatedWrapper = updatedContainer.querySelector(`.stack-view-item-${stackData.id}`);
	expect(updatedWrapper?.querySelector('.progress-icon')).not.toBeNull();
});
