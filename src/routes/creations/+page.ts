import type { PageLoad } from "./$types";

interface ProjectMeta {
  title: string;
  description: string;
  date?: string;
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

  function getDateValue(date?: string) {
    if (!date) return Number.NEGATIVE_INFINITY;

    const value = new Date(date).getTime();
    return Number.isNaN(value) ? Number.NEGATIVE_INFINITY : value;
  }

  const projects: Project[] = Object.entries(projectFiles)
    .map(([path, file]) => {
      const slug = path.split("/").pop()?.replace(".md", "") ?? "";
      return { ...file.metadata, slug };
    })
    .filter((project) => project.published)
    .sort((a, b) => getDateValue(b.date) - getDateValue(a.date));

  return { projects };
};
