<script lang="ts">
	import { Progress } from '@skeletonlabs/skeleton-svelte';
</script>

<Progress class="w-fit items-center " value={null}>
	<Progress.Circle class="[--size:--spacing(7)]">
		<Progress.CircleTrack />
		<Progress.CircleRange />
	</Progress.Circle>
	<Progress.ValueText />
</Progress>
