import type { MetadataRoute } from "next";
import { games, getGamePath } from "@/data/games";
import { siteUrl } from "@/data/portfolio";
import { projectSlugs } from "@/lib/projects";

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
    {
      url: `${siteUrl}/info`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projectPages,
    {
      url: `${siteUrl}/play`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...games.map((game) => ({
      url: `${siteUrl}${getGamePath(game)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
