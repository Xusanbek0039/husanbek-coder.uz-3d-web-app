import type { MetadataRoute } from "next";
import { config } from "@/data/config";
import projects from "@/data/projects";
import { getAllPosts } from "@/lib/itc-blog";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = config.site;
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/projects`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ].map((p) => ({ ...p, lastModified: now }) as MetadataRoute.Sitemap[number]);

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/projects/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const posts = await getAllPosts().catch(() => []);
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.id}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...pages, ...projectPages, ...postPages];
}
