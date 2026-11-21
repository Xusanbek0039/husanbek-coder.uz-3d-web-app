import "server-only";
import sanitizeHtml from "sanitize-html";
import { decodeEntities } from "./html";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  image: string | null;
  url: string;
  publishedAt: string | null;
  category: string | null;
  author: string | null;
  likes: number | null;
  comments: number | null;
};

export type BlogPostDetail = BlogPost & { html: string };

export type BlogPerson = { name: string; initials: string; photo: string | null };

export type BlogComment = {
  id: string;
  author: BlogPerson;
  text: string;
  createdAt: string | null;
  /** API bo'lmasa — itc-academy.uz sahifasidagi "3 kun oldin" matni */
  timeAgo: string | null;
  likes: number | null;
};

export type BlogEngagement = {
  likesCount: number;
  /** null — ro'yxat mavjud emas (ITC_ACADEMY_API_KEY sozlanmagan yoki API ishlamadi) */
  likers: BlogPerson[] | null;
  commentsCount: number;
  comments: BlogComment[];
};

export type BlogPage = {
  posts: BlogPost[];
  page: number;
  totalPages: number;
  total: number;
};

const SITE = "https://itc-academy.uz";
const MEDIA_HOST = new URL(SITE).hostname;
const MAX_POSTS = 200;
const MAX_COMMENTS = 300;
const SLUG_RE = /^[A-Za-z0-9_-]{1,64}$/;

export const ITC_BLOG_TAG = "itc-blog";

// Yangi post, like va izohlar ko'pi bilan 5 daqiqada ko'rinadi.
// Darhol yangilash: POST /api/revalidate/blog (docs/itc-academy-blog-api.md)
const cacheOpts = { next: { revalidate: 300, tags: [ITC_BLOG_TAG] } };

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

const toCount = (v: unknown) => {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : null;
};

// Faqat itc-academy.uz/media/ dagi rasmlar — next/image boshqa hostda xato beradi
const mediaUrl = (u: unknown) => {
  const abs = typeof u === "string" ? absolute(u) : null;
  if (!abs) return null;
  const url = new URL(abs);
  return url.hostname === MEDIA_HOST && url.pathname.startsWith("/media/") ? abs : null;
};

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "?";

const toPerson = (p: Record<string, any> | null | undefined): BlogPerson => {
  const name = String(p?.name ?? "").trim() || "ITC o'quvchisi";
  return {
    name,
    initials: String(p?.initials ?? "").trim() || initialsOf(name),
    photo: mediaUrl(p?.photo),
  };
};

export const sanitizePostHtml = (html: string) =>
  sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "hr", "blockquote", "pre", "code", "span", "div",
      "h2", "h3", "h4", "h5", "h6", "strong", "b", "em", "i", "u", "s", "mark", "sub", "sup",
      "ul", "ol", "li", "a", "img", "figure", "figcaption",
      "table", "thead", "tbody", "tr", "th", "td",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
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
    likes: toCount(pick(p, ["likes_count", "likes"])),
    comments: toCount(pick(p, ["comments_count", "comments"])),
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
      likes: null,
      comments: null,
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
        post.likes = meta.likes;
        post.comments = meta.comments;
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
    ...parseCounts(html),
  };
}

// <a class="pd-like-btn ..."> 25 like </a> va <span class="pd-cmt-badge">3</span>
function parseCounts(html: string) {
  const likeBtn = html.match(/class="pd-like-btn[^"]*">([\s\S]{0,300}?)<\/a>/)?.[1] ?? "";
  return {
    likes: toCount(likeBtn.match(/(\d+)\s*like/i)?.[1]),
    comments: toCount(html.match(/<span class="pd-cmt-badge">\s*(\d+)\s*<\/span>/)?.[1]),
  };
}

