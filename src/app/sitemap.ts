import type { MetadataRoute } from "next";
import { projectSlugs } from "@/lib/projects";

const siteUrl = "https://franciscotuozzo.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = projectSlugs.map((slug) => ({
    url: `${siteUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectPages,
  ];
}
