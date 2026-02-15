<!-- src/routes/index.svelte -->
<script lang="ts">
	import { APP } from '@/data/app';
</script>

<section class="mx-auto w-full">
	<h1 class="mb-2 text-2xl font-bold">{APP.TITLE}</h1>

	<p>{APP.DESC} | Build by {APP.BY}</p>
</section>
