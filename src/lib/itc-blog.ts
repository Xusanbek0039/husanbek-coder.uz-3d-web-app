import "server-only";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  image: string | null;
  url: string;
  publishedAt: string | null;
  category: string | null;
  author: string | null;
};

export type BlogResult = {
  posts: BlogPost[];
  source: "api" | "sitemap";
  error?: string;
};

const SITE = "https://itc-academy.uz";
const REVALIDATE_SECONDS = 1800;
const MAX_POSTS = 24;
const EXCERPT_FETCH_LIMIT = 12;

const decodeEntities = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const absolute = (u: string | null | undefined) => {
  if (!u) return null;
  try {
    return new URL(u, SITE).toString();
  } catch {
    return null;
  }
};

const pick = (obj: Record<string, any>, keys: string[]) => {
  for (const k of keys) {
    if (obj?.[k] !== undefined && obj[k] !== null && obj[k] !== "") return obj[k];
  }
  return null;
};

// ---------- 1) Asosiy yo'l: itc-academy.uz API (API kalit bilan) ----------
async function fetchFromApi(apiUrl: string, apiKey: string): Promise<BlogPost[]> {
  const res = await fetch(apiUrl, {
    headers: {
      Accept: "application/json",
      "X-API-Key": apiKey,
      Authorization: `Api-Key ${apiKey}`,
    },
    next: { revalidate: REVALIDATE_SECONDS, tags: ["itc-blog"] },
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json();
  const list: any[] = Array.isArray(data) ? data : data.results ?? data.posts ?? data.data ?? [];

  return list.slice(0, MAX_POSTS).map((p, i) => {
    const slug = pick(p, ["slug", "uid", "code", "id"]);
    const url = absolute(pick(p, ["url", "link", "absolute_url"])) ?? `${SITE}/blog/${slug ?? ""}/`;
    const category = pick(p, ["category", "category_name", "type"]);
    const author = pick(p, ["author", "author_name"]);
    return {
      id: String(slug ?? i),
      title: decodeEntities(String(pick(p, ["title", "name"]) ?? "")),
      excerpt: decodeEntities(String(pick(p, ["excerpt", "summary", "short_description", "description"]) ?? "")),
      image: absolute(pick(p, ["image", "image_url", "cover", "thumbnail", "photo"])),
      url,
      publishedAt: pick(p, ["published_at", "created_at", "date", "created"]),
      category: typeof category === "object" && category ? category.name ?? null : category,
      author: typeof author === "object" && author ? author.full_name ?? author.name ?? null : author,
    };
  });
}

// ---------- 2) Zaxira yo'l: ochiq sitemap.xml + post meta-teglari ----------
async function fetchFromSitemap(): Promise<BlogPost[]> {
  const res = await fetch(`${SITE}/sitemap.xml`, {
    next: { revalidate: REVALIDATE_SECONDS, tags: ["itc-blog"] },
  });
  if (!res.ok) throw new Error(`sitemap ${res.status}`);
  const xml = await res.text();

  const entries = Array.from(xml.matchAll(/<url>([\s\S]*?)<\/url>/g))
    .map((m) => m[1])
    .map((block) => {
      const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? "";
      return {
        loc,
        lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? null,
        image: block.match(/<image:loc>([^<]+)<\/image:loc>/)?.[1] ?? null,
        title: block.match(/<image:title>([\s\S]*?)<\/image:title>/)?.[1] ?? null,
      };
    })
    .filter((e) => /\/blog\/[^/]+\/$/.test(e.loc))
    .sort((a, b) => (b.lastmod ?? "").localeCompare(a.lastmod ?? ""))
    .slice(0, MAX_POSTS);

  const posts = entries.map<BlogPost>((e) => ({
    id: e.loc.split("/").filter(Boolean).pop() ?? e.loc,
    title: decodeEntities(e.title ?? ""),
    excerpt: "",
    image: e.image,
    url: e.loc,
    publishedAt: e.lastmod,
    category: null,
    author: null,
  }));

  // Eng so'nggi postlar uchun qisqa tavsif va aniq sanani meta-teglardan olamiz
  await Promise.all(
    posts.slice(0, EXCERPT_FETCH_LIMIT).map(async (post) => {
      try {
        const r = await fetch(post.url, {
          next: { revalidate: REVALIDATE_SECONDS, tags: ["itc-blog"] },
        });
        if (!r.ok) return;
        const html = await r.text();
        const meta = (prop: string) =>
          html.match(new RegExp(`<meta (?:property|name)="${prop}" content="([^"]*)"`))?.[1] ?? null;
        const desc = meta("og:description") ?? meta("description");
        if (desc) post.excerpt = decodeEntities(desc);
        post.publishedAt = meta("article:published_time") ?? post.publishedAt;
        post.author = meta("article:author");
        post.image = meta("og:image") ?? post.image;
      } catch {
        /* tavsifsiz qoldiramiz */
      }
    })
  );

  return posts.filter((p) => p.title);
}

export async function getItcPosts(): Promise<BlogResult> {
  const apiUrl = process.env.ITC_ACADEMY_API_URL;
  const apiKey = process.env.ITC_ACADEMY_API_KEY;

  if (apiUrl && apiKey) {
    try {
      return { posts: await fetchFromApi(apiUrl, apiKey), source: "api" };
    } catch (e) {
      console.error("[itc-blog] API xatosi, sitemap'ga o'tilmoqda:", e);
    }
  }
  try {
    return { posts: await fetchFromSitemap(), source: "sitemap" };
  } catch (e) {
    return { posts: [], source: "sitemap", error: String(e) };
  }
}
