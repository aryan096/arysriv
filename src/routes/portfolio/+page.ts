import type { PageLoad } from './$types';
import { getProjects } from '$lib/portfolio';

export const load: PageLoad = () => {
	return { projects: getProjects() };
};
