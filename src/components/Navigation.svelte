<script lang="ts">
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import { appNavigation } from '@/data/navigation';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	export let currentTab: any;

	const handleTabClick = (slug: any) => {
		if (appNavigation.map((n) => n.slug).includes(slug)) {
			goto(resolve(slug));
		} else {
			goto(resolve('/404' as any));
		}
	};
</script>

<Tabs class="navigation mt-4 w-full" on:change={handleTabClick}>
	<Tabs.List class="flex w-full justify-center gap-4">
		{#each appNavigation as { slug, title }}
			<Tabs.Trigger value={slug} class={`tab text-lg ${$currentTab === slug ? 'active-tab' : ''}`}>
				<span on:click|preventDefault={() => handleTabClick(slug)} class="block py-1 text-center"
					>{title}</span
				>
			</Tabs.Trigger>
		{/each}
	</Tabs.List>
</Tabs>
