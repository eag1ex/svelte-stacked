<script lang="ts">
	import type { StackApi } from '../types';
	import StackIcon from './icons/StackIcon.svelte';
	import Progress from './Progress.svelte';

	export let stack: StackApi;
	export let updating: boolean = false;
	export let onEdit: MyFunction;
	export let onDelete: MyFunction;
</script>

<div class={`stack-view-item flex items-center p-4 transition-colors stack-view-item-${stack.id}`}>
	<div class="flex w-16 justify-center">
		<StackIcon color={'var(--text-color)'} />
	</div>

	<div class="title-item w-1/3 truncate font-medium">
		{stack.title}
	</div>

	<div class="author-item w-40 text-sm">
		{stack.author}
	</div>

	<div class="date-item w-40 text-sm">
		{new Date(stack.createdAt).toLocaleDateString()}
	</div>

	<div class="status-item w-32 text-sm">
		{stack.status}
	</div>

	<div class="edit-item flex min-h-9 w-80 items-center justify-end gap-2">
		<button
			on:click={() => onEdit(stack.id)}
			class="text-secondary min-h-9 rounded bg-[var(--bg-color-reverse)] px-3 py-1 text-sm"
		>
			Edit
		</button>
		<button
			on:click={() => onDelete(stack.id)}
			class="text-secondary delete-item min-h-9 rounded bg-[var(--color-warning)] px-3 py-1 text-sm"
		>
			Delete
		</button>
		{#if updating === true}
			<Progress />
		{/if}
		{#if updating !== true}
			<div class="min-h-9 min-w-5">&nbsp;</div>
		{/if}
	</div>
</div>

<style>
	.stack-view-item {
		&:hover {
			transition: background-color 0.5s ease;
			background-color: var(--color-warning);
		}
	}
</style>
