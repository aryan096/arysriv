import type { PageLoad } from './$types';

interface ProjectMeta {
	title: string;
	description: string;
	date: string;
	tags: string[];
	published: boolean;
}

interface Project extends ProjectMeta {
	slug: string;
}

export const load: PageLoad = async () => {
	const projectFiles = import.meta.glob<{ metadata: ProjectMeta }>('/src/content/projects/*.md', { eager: true });
	
	const projects: Project[] = Object.entries(projectFiles)
		.map(([path, file]) => {
			const slug = path.split('/').pop()?.replace('.md', '') ?? '';
			return {
				...file.metadata,
				slug
			};
		})
		.filter((project) => project.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	
	return { projects };
};
