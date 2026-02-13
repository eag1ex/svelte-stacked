<script lang="ts">
	import { Status } from '@/lib/enums';

	export let stack: {
		id: number;
		title: string;
		status: string;
		author: string;
		createdAt: string;
	};
	export let onUpdate: Function;
	export let onDelete: Function;

	let isEditing = false;

	let title = stack.title === undefined ? 'default' : stack.title;
	let status = stack.status === undefined ? 'draft' : stack.status;
	let author = stack.author === undefined ? 'default' : stack.author;
	let createdAt = stack.createdAt === undefined ? 'Unknown' : stack.createdAt;
	let id = stack.id === undefined ? 0 : stack.id;

	// Logic to save the updated stack
	const handleSave = () => {
		onUpdate(stack.id, { title, status, author });
		isEditing = false;
	};

	const handleCancel = () => {
		title = stack.title;
		status = stack.status;
		author = stack.author;
		isEditing = false;
	};

	const imgSrc =
		'https://images.unsplash.com/photo-1463171515643-952cee54d42a?q=80&w=450&h=190&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
</script>

<section
	class={`block max-w-md divide-y divide-surface-200-800 overflow-hidden card border-[1px] border-surface-200-800 preset-filled-surface-100-900 card-hover item-id-${id} stack-item`}
>
	<header>
		<img src={imgSrc} class="aspect-[21/9] w-full grayscale hue-rotate-90" alt="banner" />
	</header>

	<article class="space-y-4 p-4">
		<div class="mb-2 flex items-center justify-between">
			<h3 class="text-xl font-bold">
				{#if isEditing}
					<!-- Editable Title -->
					<input bind:value={title} class="w-full rounded border p-2" maxLength="100" />
				{:else}
					<!-- Viewable Title -->
					<span class="px-1">
						{title}
					</span>
				{/if}
			</h3>
		</div>

		{#if isEditing}
			<!-- Editable Content -->
			<div>
				<label for="status" class="block text-sm">Status</label>
				<select bind:value={status} id="status" class="w-full rounded border p-2">
					<option value={Status.Published}>Published</option>
					<option value={Status.Draft}>Draft</option>
				</select>

				<label for="author" class="mt-2 block text-sm">Author</label>
				<input bind:value={author} id="author" class="w-full rounded border p-2" maxLength="100" />
			</div>

			<!-- Save / Cancel buttons (centered, full-width) -->
			<div class="mt-4 flex gap-4">
				<button
					on:click={handleSave}
					class="flex-1 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
				>
					Save
				</button>
				<button
					on:click={handleCancel}
					class="flex-1 rounded bg-gray-500 p-2 text-white hover:bg-gray-600"
				>
					Cancel
				</button>
			</div>
		{:else}
			<!-- Viewable Content -->
			<footer class="space-y-2 p-1">
				<p class="opacity-60">Status: {status}</p>
				<p class="opacity-60">Author: {author}</p>
				<p class="opacity-60">Created on: {new Date(createdAt).toLocaleDateString()}</p>
			</footer>

			<!-- View buttons: Edit and Delete -->
			<div class="mt-4 flex gap-4">
				<button
					on:click={() => (isEditing = true)}
					class="flex-1 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
				>
					Edit
				</button>
				<button
					on:click={() => onDelete(stack.id)}
					class="flex-1 rounded bg-red-500 p-2 text-white hover:bg-red-600"
				>
					Delete
				</button>
			</div>
		{/if}
	</article>
</section>
