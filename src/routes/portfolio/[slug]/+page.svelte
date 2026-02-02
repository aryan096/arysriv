<script lang="ts">
	import type { PageData } from './$types';
	import type { Component } from 'svelte';
	
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.meta.title} | Aryan Srivastava</title>
	<meta name="description" content={data.meta.description} />
</svelte:head>

<article class="space-y-8">
	<!-- Back link -->
	<a 
		href="/portfolio" 
		class="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
	>
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
		</svg>
		Back to portfolio
	</a>
	
	<!-- Header -->
	<header class="space-y-4">
		<h1 class="text-2xl font-semibold">{data.meta.title}</h1>
		<div class="flex flex-wrap items-center gap-3">
			<span class="text-sm text-[var(--color-text-muted)]">
				{new Date(data.meta.date).toLocaleDateString('en-US', { 
					year: 'numeric', 
					month: 'long', 
					day: 'numeric' 
				})}
			</span>
			{#if data.meta.tags && data.meta.tags.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each data.meta.tags as tag}
						<span class="text-xs px-2 py-0.5 bg-[var(--color-bg-secondary)] rounded border border-[var(--color-border)] text-[var(--color-accent-muted)]">
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</div>
	</header>
	
	<!-- Content -->
	<div class="prose prose-invert max-w-none">
		<data.content />
	</div>
</article>
