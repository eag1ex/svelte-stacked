<script lang="ts">
	import { appNavigation } from '@/data/navigation';
	import { resolve } from '$app/paths';
	export let currentTab: any;
</script>

<div class="navigation my-4 w-full">
	<div class="flex w-full justify-center gap-4">
		{#each appNavigation as { slug, title }}
			<a
				href={resolve(slug as any)}
				class={`tab rounded p-2 text-lg ${$currentTab === slug ? 'active-tab border' : ''}`}
			>
				{title}
			</a>
		{/each}
	</div>
	<div class=" mt-4 border-t-1 border-solid border-[var(--bg-color-reverse)]"></div>
</div>
