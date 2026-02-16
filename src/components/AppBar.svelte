<script lang="ts">
	import ThemeSwitch from './ThemeSwitch.svelte';
	export let title: string = 'Default Title';
</script>

<nav class=" px-6 py-4 text-white">
	<div class="flex items-center justify-between">
		<!-- Left Block -->
		<div class="text-lg font-semibold">Left</div>

		<!-- Middle Block (Center) -->
		<div class="text-primary bg-main-50 mb-3 flex-1 rounded-lg text-center">
			<!-- <div class="text-lg font-semibold">Middle</div> -->
			<h1 class="text-5xl font-semibold">{title}</h1>
		</div>

		<!-- Right Block -->
		<div class="text-lg font-semibold"><ThemeSwitch /></div>
	</div>
</nav>
