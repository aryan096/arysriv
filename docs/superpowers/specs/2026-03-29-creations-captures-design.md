# Creations + Captures Refactor — Design Spec

**Date:** 2026-03-29

## Overview

Merge the existing `/portfolio` and `/experimental` sections into a single `/creations` page, add a new `/captures` photography section, and add a treevoxel.arysriv.com listing under creations.

---

## 1. Route Changes

### Removed routes

- `/src/routes/portfolio/` (listing + `[slug]` detail) — deleted
- `/src/routes/experimental/` (listing + `[slug]` detail) — deleted

### New routes

- `/src/routes/creations/+page.svelte` — listing page
- `/src/routes/creations/+page.ts` — loader (reads `src/content/creations/*.md`)
- `/src/routes/creations/[slug]/+page.svelte` — detail page
- `/src/routes/creations/[slug]/+page.ts` — slug loader
- `/src/routes/captures/+page.svelte` — photo grid listing
- `/src/routes/captures/+page.ts` — loader (reads `src/content/captures/*.md`)
- `/src/routes/captures/[slug]/+page.svelte` — photo detail page
- `/src/routes/captures/[slug]/+page.ts` — slug loader

### Navigation updates

- `src/routes/+layout.svelte` navButtons: replace `EXPERIMENTAL` + `PORTFOLIO` with `CREATIONS` + `CAPTURES`
- `src/lib/components/Sidebar.svelte`: update nav links to `/creations` and `/captures`

---

## 2. Content

### Creations content (`src/content/creations/`)

Move all existing files here, no frontmatter changes:

- `panchayat.md` (from `portfolio/`)
- `pc51.md` (from `portfolio/`)
- `thesis.md` (from `portfolio/`)
- `chainrxn.md` (from `experimental/`)
- `emergentia.md` (from `experimental/`)
- `questline.md` (from `experimental/`)

Delete `src/content/portfolio/` and `src/content/experimental/` after moving.

New stub file: `src/content/creations/treevoxel.md`

```yaml
---
title: TreeVoxel
description: A placeholder description — edit me.
date: "2026-03-29"
tags: []
published: true
liveUrl: "https://treevoxel.arysriv.com"
---
```

### Captures content (`src/content/captures/`)

Empty directory initially. Future files follow the existing frontmatter shape plus one new field:

```yaml
---
title: string
description: string
date: "YYYY-MM-DD"
tags:
  - Tag1
published: true | false
imagePath: "/captures/filename.jpg"
---
```

Images are stored in `static/captures/`.

---

## 3. Creations Page

Identical behaviour to the current portfolio listing page:

- Loads all `src/content/creations/*.md` files, filters `published: true`, sorts by date descending
- Cards show: title, description, date, tags, "Read more" button, optional "Live site" button
- Items are displayed flat — no visual distinction between former portfolio vs experimental entries
- Empty state: "No creations yet. Check back soon!"

The `[slug]` detail page is identical to the current portfolio slug page, with back link pointing to `/creations`.

---

## 4. Captures Page

### Listing (`/captures`)

- Loads all `src/content/captures/*.md`, filters `published: true`, sorts by date descending
- Displays a responsive photo grid: each card shows the photo thumbnail (`imagePath`), title, and date
- Clicking a card navigates to `/captures/[slug]`
- Empty state: "No captures yet. Check back soon!"

### Detail (`/captures/[slug]`)

- Hero image full-width at top (from `imagePath` frontmatter), within the existing `content-wrapper` max-width
- Title + date + tags header below the image
- Markdown content beneath
- Back link to `/captures`

---

## 5. Validation

Run before merging:

- `npm run check`
- `npm run lint`
- `npm run build`