function commentsFromHtml(html: string): BlogComment[] {
  const list = html.split('<div class="pd-cmt-list">')[1] ?? "";
  const field = (block: string, re: RegExp) =>
    decodeEntities(block.match(re)?.[1] ?? "").trim();

  return list
    .split('<div class="pd-cmt-item">')
    .slice(1, MAX_COMMENTS + 1)
    .map((block, i) => ({
      id: `c${i}`,
      author: toPerson({
        name: field(block, /<span class="pd-cmt-name">([\s\S]*?)<\/span>/),
        photo: block.match(/<img src="([^"]+)" class="pd-cmt-ava"/)?.[1],
      }),
      text: field(block, /<p class="pd-cmt-text"[^>]*>([\s\S]*?)<\/p>/),
      createdAt: null,
      timeAgo:
        field(block, /<span class="pd-cmt-time">([\s\S]*?)<\/span>/)
          .replace(/\s+/g, " ")
          .replace(/,(?=\S)/g, ", ") || null,
      likes: null,
    }))
    .filter((c) => c.text);
}

function engagementFromApi(d: Record<string, any>): BlogEngagement {
  const likers: BlogPerson[] = Array.isArray(d.likers) ? d.likers.map(toPerson) : [];
  const comments: BlogComment[] = Array.isArray(d.comments)
    ? d.comments.slice(0, MAX_COMMENTS).map((c: Record<string, any>, i: number) => ({
        id: String(c.id ?? i),
        author: toPerson(c.author),
        text: String(c.text ?? "").trim(),
        createdAt: typeof c.created_at === "string" ? c.created_at : null,
        timeAgo: null,
        likes: toCount(c.likes),
      }))
    : [];
  return {
    likesCount: toCount(d.likes_count) ?? likers.length,
    likers,
    commentsCount: toCount(d.comments_count) ?? comments.length,
    comments: comments.filter((c) => c.text),
  };
}

/**
 * Post tagidagi like va izohlar.
 * 1. ITC_ACADEMY_API_KEY bo'lsa — itc-academy.uz API: like bosganlar ro'yxati ham keladi.
 * 2. Aks holda — post sahifasidan: like soni va izohlar (kim like bosgani ko'rinmaydi).
 */
export async function getEngagement(slug: string): Promise<BlogEngagement | null> {
  if (!SLUG_RE.test(slug)) return null;

  const key = process.env.ITC_ACADEMY_API_KEY;
  if (key) {
    try {
      const res = await fetch(`${SITE}/api/public/blog/posts/${slug}/engagement/`, {
        headers: apiHeaders(key),
        ...cacheOpts,
      });
      if (res.ok) return engagementFromApi(await res.json());
      console.error(`[itc-blog] engagement API ${res.status}, sahifadan olinmoqda`);
    } catch (e) {
      console.error("[itc-blog] engagement API xatosi, sahifadan olinmoqda:", e);
    }
  }

  try {
    const html = await fetchPostHtml(slug);
    if (!html) return null;
    const counts = parseCounts(html);
    const comments = commentsFromHtml(html);
    return {
      likesCount: counts.likes ?? 0,
      likers: null,
      commentsCount: counts.comments ?? comments.length,
      comments,
    };
  } catch (e) {
    console.error("[itc-blog] like/izohlarni olib bo'lmadi:", e);
    return null;
  }
}

export async function getPost(slug: string): Promise<BlogPostDetail | null> {
  if (!SLUG_RE.test(slug)) return null;

  const api = apiConfig();
  if (api) {
    try {
      const res = await fetch(`${api.url}${slug}/`, {
        headers: apiHeaders(api.key),
        ...cacheOpts,
      });
      if (res.ok) {
        const data = await res.json();
        const content = pick(data, ["content", "body", "html", "text"]);
        if (content) {
          return { ...fromApiItem(data, 0), id: slug, html: sanitizePostHtml(String(content)) };
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

  return { ...meta, html: sanitizePostHtml(body) };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return (await getIndex()).posts;
}
