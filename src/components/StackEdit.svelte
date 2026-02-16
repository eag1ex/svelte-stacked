<script lang="ts">
	import { Status } from '@/lib/enums';
	import Progress from './Progress.svelte';
	import { generateUniqueId, getCurrentISODate } from '@/lib/utils';
	import StackIcon from './icons/StackIcon.svelte';
	import type { StackApi } from '@/types/api.stacks';

	export let stack: StackApi = {
		id: '',
		title: '',
		status: Status.Draft,
		author: '',
		createdAt: ''
	};

	export let mode: 'new' | 'edit' = 'edit';
	export let updating: boolean = false;

	export let onUpdate: MyFunction;
	export let onCancel: MyFunction;
	export let onDelete: MyFunction;

	let title = stack.title;
	let status = stack.status || Status.Draft;
	let author = stack.author;

	let isTitleValid = true;
	let isAuthorValid = true;
	let isStatusValid = true;

	function handleSubmit() {
		// Reset validation
		isTitleValid = true;
		isAuthorValid = true;
		isStatusValid = true;

		if (!title.trim() || title.trim().length > 100) {
			isTitleValid = false;
		}

		if (!author.trim() || author.trim().length > 100) {
			isAuthorValid = false;
		}

		if (status !== Status.Draft && status !== Status.Published) {
			isStatusValid = false;
		}

		if (!isTitleValid || !isAuthorValid || !isStatusValid) {
			return;
		}

		let id = stack.id;
		let createdAt = stack.createdAt;

		if (mode === 'new') {
			// these values are ignored when returned from server will set its own values
			id = generateUniqueId();
			createdAt = getCurrentISODate();
		}

		onUpdate(id, {
			title: title.trim(),
			author: author.trim(),
			status,
			createdAt
		});
	}
</script>

<form
	class={`stack-edit-item off flex min-h-25 items-center bg-blue-50 p-4 stack-edit-item-${stack.id}`}
	on:submit|preventDefault={handleSubmit}
>
	<div class="flex w-16 justify-center">
		<StackIcon color={'var(--text-primary-dark)'} />
	</div>

	<div class="relative w-1/3">
		<input
			bind:value={title}
			placeholder="Title"
			class="text-dark w-[90%] rounded border px-2 py-2 text-sm"
		/>
		{#if !isTitleValid}
			<p class="absolute mt-1 text-xs text-[var(--color-warning)]">Required and ≤ 100 characters</p>
		{/if}
	</div>

	<div class="relative w-40">
		<input
			bind:value={author}
			placeholder="Author"
			class="text-dark w-[90%] rounded border px-2 py-2 text-sm"
		/>
		{#if !isAuthorValid}
			<p class="absolute mt-1 text-xs text-[var(--color-warning)]">Required and ≤ 100 characters</p>
		{/if}
	</div>

	<!-- Created -->
	<div class="text-dark w-40 text-sm">
		{mode === 'new' ? '—' : new Date(stack.createdAt).toLocaleDateString()}
	</div>

	<!-- Status Select -->
	<div class="w-32">
		<select bind:value={status} id="status" class="text-dark w-full rounded border p-2 text-sm">
			<option value={Status.Published}>Published</option>
			<option value={Status.Draft}>Draft</option>
		</select>
		{#if !isStatusValid}
			<p class="absolute mt-1 text-xs text-[var(--color-warning)]">Must be Draft or Published</p>
		{/if}
	</div>

	<!-- Actions -->
	<div class="form-actions flex min-h-9 w-80 items-center justify-end gap-2">
		<button type="submit" class="min-h-9 rounded bg-[var(--bg-color)] px-3 py-1 text-sm text-white">
			{mode === 'new' ? 'Add' : 'Update'}
		</button>

		<button
			on:click={onCancel}
			class="min-h-9 rounded bg-[var(--bg-color)] px-3 py-1 text-sm text-white"
		>
			{mode === 'new' ? 'Cancel' : 'View'}
		</button>
		<button
			disabled={mode === 'new'}
			on:click={() => onDelete(stack.id)}
			class="text-secondary min-h-9 rounded bg-[var(--color-warning)] px-3 py-1 text-sm"
		>
			Delete
		</button>

		{#if updating === true}
			<Progress />
		{/if}
		{#if updating !== true}
			<div class="min-h-8 min-w-5">&nbsp;</div>
		{/if}
	</div>
</form>

<style>
	.form-actions {
		position: relative;
		left: 2px;
	}
</style>
