export interface ProjectMeta {
	title: string;
	description: string;
	/** Last-updated date (YYYY-MM-DD), shown on the project page */
	updated?: string;
	tags: string[];
	published: boolean;
	/** Pinned projects sort above the rest, regardless of date */
	pinned?: boolean;
	liveUrl?: string;
}

export interface Project extends ProjectMeta {
	slug: string;
}

const projectFiles = import.meta.glob<{ metadata: ProjectMeta }>('/src/content/portfolio/*.md', {
	eager: true
});

function slugFromPath(path: string) {
	return path.split('/').pop()?.replace('.md', '') ?? '';
}

function getDateValue(date?: string) {
	if (!date) return Number.NEGATIVE_INFINITY;

	const value = new Date(date).getTime();
	return Number.isNaN(value) ? Number.NEGATIVE_INFINITY : value;
}

export function getProjects(): Project[] {
	return Object.entries(projectFiles)
		.map(([path, file]) => ({ ...file.metadata, slug: slugFromPath(path) }))
		.filter((project) => project.published)
		.sort(
			(a, b) =>
				Number(!!b.pinned) - Number(!!a.pinned) ||
				getDateValue(b.updated) - getDateValue(a.updated)
		);
}

export function getProjectSlugs() {
	return Object.keys(projectFiles).map(slugFromPath);
}

export function formatDate(date: string | undefined) {
	if (!date) return null;

	const value = new Date(`${date}T00:00:00`);
	if (Number.isNaN(value.getTime())) return null;

	return value.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
