import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/content";

// Served at /blog/sitemap.xml. Separate from the main sitemap on purpose:
// with one post per day this file changes daily and crawlers re-fetch it
// often, while the main sitemap stays stable. Regenerated hourly once the
// posts come from the database.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  return [
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(posts[0]?.updatedAt ?? Date.now()),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
