<script lang="ts">
	import './layout.css';
	import '../styles/styles.scss';
	import { pageState, updateTitle } from '@/stores/pageState';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { createMockServer } from '@/lib/mockServer';
	import { onMount } from 'svelte';
	import { APP } from '@/data/app';
	import Navigation from '@/components/Navigation.svelte';
	import AppBar from '@/components/AppBar.svelte';

	let title: string;
	const currYear = new Date().getFullYear();
	let currentTab = derived(page, ($page) => $page.route.id);

	$: {
		let pathname = $page.url.pathname;
		updateTitle(pathname);
	}

	$: {
		title = $pageState.title;
	}

	onMount(() => {
		createMockServer();
	});
</script>

<svelte:head>
	<title>{APP.TITLE} | {title}</title>

	<meta property="og:title" content={`${APP.TITLE} | ${title}`} />
	<meta name="description" content={`${APP.DESC} | Build by ${APP.BY}`} />
	<meta property="og:description" content={`${APP.DESC} | Build by ${APP.BY}`} />
	<link rel="icon" href={'/favicon.svg'} type="image/svg+xml " />
</svelte:head>

<AppBar title={APP.NAME} />
<main class="container mx-auto mt-10 rounded-lg bg-[rgba(255,255,255,0.05)] px-10 py-6 shadow-lg">
	<Navigation {currentTab} />
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
