<script lang="ts">
	import { Progress } from '@skeletonlabs/skeleton-svelte';
</script>

<Progress class="w-fit max-w-5 items-center justify-center" value={null}>
	<Progress.Circle class="[--size:--spacing(6)]">
		<Progress.CircleTrack />
		<Progress.CircleRange />
	</Progress.Circle>
	<Progress.ValueText />
</Progress>
