<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Captures | Aryan Srivastava</title>
	<meta name="description" content="Photography by Aryan Srivastava" />
</svelte:head>

<div class="space-y-8">
	<div>
		<h1 class="text-2xl font-semibold mb-2">Captures</h1>
		<p class="text-[var(--color-text-muted)]">A photography portfolio.</p>
	</div>

	{#if data.captures.length === 0}
		<p class="text-[var(--color-text-muted)]">No captures yet. Check back soon!</p>
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{#each data.captures as capture (capture.slug)}
				<a
					href={resolve(`/captures/${capture.slug}`)}
					class="group block rounded-lg overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-accent-bright)] transition-colors"
				>
					<div class="aspect-[4/3] overflow-hidden bg-[var(--color-bg-secondary)]">
						<img
							src={capture.imagePath}
							alt={capture.title}
							class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					</div>
					<div class="p-3">
						<p class="text-sm font-medium group-hover:text-[var(--color-accent)] transition-colors">
							{capture.title}
						</p>
						<p class="text-xs text-[var(--color-text-muted)] mt-1">
							{new Date(capture.date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</p>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
