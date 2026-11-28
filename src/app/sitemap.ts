import type { MetadataRoute } from "next";
import { config } from "@/data/config";
import projects, { projectLocales } from "@/data/projects";
import { routing, type Locale } from "@/i18n/routing";
import { localizedPath } from "@/i18n/helpers";

export const revalidate = 3600;

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

// Har bir sahifa uchun 3 ta tildagi URL va ular orasidagi hreflang bog'lanishi.
// lastModified berilmaydi: build vaqti har deploy'da hamma sahifani "yangilangan" qilib
// ko'rsatardi va Google sitemap'dagi sanalarga ishonmay qo'yardi.
const entry = (
  path: string,
  changeFrequency: Freq,
  priority: number,
  locales: readonly Locale[] = routing.locales
) =>
  locales.map((locale) => ({
    url: `${config.site}${localizedPath(locale, path)}`,
    changeFrequency,
    priority:
      locale === routing.defaultLocale ? priority : Math.max(0.1, Math.round(priority * 10 - 1) / 10),
    // hreflang faqat sahifa bir nechta tilda mavjud bo'lsa
    alternates:
      locales.length > 1
        ? {
            languages: Object.fromEntries(
              locales.map((l) => [l, `${config.site}${localizedPath(l, path)}`])
            ),
          }
        : undefined,
  }));

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    ...entry("/", "monthly", 1),
    ...entry("/about", "monthly", 0.9),
    ...entry("/resume", "monthly", 0.9),
    ...entry("/projects", "monthly", 0.9),
    ...entry("/services", "monthly", 0.9),
    ...entry("/blog", "daily", 0.8),
    ...entry("/contact", "yearly", 0.6),
  ];

  // Loyiha sahifasi faqat matni yozilgan tillarda (hozircha o'zbekcha)
  const projectPages = projects.flatMap((p) =>
    entry(`/projects/${p.id}`, "monthly", 0.7, projectLocales(p))
  );

  // Blog postlari sitemap'ga kirmaydi: ularning canonical'i itc-academy.uz dagi asl maqola
  return [...pages, ...projectPages];
}
