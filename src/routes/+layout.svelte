<script lang="ts">
	import './layout.css';
	import '../styles/styles.scss';
	import { setTheme, sharedState } from '@/stores/index'; // Import the shared state store

	import { pageState, updateTitle } from '@/stores/pageState';
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import Header from '@/components/Header.svelte';
	import { page } from '$app/stores';
	import { appNavigation } from '@/data/navigation';
	import { derived } from 'svelte/store';
	import { goto } from '$app/navigation';
	import type { SharedState } from '@/types/index';
	import { makeServer } from '@/lib/mockServer';
	import { onMount } from 'svelte';
	import { APP } from '@/data/app';

	let stateData: SharedState = {
		id: null,
		data: null
	};
	const currYear = new Date().getFullYear();

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

	$: {
		// project theme color
		const themeColor =
			typeof localStorage === 'object' ? localStorage.getItem('theme') || 'dark' : 'dark';

		setTheme(themeColor, (val) => {
			console.log('theme is', val);
			typeof document === 'object' && document.documentElement.setAttribute('data-theme', val);
		});
	}
	onMount(() => {
		// setTheme
	});
	//if (import.meta.env.MODE === 'development') {
	makeServer();
	//}
</script>

<svelte:head>
	<title>{APP.TITLE} | {title}</title>
	<meta property="og:title" content={`${APP.TITLE} | ${title}`} />
	<meta name="description" content={`${APP.DESC} | Build by ${APP.BY}`} />

	<meta property="og:description" content={`${APP.DESC} | Build by ${APP.BY}`} />
</svelte:head>

<main class="container mx-auto mt-10 rounded-lg bg-[rgba(255,255,255,0.05)] px-10 py-6 shadow-lg">
	<Header {title} />
	<Tabs bind:value={currentTab} class="mt-4 w-full">
		<Tabs.List class="flex w-full justify-center gap-4">
			{#each appNavigation as { pageName, slug, title }}
				<Tabs.Trigger value={slug} class="text-lg">
					<a
						on:click|preventDefault={() => {
							handleTabClick(slug);
							currentTab = slug;
						}}
						href={slug}
						class="block py-1 text-center">{title}</a
					>
				</Tabs.Trigger>
			{/each}
		</Tabs.List>

		<!-- <Tabs.Indicator class="h-1 bg-blue-500" /> -->
	</Tabs>

	<div class="mx-auto w-full">
		<slot></slot>
	</div>

	<footer class="mt-10 text-center text-sm text-gray-500">
		<p>
			&copy; {currYear} | {APP.TITLE} |
			<a
				class="underline"
				rel="nofollow noopener"
				target="_blank"
				href="https://michaelworks.eaglex.net/">By {APP.BY}</a
			>
		</p>
	</footer>
</main>
