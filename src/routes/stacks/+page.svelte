<!-- src/routes/stacks.svelte -->
<script lang="ts">
	import { writable } from 'svelte/store';
	import { Status } from '@lib/index'; // Enum for Status: Draft, Published

	// Article store for managing articles
	export const articles = writable([
		{ id: 1, title: 'Sample Article', status: Status.Published },
		{ id: 2, title: 'Draft Article', status: Status.Draft }
	]);

	let title = '';
	let status = Status.Draft;

	const addArticle = () => {
		articles.update((currentArticles) => [
			...currentArticles,
			{ id: currentArticles.length + 1, title, status }
		]);
		title = ''; // Reset form
		status = Status.Draft; // Reset status
	};
</script>

<section class="mx-auto p-6">
	<h1>Stacks - CRUD Operations</h1>

	<!-- Form to add articles -->
	<form on:submit|preventDefault={addArticle}>
		<div class="form-group">
			<label for="title">Article Title</label>
			<input type="text" id="title" bind:value={title} class="input" placeholder="Enter title" />
		</div>
		<div class="form-group">
			<label for="status">Status</label>
			<select bind:value={status} class="select">
				<option value={Status.Draft}>Draft</option>
				<option value={Status.Published}>Published</option>
			</select>
		</div>
		<button type="submit" class="button">Add Article</button>
	</form>

	<!-- Article list -->
	<ul>
		{#each $articles as article}
			<li class="card">
				<h3>{article.title}</h3>
				<p>Status: {article.status}</p>
			</li>
		{/each}
	</ul>
</section>
