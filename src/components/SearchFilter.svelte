<script lang="ts">
	import { onDestroy } from 'svelte';
	export let onSearch: (term: string) => void;

	let searchTerm = '';

	const handleSearch = () => {
		onSearch(searchTerm); // Call the provided callback with the search term
	};

	// Handle keyboard shortcuts (e.g., press "Ctrl + F" for focus)
	const handleKeydown = (e: KeyboardEvent) => {
		if (e.ctrlKey && e.key === 'f') {
			// Focus on search input when "Ctrl + F" is pressed
			e.preventDefault();
			document.getElementById('searchInput')?.focus();
		}
	};

	// Listen for keyboard events
	if (typeof window === 'object') {
		window.addEventListener('keydown', handleKeydown);
	}

	// Cleanup event listener when component is destroyed

	onDestroy(() => {
		if (typeof window === 'object') {
			window.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

<div class="search-bar flex items-center justify-center space-x-2">
	<input
		id="searchInput"
		type="text"
		bind:value={searchTerm}
		on:input={handleSearch}
		placeholder="Search by title or author"
		class="text-dark w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[var(--ochre)] focus:outline-none"
	/>
	<span class="shortcut-icon text-sm">⌘ + F</span>
	<!-- Shortcut Symbol -->
</div>

<style>
	.search-bar {
		position: relative;
	}
	.search-bar .shortcut-icon {
		min-width: 66px;
		position: absolute;
		right: 0;
		z-index: 1;
	}
</style>
