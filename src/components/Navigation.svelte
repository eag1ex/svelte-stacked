<script lang="ts">
	import { appNavigation } from '@/data/navigation';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	// Track the current tab value (optional for active state)
	export let currentTab: any;

	const handleTabClick = (slug: any) => {
		if (appNavigation.map((n) => n.slug).includes(slug)) {
			goto(resolve(slug)); // Navigate to the selected page
		} else {
			goto(resolve('/404' as any)); // Navigate to 404 page if the slug is not valid
		}
	};
</script>

<div class="navigation my-4 w-full">
	<div class="flex w-full justify-center gap-4">
		{#each appNavigation as { slug, title }}
			<a
				href={slug}
				on:click={() => handleTabClick(slug)}
				class={`tab rounded p-2 text-lg ${$currentTab === slug ? 'active-tab border' : ''}`}
			>
				{title}
			</a>
		{/each}
	</div>
	<div class=" mt-4 border-t-1 border-solid border-[var(--bg-color-reverse)]"></div>
</div>
