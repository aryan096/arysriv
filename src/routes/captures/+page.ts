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
