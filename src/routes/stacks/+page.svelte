<script lang="ts">
	import {
		stackFormStore,
		updateStackState,
		deleteStackState,
		addStackState,
		stackState,
		dataLoaded
	} from '@/stores/index';

	import StackEdit from '@/components/StackEdit.svelte';
	import StackView from '@/components/StackView.svelte';
	import SearchFilter from '@/components/SearchFilter.svelte';
	import type { LoadState, StackApi, StackApiStatus } from '@/types/index';

	import StatusFilter from '@/components/StatusFilter.svelte';

	export let data;

	let stacks: StackApi[] = [];
	let editingId: number | null = null;
	let addingNew = false;
	let selectedStatus: StackApiStatus | null;
	let filteredStacks: StackApi[] = [];
	let searchTerm: string = '';
	// let itemState: { id: number | string | null; state: LoadState; _new?: boolean } | null;
	let itemStateLoading: string | null;

	const handleSearch = (term: string) => {
		searchTerm = term;
	};

	const handleUpdate = (id, updatedStack) => {
		updateStackState(id, updatedStack, () => {
			editingId = null;
			addingNew = false;
		});
	};

	const handleNew = (id, updatedStack) => {
		addStackState(updatedStack, () => {
			editingId = null;
			addingNew = false;
		});
	};

	const handleEdit = (id: number) => {
		editingId = id;
		addingNew = false;
	};

	const onDelete = (id) => {
		deleteStackState(id, () => {
			editingId = null;
			addingNew = false;
		});
	};

	const handleCancel = () => {
		editingId = null;
	};

	const startAddingNew = () => {
		editingId = null;
		addingNew = true;
	};

	$: itemStateLoading =
		$stackState?.state === 'loading' ? ($stackState._new ? 'new' : $stackState.id) : null;
	$: if (data?.stacks && !$stackFormStore.length && !$dataLoaded) {
		stackFormStore.set(data?.stacks);
		dataLoaded.set(true);
	}

	$: {
		filteredStacks = $stackFormStore.filter((stack) => {
			return (
				stack.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				stack.author.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});
	}

	$: stacks = selectedStatus
		? filteredStacks.filter((stack) => stack.status === selectedStatus)
		: filteredStacks;

	// let itemStateLoading = (id: any) => {
	// 	return itemState?.state === 'loading' && (itemState.id === id || itemState?._new);
	// };

	function toggle(stat: string): void {
		selectedStatus = stat;
	}
</script>

<section class="mx-auto w-full">
	<h1 class="mb-6 text-2xl font-bold">Stack List</h1>

	<div class="mb-8 flex items-center justify-center space-x-6">
		<button
			on:click={startAddingNew}
			class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
		>
			Add
		</button>
		<SearchFilter onSearch={handleSearch} />
		<StatusFilter {selectedStatus} {toggle} />
	</div>

	<!-- Table Header -->
	<div class="flex items-center border-b bg-gray-100 p-4 text-sm font-semibold text-gray-600">
		<div class="w-16"></div>
		<div class="w-1/3">Title</div>
		<div class="w-40">Author</div>
		<div class="w-40">Created</div>
		<div class="w-32">Status</div>
		<div class="w-80 text-right">Actions</div>
	</div>

	<!-- Rows -->
	<div class="flex flex-col divide-y">
		{#if addingNew}
			<StackEdit
				mode="new"
				onUpdate={handleNew}
				onCancel={handleCancel}
				{onDelete}
				updating={itemStateLoading === 'new'}
			/>
		{/if}

		{#each stacks as stack (stack.id)}
			{#if stack.id === editingId}
				<StackEdit
					{stack}
					onUpdate={handleUpdate}
					onCancel={handleCancel}
					updating={itemStateLoading === stack.id}
				/>
			{:else}
				<StackView
					{stack}
					onEdit={handleEdit}
					{onDelete}
					updating={itemStateLoading === stack.id}
				/>
			{/if}
		{/each}
	</div>
</section>
