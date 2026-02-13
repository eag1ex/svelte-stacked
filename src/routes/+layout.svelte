<script lang="ts">
	import './layout.css';
	import '../styles/styles.scss';
	import { sharedState } from '@/stores/index'; // Import the shared state store

	import { pageState, updateTitle } from '@/stores/pageState';
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import Header from '@/components/Header.svelte';
	import { page } from '$app/stores';
	import { appNavigation } from '@/data/navigation';
	import { derived } from 'svelte/store';
	import { goto } from '$app/navigation';
	import type { SharedState } from '@/types/index';

	let stateData: SharedState = {
		id: null,
		data: null
	};

	$: {
		stateData = $sharedState;
	}

	let currentTab = derived(page, ($page) => $page.url.pathname);

	const handleTabClick = (slug: string) => {
		if (appNavigation.map((n) => n.slug).includes(slug)) {
			goto(slug);
		} else {
			goto('/404');
		}
	};

	let title: string;

	$: {
		let pathname = $page.url.pathname;
		updateTitle(pathname);
	}

	$: {
		title = $pageState.title;
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="This is a description for the page {title}" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content="This is a description for the page {title}" />
</svelte:head>

<main class="container mx-auto mt-10 rounded-lg bg-white p-6 shadow-lg">
	<Header {title} />
	<Tabs bind:value={currentTab} class="w-full">
		<Tabs.List class="flex w-full justify-center gap-4">
			{#each appNavigation as { pageName, slug, title }}
				<Tabs.Trigger value={slug} class="text-lg text-blue-600 hover:underline">
					<a
						on:click|preventDefault={() => {
							handleTabClick(slug);
							currentTab = slug;
						}}
						href={slug}
						class="block py-2 text-center">{title}</a
					>
				</Tabs.Trigger>
			{/each}
		</Tabs.List>

		<Tabs.Indicator class="h-1 bg-blue-500" />
	</Tabs>

	<slot></slot>

	<footer class="mt-6 text-center text-sm text-gray-500">
		<p>&copy; 2024 My App</p>
	</footer>
</main>
