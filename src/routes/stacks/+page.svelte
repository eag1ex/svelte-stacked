<!-- src/routes/stacks.svelte -->
<script lang="ts">
	import { stackFormStore, updateStackState, deleteStackState } from '@/stores/index'; // Import the store

	import Stack from '@/components/Stack.svelte';

	const handleUpdate = (id, updatedCard) => {
		updateStackState(id, updatedCard);
	};

	const handleDelete = (id) => {
		deleteStackState(id);
	};

	let stacks = [];
	$: stacks = $stackFormStore;
</script>

<section class="mx-auto p-6">
	<h1>Stacks - CRUD Operations</h1>

	<main class="container mx-auto mt-10 w-full rounded-lg bg-white p-6 shadow-lg">
		<div>
			{#each stacks as stack (stack.id)}
				<Stack {stack} onUpdate={handleUpdate} onDelete={handleDelete} />
			{/each}
		</div>
	</main>
</section>
