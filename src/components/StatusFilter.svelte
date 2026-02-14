<script lang="ts">
	import type { StackApiStatus } from '@/types/api.stacks';
	import { Status } from '../lib';

	export let selectedStatus: StackApiStatus | null;
	export let toggle: (status: StackApiStatus) => void;

	const statuses = [Status.Draft, Status.Published];
</script>

<div class="flex gap-2">
	{#each statuses as status}
		<button
			class={`chip capitalize ${selectedStatus === status ? 'preset-filled' : 'preset-tonal'}`}
			on:click={() => toggle(selectedStatus === status ? null : status)}
		>
			<span>{status}</span>
		</button>
	{/each}
</div>
