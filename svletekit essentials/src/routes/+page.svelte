<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ articles } = data);
</script>

<div class="grid">
	<div>
		<h2>Articles:</h2>
		{#each articles as article}
			<article>
				<header>{article.title}</header>
				<p>
					{article.content}
				</p>
				<button class="outline secondary">Delete Article </button>
				<a href="/" role="button" class="outline contrast" style="width: 100%;">Edit article </a>
			</article>
		{/each}
	</div>
	<form action="?/createArticle" method="POST">
		<h3>New article</h3>
		<label for="title">title</label>
		<input type="text" id="title" name="title" />
		<label for="title">title</label>
		<textarea name="content" id="content" rows={5} />
		<button type="submit"> Add article </button>
	</form>
</div>
