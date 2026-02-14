<script lang="ts">
	import { Status } from '@/lib/enums';
	import Progress from './Progress.svelte';
	import { generateUniqueId, getCurrentISODate } from '@/lib/utils';

	export let stack = {
		id: null,
		title: '',
		status: Status.Draft,
		author: '',
		createdAt: ''
	};

	export let mode: 'new' | 'edit' = 'edit';
	export let updating: boolean = false;

	export let onUpdate: Function;
	export let onCancel: Function;
	export let onDelete: Function;

	let title = stack.title;
	let status = stack.status || Status.Draft;
	let author = stack.author;

	$: isTitleValid = title.trim().length > 0;
	$: isAuthorValid = author.trim().length > 0;
	$: isFormValid = isTitleValid && isAuthorValid;

	function handleSave() {
		if (!isFormValid) return;

		let id = stack.id;
		let createdAt = stack.createdAt;

		if (mode === 'new') {
			// keep these here but  they are updated server side any ways
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

<div class="flex items-center bg-blue-50 p-4">
	<div class="flex w-16 justify-center">
		<div class="flex h-10 w-10 items-center justify-center rounded bg-gray-200">🔲</div>
	</div>

	<div class="w-1/3">
		<input
			bind:value={title}
			placeholder="Title"
			class="w-[90%] rounded border px-2 py-2 text-sm"
		/>
		{#if !isTitleValid}
			<p class="mt-1 text-xs text-red-600">Title is required</p>
		{/if}
	</div>

	<div class="w-40">
		<input
			bind:value={author}
			placeholder="Author"
			class="w-[90%] rounded border px-2 py-2 text-sm"
		/>
		{#if !isAuthorValid}
			<p class="mt-1 text-xs text-red-600">Author is required</p>
		{/if}
	</div>

	<!-- Created -->
	<div class="w-40 text-sm text-gray-600">
		{mode === 'new' ? '—' : new Date(stack.createdAt).toLocaleDateString()}
	</div>

	<!-- Status Select -->
	<div class="w-32">
		<select bind:value={status} id="status" class="w-full rounded border p-2 text-sm">
			<option value={Status.Published}>Published</option>
			<option value={Status.Draft}>Draft</option>
		</select>
	</div>

	<!-- Actions -->
	<div class="flex min-h-9 w-80 items-center justify-end gap-2">
		<button
			disabled={!isFormValid}
			on:click={handleSave}
			class="min-h-8 rounded bg-green-500 px-3 py-1 text-sm text-white disabled:opacity-50"
		>
			{mode === 'new' ? 'Add' : 'Update'}
		</button>

		<button
			on:click={() => onDelete(stack.id)}
			class="min-h-8 rounded bg-red-500 px-3 py-1 text-sm text-white"
		>
			Delete
		</button>

		<button on:click={onCancel} class="min-h-8 rounded bg-gray-500 px-3 py-1 text-sm text-white">
			{mode === 'new' ? 'Cancel' : 'View'}
		</button>

		{#if updating === true}
			<Progress />
		{/if}
		{#if updating !== true}
			<div class="min-h-8 min-w-5">&nbsp;</div>
		{/if}
	</div>
</div>
