import "server-only";
import sanitizeHtml from "sanitize-html";

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

export type BlogPostDetail = BlogPost & { html: string };

export type BlogPage = {
  posts: BlogPost[];
  page: number;
  totalPages: number;
  total: number;
};

const SITE = "https://itc-academy.uz";
const REVALIDATE_SECONDS = 1800;
const MAX_POSTS = 200;
const SLUG_RE = /^[A-Za-z0-9_-]{1,64}$/;

const cacheOpts = { next: { revalidate: REVALIDATE_SECONDS, tags: ["itc-blog"] } };

const apiConfig = () => {
  const url = process.env.ITC_ACADEMY_API_URL;
  const key = process.env.ITC_ACADEMY_API_KEY;
  return url && key ? { url: url.endsWith("/") ? url : `${url}/`, key } : null;
};

const apiHeaders = (key: string) => ({
  Accept: "application/json",
  "X-API-Key": key,
  Authorization: `Api-Key ${key}`,
});

const decodeEntities = (s: string) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");

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

const stripSiteSuffix = (title: string) =>
  title.replace(/\s+[—-]\s+IT Creative Academy\s*$/, "").trim();

export const sanitizePostHtml = (html: string) =>
  sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "hr", "blockquote", "pre", "code", "span", "div",
      "h2", "h3", "h4", "h5", "h6", "strong", "b", "em", "i", "u", "s", "mark", "sub", "sup",
      "ul", "ol", "li", "a", "img", "figure", "figcaption",
      "table", "thead", "tbody", "tr", "th", "td",
    ],
    allowedAttributes: {
      a: ["href", "title"],
      img: ["src", "alt", "title", "width", "height"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      h1: "h2",
      a: (tagName, attribs) => {
        const href = absolute(attribs.href) ?? "#";
        return {
          tagName,
          attribs: { ...attribs, href, target: "_blank", rel: "noopener noreferrer nofollow" },
        };
      },
      img: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, src: absolute(attribs.src) ?? "", loading: "lazy" },
      }),
    },
    allowedSchemesAppliedToAttributes: ["href", "src"],
    exclusiveFilter: (frame) =>
      (frame.tag === "img" && !frame.attribs.src) ||
      (["p", "blockquote"].includes(frame.tag) && !frame.text.trim() && !frame.mediaChildren.length),
  });

// sanitize-html "target"/"rel"/"loading" ni allowedAttributes'dan keyin ham saqlashi uchun
const withLinkAttrs = (html: string) =>
  sanitizeHtml(html, {
    allowedTags: false,
    allowedAttributes: false,
  });

// ================= Ro'yxat =================

const fromApiItem = (p: Record<string, any>, i: number): BlogPost => {
  const slug = pick(p, ["slug", "uid", "code", "id"]);
  const category = pick(p, ["category", "category_name", "type"]);
  const author = pick(p, ["author", "author_name"]);
  return {
    id: String(slug ?? i),
    title: decodeEntities(String(pick(p, ["title", "name"]) ?? "")),
    excerpt: decodeEntities(
      String(pick(p, ["excerpt", "summary", "short_description", "description"]) ?? "")
    ),
    image: absolute(pick(p, ["image", "image_url", "cover", "thumbnail", "photo"])),
    url: absolute(pick(p, ["url", "link", "absolute_url"])) ?? `${SITE}/blog/${slug ?? ""}/`,
    publishedAt: pick(p, ["published_at", "created_at", "date", "created"]),
    category: typeof category === "object" && category ? category.name ?? null : category,
    author:
      typeof author === "object" && author ? author.full_name ?? author.name ?? null : author,
  };
};

async function indexFromApi(api: { url: string; key: string }): Promise<BlogPost[]> {
  const res = await fetch(api.url, { headers: apiHeaders(api.key), ...cacheOpts });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json();
  const list: any[] = Array.isArray(data) ? data : data.results ?? data.posts ?? data.data ?? [];
  return list.slice(0, MAX_POSTS).map(fromApiItem);
}

async function indexFromSitemap(): Promise<BlogPost[]> {
  const res = await fetch(`${SITE}/sitemap.xml`, cacheOpts);
  if (!res.ok) throw new Error(`sitemap ${res.status}`);
  const xml = await res.text();

  return Array.from(xml.matchAll(/<url>([\s\S]*?)<\/url>/g))
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
    .filter((e) => /\/blog\/[A-Za-z0-9_-]+\/$/.test(e.loc))
    .sort((a, b) => (b.lastmod ?? "").localeCompare(a.lastmod ?? ""))
    .slice(0, MAX_POSTS)
    .map<BlogPost>((e) => ({
      id: e.loc.split("/").filter(Boolean).pop() ?? e.loc,
      title: decodeEntities(e.title ?? "").trim(),
      excerpt: "",
      image: e.image,
      url: e.loc,
      publishedAt: e.lastmod,
      category: null,
      author: null,
    }))
    .filter((p) => p.title);
}

