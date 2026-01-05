// @ts-nocheck
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

interface ProjectMeta {
	title: string;
	description: string;
	date: string;
	tags: string[];
	published: boolean;
}

export const load = async ({ params }: Parameters<PageLoad>[0]) => {
	try {
		const project = await import(`../../../content/projects/${params.slug}.md`);
		
		return {
			content: project.default,
			meta: project.metadata as ProjectMeta
		};
	} catch {
		throw error(404, `Project not found: ${params.slug}`);
	}
};
