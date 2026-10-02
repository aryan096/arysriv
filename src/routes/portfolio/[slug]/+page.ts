import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getProjectSlugs, type ProjectMeta } from '$lib/portfolio';

export function entries() {
	return getProjectSlugs().map((slug) => ({ slug }));
}

export const load: PageLoad = async ({ params }) => {
	try {
		const project = await import(`../../../content/portfolio/${params.slug}.md`);
		return {
			content: project.default,
			meta: project.metadata as ProjectMeta
		};
	} catch {
		throw error(404, `Project not found: ${params.slug}`);
	}
};
