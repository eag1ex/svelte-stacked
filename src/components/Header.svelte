<script lang="ts">
	export let title: string = 'Default Title';
	let subtitle: string = 'This is a subtitle';

	function changeTitle(newTitle: string) {
		title = newTitle;
	}
</script>

<header class="rounded-lg bg-blue-500 p-4 text-white shadow-md">
	<h1 class="text-2xl font-semibold">{title}</h1>
	<p>{subtitle}</p>

	<button on:click={() => changeTitle('Updated Title')}>Change Title</button>
</header>

<style>
	header {
		text-align: center;
	}
</style>
