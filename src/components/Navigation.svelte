<script lang="ts">
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import { appNavigation } from '@/data/navigation';

	export let currentTab: any;
	export let handleTabClick: (slug: string) => void;
	$: {
		console.log('currentTab is', $currentTab);
	}
</script>

<Tabs bind:value={currentTab} class="navigation mt-4 w-full" on:change={handleTabClick}>
	<Tabs.List class="flex w-full justify-center gap-4">
		{#each appNavigation as { pageName, slug, title }}
			<Tabs.Trigger value={slug} class={`tab text-lg ${$currentTab === slug ? 'active-tab' : ''}`}>
				<a
					on:click|preventDefault={() => handleTabClick(slug)}
					href={slug}
					class="block py-1 text-center">{title}</a
				>
			</Tabs.Trigger>
		{/each}
	</Tabs.List>
</Tabs>
