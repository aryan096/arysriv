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
