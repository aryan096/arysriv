<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatDate } from '$lib/portfolio';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const updated = $derived(formatDate(data.meta.updated));

	function externalHref(href: string) {
		return { href };
	}
</script>

<svelte:head>
	<title>{data.meta.title} | Aryan Srivastava</title>
	<meta name="description" content={data.meta.description} />
</svelte:head>

<article>
	<a href={resolve('/portfolio')} class="back-link">
		<span aria-hidden="true">◀</span> Portfolio
	</a>

	<header class="project-header">
		<h1>{data.meta.title}</h1>
		<p class="summary">{data.meta.description}</p>

		<div class="meta">
			{#if updated}
				<span>Last updated <time datetime={data.meta.updated}>{updated}</time></span>
			{/if}
			{#if data.meta.tags && data.meta.tags.length > 0}
				<ul class="tags" aria-label="Tags">
					{#each data.meta.tags as tag (tag)}
						<li>{tag}</li>
					{/each}
				</ul>
			{/if}
		</div>

		{#if data.meta.liveUrl}
			<a
				{...externalHref(data.meta.liveUrl)}
				class="live-link"
				target="_blank"
				rel="external noopener noreferrer"
			>
				<span class="live-dot" aria-hidden="true"></span>
				Open live site
			</a>
		{/if}
	</header>

	<div class="prose prose-invert max-w-none">
		<data.content />
	</div>
</article>

<style>
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
		color: var(--color-text-muted);
		text-decoration: none;
		text-shadow: none;
	}

	.back-link span {
		font-size: 0.7rem;
		transition: transform 0.12s ease;
	}

	.back-link:hover {
		color: var(--color-accent-bright);
		background: none;
	}

	.back-link:hover span {
		transform: translateX(-3px);
	}

	.project-header {
		margin: 1.75rem 0 2.25rem;
		padding-bottom: 1.75rem;
		border-bottom: 1px solid color-mix(in srgb, var(--color-accent-muted) 55%, transparent);
	}

	h1 {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(2.5rem, 7vw, 3.75rem);
		line-height: 0.95;
		color: var(--color-accent-bright);
		text-shadow:
			0 0 12px color-mix(in srgb, var(--color-accent-bright) 55%, transparent),
			3px 3px 0 #2c2045;
		text-wrap: balance;
	}

	.summary {
		margin: 1rem 0 0;
		max-width: 60ch;
		line-height: 1.7;
		color: var(--color-text);
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem 1rem;
		margin-top: 1.25rem;
		font-size: 0.8rem;
		color: var(--color-text-muted);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.tags li {
		font-size: 0.7rem;
		padding: 0.1rem 0.45rem;
		border: 1px solid color-mix(in srgb, var(--color-accent-muted) 70%, transparent);
		border-radius: 3px;
		color: var(--color-accent);
	}

	.live-link {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		margin-top: 1.5rem;
		padding: 0.5rem 0.9rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-accent-bright);
		text-decoration: none;
		text-shadow: none;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		transition:
			border-color 0.12s ease,
			background-color 0.12s ease,
			transform 0.08s ease;
	}

	.live-link:hover {
		color: var(--color-accent-bright);
		border-color: var(--color-red);
		background: color-mix(in srgb, var(--color-red) 14%, transparent);
	}

	.live-link:active {
		transform: translateY(1px);
	}

	.live-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--color-red);
		box-shadow: 0 0 6px var(--color-red);
	}
</style>
