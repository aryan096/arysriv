# Creations + Captures Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merge `/portfolio` and `/experimental` into `/creations`, add a `/captures` photography section, and add a treevoxel.arysriv.com listing.

**Architecture:** Three sets of changes — content reorganisation (move md files, add stub), new SvelteKit routes for `/creations` and `/captures` mirroring the existing portfolio pattern, then nav updates and old route deletion. New captures pattern adds an `imagePath` frontmatter field and a photo grid listing.

**Tech Stack:** SvelteKit 5, TypeScript, Tailwind CSS v4, mdsvex, `@sveltejs/adapter-static`

---

## File Map

**Create:**

- `src/content/creations/treevoxel.md`
- `src/content/captures/` (directory, stays empty until user adds photos)
- `static/captures/` (directory for future photo uploads)
- `src/routes/creations/+page.ts`
- `src/routes/creations/+page.svelte`
- `src/routes/creations/[slug]/+page.ts`
- `src/routes/creations/[slug]/+page.svelte`
- `src/routes/captures/+page.ts`
- `src/routes/captures/+page.svelte`
- `src/routes/captures/[slug]/+page.ts`
- `src/routes/captures/[slug]/+page.svelte`

**Move:**

- `src/content/portfolio/*.md` → `src/content/creations/`
- `src/content/experimental/*.md` → `src/content/creations/`

**Modify:**

- `src/routes/+layout.svelte` — replace EXPERIMENTAL + PORTFOLIO nav with CREATIONS + CAPTURES
- `src/lib/components/Sidebar.svelte` — update nav links

**Delete:**

- `src/routes/portfolio/` (entire directory)
- `src/routes/experimental/` (entire directory)
- `src/content/portfolio/` (now empty after move)
- `src/content/experimental/` (now empty after move)

---

## Task 1: Reorganise content

**Files:**

- Move: `src/content/portfolio/*.md` → `src/content/creations/`
- Move: `src/content/experimental/*.md` → `src/content/creations/`
- Create: `src/content/creations/treevoxel.md`
- Create: `static/captures/.gitkeep`

- [ ] **Step 1: Move portfolio and experimental content into creations**

```bash
mkdir -p src/content/creations
mv src/content/portfolio/*.md src/content/creations/
mv src/content/experimental/*.md src/content/creations/
```

- [ ] **Step 2: Create the treevoxel stub**

Create `src/content/creations/treevoxel.md`:

```markdown
---
title: TreeVoxel
description: A voxel-based tree generation tool.
date: "2026-03-29"
tags: []
published: true
liveUrl: "https://treevoxel.arysriv.com"
---

TreeVoxel is a tool for generating and exploring voxel trees. Visit the live site to explore it.
```

- [ ] **Step 3: Create captures image directory**

```bash
mkdir -p static/captures
touch static/captures/.gitkeep
```

- [ ] **Step 4: Commit**

```bash
git add src/content/creations/ static/captures/
git commit -m "move content into creations dir, add treevoxel stub"
```

---

## Task 2: Create creations routes

**Files:**

- Create: `src/routes/creations/+page.ts`
- Create: `src/routes/creations/+page.svelte`
- Create: `src/routes/creations/[slug]/+page.ts`
- Create: `src/routes/creations/[slug]/+page.svelte`

- [ ] **Step 1: Create the creations listing loader**

Create `src/routes/creations/+page.ts`:

```typescript
import type { PageLoad } from "./$types";

interface ProjectMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  liveUrl?: string;
}

interface Project extends ProjectMeta {
  slug: string;
}

export const load: PageLoad = async () => {
  const projectFiles = import.meta.glob<{ metadata: ProjectMeta }>(
    "/src/content/creations/*.md",
    { eager: true },
  );

  const projects: Project[] = Object.entries(projectFiles)
    .map(([path, file]) => {
      const slug = path.split("/").pop()?.replace(".md", "") ?? "";
      return { ...file.metadata, slug };
    })
    .filter((project) => project.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { projects };
};
```

- [ ] **Step 2: Create the creations listing page**

Create `src/routes/creations/+page.svelte`:

```svelte
<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Creations | Aryan Srivastava</title>
	<meta name="description" content="Projects, experiments, and creative work by Aryan Srivastava" />
</svelte:head>

<div class="space-y-8">
	<div>
		<h1 class="text-2xl font-semibold mb-2">Creations</h1>
		<p class="text-[var(--color-text-muted)]">
			Projects, experiments, and creative work.
		</p>
	</div>

	{#if data.projects.length === 0}
		<p class="text-[var(--color-text-muted)]">No creations yet. Check back soon!</p>
	{:else}
		<div class="space-y-6">
			{#each data.projects as project}
				<article class="p-5 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent-bright)] transition-colors group">
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
						<div class="mt-3 flex flex-wrap gap-2">
							<a
								href="/creations/{project.slug}"
								class="card-button inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-[var(--color-accent-bright)] hover:border-[var(--color-accent-bright)] hover:text-[var(--color-text)] transition-colors"
							>
								Read more
							</a>
							{#if project.liveUrl}
								<a
									href={project.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="card-button inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-[var(--color-accent-bright)] hover:border-[var(--color-accent-bright)] hover:text-[var(--color-text)] transition-colors"
								>
									Live site
								</a>
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</div>
```

- [ ] **Step 3: Create the creations slug loader**

Create `src/routes/creations/[slug]/+page.ts`:

```typescript
import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";

interface ProjectMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  liveUrl?: string;
}

export const load: PageLoad = async ({ params }) => {
  try {
    const project = await import(
      `../../../content/creations/${params.slug}.md`
    );
    return {
      content: project.default,
      meta: project.metadata as ProjectMeta,
    };
  } catch {
    throw error(404, `Project not found: ${params.slug}`);
  }
};
```