async function getIndex(): Promise<{ posts: BlogPost[]; source: "api" | "sitemap" }> {
  const api = apiConfig();
  if (api) {
    try {
      return { posts: await indexFromApi(api), source: "api" };
    } catch (e) {
      console.error("[itc-blog] API xatosi, sitemap'ga o'tilmoqda:", e);
    }
  }
  try {
    return { posts: await indexFromSitemap(), source: "sitemap" };
  } catch (e) {
    console.error("[itc-blog] sitemap xatosi:", e);
    return { posts: [], source: "sitemap" };
  }
}

export async function getPostsPage(page: number, perPage = 9): Promise<BlogPage> {
  const { posts, source } = await getIndex();
  const total = posts.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, Math.floor(page) || 1), totalPages);
  const slice = posts.slice((current - 1) * perPage, current * perPage).map((p) => ({ ...p }));

  // Sitemap rejimida faqat joriy sahifadagi postlar uchun tavsif va muallifni olamiz
  if (source === "sitemap") {
    await Promise.all(
      slice.map(async (post) => {
        const meta = await fetchPostMeta(post.id).catch(() => null);
        if (!meta) return;
        post.excerpt = meta.excerpt || post.excerpt;
        post.author = meta.author;
        post.category = meta.category;
        post.publishedAt = meta.publishedAt ?? post.publishedAt;
        post.image = meta.image ?? post.image;
      })
    );
  }

  return { posts: slice, page: current, totalPages, total };
}

// ================= Bitta post =================

const metaTag = (html: string, prop: string) => {
  const v = html.match(new RegExp(`<meta (?:property|name)="${prop}" content="([^"]*)"`))?.[1];
  return v ? decodeEntities(v) : null;
};

async function fetchPostHtml(slug: string) {
  const res = await fetch(`${SITE}/blog/${slug}/`, cacheOpts);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`post ${res.status}`);
  return res.text();
}

async function fetchPostMeta(slug: string) {
  if (!SLUG_RE.test(slug)) return null;
  const html = await fetchPostHtml(slug);
  if (!html) return null;
  return parsePostMeta(slug, html);
}

function parsePostMeta(slug: string, html: string): BlogPost {
  const badge = html.match(/<span class="pd-type-badge[^"]*">([\s\S]*?)<\/span>/)?.[1];
  const category = badge ? decodeEntities(badge.replace(/<[^>]+>/g, "")).trim() || null : null;
  return {
    id: slug,
    title: stripSiteSuffix(metaTag(html, "og:title") ?? ""),
    excerpt: metaTag(html, "og:description") ?? metaTag(html, "description") ?? "",
    image: absolute(metaTag(html, "og:image")),
    url: `${SITE}/blog/${slug}/`,
    publishedAt: metaTag(html, "article:published_time"),
    category,
    author: metaTag(html, "article:author"),
  };
}

export async function getPost(slug: string): Promise<BlogPostDetail | null> {
  if (!SLUG_RE.test(slug)) return null;

  const api = apiConfig();
  if (api) {
    try {
      const res = await fetch(`${api.url}${slug}/`, { headers: apiHeaders(api.key), ...cacheOpts });
      if (res.ok) {
        const data = await res.json();
        const content = pick(data, ["content", "body", "html", "text"]);
        if (content) {
          return { ...fromApiItem(data, 0), id: slug, html: withLinkAttrs(sanitizePostHtml(String(content))) };
        }
      }
    } catch (e) {
      console.error("[itc-blog] API post xatosi, sahifadan olinmoqda:", e);
    }
  }

  const html = await fetchPostHtml(slug);
  if (!html) return null;
  const meta = parsePostMeta(slug, html);
  if (!meta.title) return null;

  const body =
    html.match(/<div class="pd-body"[^>]*>([\s\S]*?)<\/div>\s*<!--\s*Actions\s*-->/)?.[1] ??
    html.match(/<div class="pd-body"[^>]*>([\s\S]*?)<\/div>/)?.[1] ??
    "";

  return { ...meta, html: withLinkAttrs(sanitizePostHtml(body)) };
}
