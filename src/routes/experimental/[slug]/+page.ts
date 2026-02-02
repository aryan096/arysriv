import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

interface ProjectMeta {
	title: string;
	description: string;
	date: string;
	tags: string[];
	published: boolean;
}

export const load: PageLoad = async ({ params }) => {
	try {
		const project = await import(`../../../content/experimental/${params.slug}.md`);
		
		return {
			content: project.default,
			meta: project.metadata as ProjectMeta
		};
	} catch {
		throw error(404, `Project not found: ${params.slug}`);
	}
};
