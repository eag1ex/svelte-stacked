<script lang="ts">
	export let stack: {
		id: number;
		title: string;
		status: string;
		author: string;
		createdAt: string;
	};
	export let onEdit: Function;
</script>

<div class="flex items-center p-4 transition-colors hover:bg-gray-50">
	<div class="flex w-16 justify-center">
		<div class="flex h-10 w-10 items-center justify-center rounded bg-gray-200">🔲</div>
	</div>

	<div class="w-1/3 truncate font-medium">
		{stack.title}
	</div>

	<div class="w-40 text-sm text-gray-600">
		{stack.author}
	</div>

	<div class="w-40 text-sm text-gray-600">
		{new Date(stack.createdAt).toLocaleDateString()}
	</div>

	<div class="w-32 text-sm text-gray-600">
		{stack.status}
	</div>

	<div class="flex w-60 justify-end">
		<button
			on:click={() => onEdit(stack.id)}
			class="rounded bg-blue-500 px-3 py-1 text-sm text-white"
		>
			Edit
		</button>
	</div>
</div>