- [ ] **Step 4: Create the creations slug page**

Create `src/routes/creations/[slug]/+page.svelte`:

```svelte
<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.meta.title} | Aryan Srivastava</title>
	<meta name="description" content={data.meta.description} />
</svelte:head>

<article class="space-y-8">
	<a
		href="/creations"
		class="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
	>
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
		</svg>
		Back to creations
	</a>

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

	<div class="prose prose-invert max-w-none">
		<data.content />
	</div>
</article>
```

- [ ] **Step 5: Type-check**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add src/routes/creations/
git commit -m "add creations routes"
```

---

## Task 3: Create captures routes

**Files:**

- Create: `src/routes/captures/+page.ts`
- Create: `src/routes/captures/+page.svelte`
- Create: `src/routes/captures/[slug]/+page.ts`
- Create: `src/routes/captures/[slug]/+page.svelte`

- [ ] **Step 1: Create the captures listing loader**

Create `src/routes/captures/+page.ts`:

```typescript
import type { PageLoad } from "./$types";

interface CaptureMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  imagePath: string;
}

interface Capture extends CaptureMeta {
  slug: string;
}

export const load: PageLoad = async () => {
  const captureFiles = import.meta.glob<{ metadata: CaptureMeta }>(
    "/src/content/captures/*.md",
    { eager: true },
  );

  const captures: Capture[] = Object.entries(captureFiles)
    .map(([path, file]) => {
      const slug = path.split("/").pop()?.replace(".md", "") ?? "";
      return { ...file.metadata, slug };
    })
    .filter((capture) => capture.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { captures };
};
```

- [ ] **Step 2: Create the captures listing page**

Create `src/routes/captures/+page.svelte`:

```svelte
<script lang="ts">
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
			{#each data.captures as capture}
				<a
					href="/captures/{capture.slug}"
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
```

- [ ] **Step 3: Create the captures slug loader**

Create `src/routes/captures/[slug]/+page.ts`:

```typescript
import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";

interface CaptureMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  imagePath: string;
}

export const load: PageLoad = async ({ params }) => {
  try {
    const capture = await import(`../../../content/captures/${params.slug}.md`);
    return {
      content: capture.default,
      meta: capture.metadata as CaptureMeta,
    };
  } catch {
    throw error(404, `Capture not found: ${params.slug}`);
  }
};
```

- [ ] **Step 4: Create the captures slug page**

Create `src/routes/captures/[slug]/+page.svelte`:

```svelte
<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.meta.title} | Aryan Srivastava</title>
	<meta name="description" content={data.meta.description} />
</svelte:head>

<article class="space-y-8">
	<a
		href="/captures"
		class="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
	>
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
		</svg>
		Back to captures
	</a>

	<div class="rounded-lg overflow-hidden border border-[var(--color-border)]">
		<img
			src={data.meta.imagePath}
			alt={data.meta.title}
			class="w-full object-contain max-h-[500px]"
		/>
	</div>

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

	<div class="prose prose-invert max-w-none">
		<data.content />
	</div>
</article>
```

- [ ] **Step 5: Type-check**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add src/routes/captures/
git commit -m "add captures routes"
```

---

## Task 4: Update navigation

**Files:**

- Modify: `src/routes/+layout.svelte`
- Modify: `src/lib/components/Sidebar.svelte`

- [ ] **Step 1: Update layout navButtons**

In `src/routes/+layout.svelte`, replace the `navButtons` array (lines ~11-16):

```typescript
const navButtons = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/creations", label: "CREATIONS" },
  { href: "/captures", label: "CAPTURES" },
];
```

- [ ] **Step 2: Update Sidebar nav (desktop)**

In `src/lib/components/Sidebar.svelte`, replace the desktop nav block (inside the `{:else}` branch):

```svelte
<nav class="flex flex-col gap-3 mb-8">
    <a href="/" class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">Home</a>
    <a href="/about" class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">About</a>
    <a href="/creations" class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">Creations</a>
    <a href="/captures" class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">Captures</a>
</nav>
```

- [ ] **Step 3: Update Sidebar nav (mobile)**

In `src/lib/components/Sidebar.svelte`, replace the mobile nav block (inside the `{#if mobile}` branch):

```svelte
<nav class="flex justify-center gap-6 text-sm">
    <a href="/" class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">Home</a>
    <a href="/about" class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">About</a>
    <a href="/creations" class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">Creations</a>
    <a href="/captures" class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">Captures</a>
</nav>
```

- [ ] **Step 4: Type-check**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/routes/+layout.svelte src/lib/components/Sidebar.svelte
git commit -m "update nav to creations and captures"
```

---

## Task 5: Remove old routes and content dirs

**Files:**

- Delete: `src/routes/portfolio/`
- Delete: `src/routes/experimental/`
- Delete: `src/content/portfolio/` (now empty)
- Delete: `src/content/experimental/` (now empty)

- [ ] **Step 1: Delete old route directories**

```bash
rm -rf src/routes/portfolio src/routes/experimental
```

- [ ] **Step 2: Delete old content directories**

```bash
rm -rf src/content/portfolio src/content/experimental
```

- [ ] **Step 3: Full validation**

```bash
npm run check
```

Expected: 0 errors.

```bash
npm run lint
```

Expected: no lint errors.

```bash
npm run build
```

Expected: build completes with no errors. Output in `.svelte-kit/output` and `build/`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "remove old portfolio and experimental routes"
```
