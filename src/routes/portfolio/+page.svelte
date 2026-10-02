<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let list: HTMLOListElement | undefined = $state();

	function externalHref(href: string) {
		return { href };
	}

	// Up/down arrows move the selection bar like a TV menu
	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
		const links = Array.from(list?.querySelectorAll<HTMLAnchorElement>('.listing-title a') ?? []);
		const current = links.findIndex((link) => link.closest('li')?.contains(document.activeElement));
		if (current === -1) return;
		event.preventDefault();
		const next = event.key === 'ArrowDown' ? current + 1 : current - 1;
		links[(next + links.length) % links.length].focus();
	}
</script>

<svelte:head>
	<title>Portfolio | Aryan Srivastava</title>
	<meta name="description" content="Projects, research, and experiments by Aryan Srivastava" />
</svelte:head>

<div class="guide">
	<header class="guide-header">
		<h1>Portfolio</h1>
		<p>Projects, research, and experiments.</p>
	</header>

	{#if data.projects.length === 0}
		<p class="empty">Nothing on yet. Check back soon.</p>
	{:else}
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<ol class="listings" bind:this={list} onkeydown={handleKeydown}>
			{#each data.projects as project (project.slug)}
				<li class="listing">
					<div class="listing-body">
						<h2 class="listing-title">
							<a href={resolve(`/portfolio/${project.slug}`)}>{project.title}</a>
							{#if project.pinned}
								<span class="pinned">Pinned</span>
							{/if}
						</h2>
						<p class="listing-description">{project.description}</p>
						{#if project.tags && project.tags.length > 0}
							<ul class="tags" aria-label="Tags">
								{#each project.tags as tag (tag)}
									<li>{tag}</li>
								{/each}
							</ul>
						{/if}
					</div>

					{#if project.liveUrl}
						<a
							{...externalHref(project.liveUrl)}
							class="live-link"
							target="_blank"
							rel="external noopener noreferrer"
						>
							<span class="live-dot" aria-hidden="true"></span>
							Live site
						</a>
					{/if}
				</li>
			{/each}
		</ol>
	{/if}
</div>

<style>
	.guide-header {
		margin-bottom: 2rem;
	}

	.guide-header h1 {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(3rem, 8vw, 4.5rem);
		line-height: 0.85;
		color: var(--color-accent-bright);
		text-shadow:
			0 0 12px color-mix(in srgb, var(--color-accent-bright) 55%, transparent),
			3px 3px 0 #2c2045;
	}

	.guide-header p {
		margin: 0.75rem 0 0;
		color: var(--color-text-muted);
	}

	.empty {
		color: var(--color-text-muted);
	}

	.listings {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid color-mix(in srgb, var(--color-accent-muted) 55%, transparent);
	}

	.listing {
		position: relative;
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.5rem 1.5rem;
		align-items: start;
		padding: 1.25rem 1rem 1.25rem 1.5rem;
		border-bottom: 1px solid color-mix(in srgb, var(--color-accent-muted) 55%, transparent);
		transition: background-color 0.12s ease;
	}

	/* Selection bar: the row lights up and a cursor slides in */
	.listing::before {
		content: '▶';
		position: absolute;
		left: 0.2rem;
		top: 1.3rem;
		font-size: 0.8rem;
		color: var(--color-blue);
		text-shadow: 0 0 8px var(--color-blue);
		opacity: 0;
		transform: translateX(-6px);
		transition:
			opacity 0.12s ease,
			transform 0.12s ease;
	}

	.listing:hover,
	.listing:focus-within {
		background: color-mix(in srgb, var(--color-accent-muted) 18%, transparent);
	}

	.listing:hover::before,
	.listing:focus-within::before {
		opacity: 1;
		transform: none;
	}

	.listing-body {
		min-width: 0;
	}

	.listing-title {
		margin: 0;
		font-size: 1.05rem;
		font-weight: 600;
		line-height: 1.35;
	}

	.listing-title a {
		color: var(--color-accent-bright);
		text-decoration: none;
		text-shadow: 0 0 2px var(--color-accent-bright);
	}

	.listing-title a:hover {
		background: none;
	}

	.listing-title a:focus-visible {
		outline: none;
	}

	/* Whole row opens the project */
	.listing-title a::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	.listing:hover .listing-title a,
	.listing:focus-within .listing-title a {
		text-shadow: 0 0 10px var(--color-accent-bright);
	}

	.listing:has(.listing-title a:focus-visible) {
		outline: 2px solid var(--color-blue);
		outline-offset: -2px;
	}

	.pinned {
		margin-left: 0.5rem;
		padding: 0.05rem 0.4rem;
		font-size: 0.65rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		vertical-align: 0.15em;
		color: var(--color-blue);
		border: 1px solid color-mix(in srgb, var(--color-blue) 60%, transparent);
		border-radius: 3px;
	}

	.listing-description {
		margin: 0.35rem 0 0;
		font-size: 0.875rem;
		line-height: 1.65;
		color: var(--color-text-muted);
		max-width: 60ch;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin: 0.75rem 0 0;
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
		position: relative;
		z-index: 1;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.1rem;
		padding: 0.35rem 0.7rem;
		font-size: 0.75rem;
		font-weight: 600;
		white-space: nowrap;
		color: var(--color-accent-bright);
		text-decoration: none;
		text-shadow: none;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		background: var(--color-bg);
		transition:
			border-color 0.12s ease,
			background-color 0.12s ease,
			transform 0.08s ease;
	}

	.live-link:hover {
		color: var(--color-accent-bright);
		border-color: var(--color-red);
		background: color-mix(in srgb, var(--color-red) 14%, var(--color-bg));
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
		animation: on-air 1.6s ease-in-out infinite;
	}

	@keyframes on-air {
		50% {
			opacity: 0.35;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.live-dot {
			animation: none;
		}
	}

	@media (max-width: 640px) {
		.listing {
			grid-template-columns: 1fr;
			padding: 1rem 0.75rem 1.1rem 1.4rem;
		}

		.listing::before {
			top: 1.05rem;
		}

		.live-link {
			justify-self: start;
			margin-top: 0.5rem;
		}
	}
</style>
