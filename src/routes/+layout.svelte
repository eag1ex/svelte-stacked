<script lang="ts">
	import './layout.css';
	import '../styles/styles.scss';
	import { setTheme, sharedState } from '@/stores/index';
	import { pageState, updateTitle } from '@/stores/pageState';
	import Header from '@/components/Header.svelte';
	import { page } from '$app/stores';
	import { appNavigation } from '@/data/navigation';
	import { derived } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { createMockServer } from '@/lib/mockServer';
	import { onMount } from 'svelte';
	import { APP } from '@/data/app';
	import Navigation from '@/components/Navigation.svelte'; // Import the new Navigation component

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

		setTheme(themeColor, (val: any) => {
			typeof document === 'object' && document.documentElement.setAttribute('data-theme', val);
		});
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
</svelte:head>

<main class="container mx-auto mt-10 rounded-lg bg-[rgba(255,255,255,0.05)] px-10 py-6 shadow-lg">
	<Header {title} />

	<!-- Move Tabs to Navigation component -->
	<Navigation {currentTab} {handleTabClick} />

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
