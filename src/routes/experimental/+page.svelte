<script lang="ts">
	import type { PageData } from './$types';
	
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Experimental | Aryan Srivastava</title>
	<meta name="description" content="Work in progress projects, experiments, and dev logs by Aryan Srivastava" />
</svelte:head>

<div class="space-y-8">
	<div>
		<h1 class="text-2xl font-semibold mb-2">Experimental</h1>
		<p class="text-[var(--color-text-muted)]">
			Work in progress projects, experiments, and dev logs.
		</p>
	</div>
	
	{#if data.projects.length === 0}
		<p class="text-[var(--color-text-muted)]">No experiments yet. Check back soon!</p>
	{:else}
		<div class="space-y-6">
			{#each data.projects as project}
				<a 
					href="/experimental/{project.slug}" 
					class="card-link block p-5 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent-bright)] transition-colors group"
				>
					<div class="flex flex-col gap-2">
						<h2 class="text-lg font-medium group-hover:text-[var(--color-accent)] transition-colors">
							{project.title}
						</h2>
						<p class="text-sm text-[var(--color-text-muted)] leading-relaxed">
							{project.description}
						</p>
						<div class="flex flex-wrap items-center gap-3 mt-2">
							<span class="text-xs text-[var(--color-text-muted)]">
								{new Date(project.date).toLocaleDateString('en-US', { 
									year: 'numeric', 
									month: 'long', 
									day: 'numeric' 
								})}
							</span>
							{#if project.tags && project.tags.length > 0}
								<div class="flex flex-wrap gap-2">
									{#each project.tags as tag}
										<span class="text-xs px-2 py-0.5 bg-[var(--color-bg)] rounded text-[var(--color-accent-muted)]">
											{tag}
										</span>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
