import type { MetadataRoute } from "next";
import { config } from "@/data/config";
import projects from "@/data/projects";
import { getAllPosts } from "@/lib/itc-blog";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/i18n/helpers";

export const revalidate = 3600;

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

// Har bir sahifa uchun 3 ta tildagi URL va ular orasidagi hreflang bog'lanishi
const entry = (path: string, changeFrequency: Freq, priority: number, lastModified = new Date()) =>
  routing.locales.map((locale) => ({
    url: `${config.site}${localizedPath(locale, path)}`,
    lastModified,
    changeFrequency,
    priority: locale === routing.defaultLocale ? priority : Math.max(0.1, priority - 0.1),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${config.site}${localizedPath(l, path)}`])
      ),
    },
  }));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    ...entry("/", "monthly", 1),
    ...entry("/about", "monthly", 0.9),
    ...entry("/resume", "monthly", 0.9),
    ...entry("/projects", "monthly", 0.9),
    ...entry("/services", "monthly", 0.9),
    ...entry("/blog", "daily", 0.8),
    ...entry("/contact", "yearly", 0.6),
  ];

  const projectPages = projects.flatMap((p) => entry(`/projects/${p.id}`, "monthly", 0.7));

  const posts = await getAllPosts().catch(() => []);
  const postPages = posts.flatMap((post) =>
    entry(
      `/blog/${post.id}`,
      "monthly",
      0.5,
      post.publishedAt ? new Date(post.publishedAt) : new Date()
    )
  );

  return [...pages, ...projectPages, ...postPages];
}
