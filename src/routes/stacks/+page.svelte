<script lang="ts">
	import {
		stackFormStore,
		updateStackState,
		deleteStackState,
		addStackState
	} from '@/stores/index'; // Import the store

	// import Stack from '@/components/Stack.svelte';
	import StackEdit from '@/components/StackEdit.svelte';
	import StackView from '@/components/StackView.svelte';
	let editingId: number | null = null;
	let addingNew = false;

	const handleUpdate = (id, updatedCard) => {
		updateStackState(id, updatedCard);
		editingId = null;
		addingNew = false;
	};

	const handleNew = (id, updatedCard) => {
		addStackState(updatedCard);
		editingId = null;
		addingNew = false;
	};

	const handleEdit = (id: number) => {
		editingId = id;
		addingNew = false;
	};

	const onDelete = (id) => {
		deleteStackState(id);
		editingId = null;
		addingNew = false;
	};

	const handleCancel = () => {
		editingId = null;
	};

	const startAddingNew = () => {
		editingId = null;
		addingNew = true;
	};

	let stacks = [];
	$: stacks = $stackFormStore;
</script>

<section class="mx-auto w-full">
	<h1 class="mb-6 text-2xl font-bold">Stacks - CRUD Operations</h1>

	<button
		on:click={startAddingNew}
		class="mb-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
	>
		Add New Stack
	</button>
	<!-- Table Header -->
	<div class="flex items-center border-b bg-gray-100 p-4 text-sm font-semibold text-gray-600">
		<div class="w-16"></div>
		<div class="w-1/3">Title</div>
		<div class="w-40">Author</div>
		<div class="w-40">Created</div>
		<div class="w-32">Status</div>
		<div class="w-60 text-right">Actions</div>
	</div>

	<!-- Rows -->
	<div class="flex flex-col divide-y">
		{#if addingNew}
			<StackEdit mode="new" onUpdate={handleNew} onCancel={handleCancel} />
		{/if}

		{#each stacks as stack (stack.id)}
			{#if stack.id === editingId}
				<StackEdit {stack} onUpdate={handleUpdate} onCancel={handleCancel} {onDelete} />
			{:else}
				<StackView {stack} onEdit={handleEdit} />
			{/if}
		{/each}
	</div>
</section>
