import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { alternatesFor } from "@/i18n/helpers";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  UserRound,
} from "lucide-react";
import { FaTelegram, FaYoutube } from "react-icons/fa6";
import { getPostsPage } from "@/lib/itc-blog";
import { getTelegramPosts, TELEGRAM_CHANNEL } from "@/lib/telegram-channel";
import { getYoutubeVideos, hasYoutubeKey } from "@/lib/youtube";
import { formatDate, cn } from "@/lib/utils";
import { config } from "@/data/config";
import VideoGrid from "@/components/blog/video-grid";

export const revalidate = 1800;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: `${t("metaTitle")} | Husan Suyunov`,
    description: t("metaDescription"),
    alternates: alternatesFor(locale, "/blog"),
  };
}

type Tab = "articles" | "videos" | "telegram";

const Empty = ({ text }: { text: string }) => (
  <div className="flex justify-center items-center h-[40vh]">
    <h2 className="text-2xl text-center">{text}</h2>
  </div>
);

const PER_PAGE = 9;

const pageHref = (n: number) => (n <= 1 ? "/blog" : `/blog?page=${n}`);

// 1 … 4 5 [6] 7 8 … 12
const pageNumbers = (current: number, total: number): (number | "…")[] => {
  const set = new Set([1, total, current - 1, current, current + 1]);
  const nums = Array.from(set)
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1] > 1) out.push("…");
    out.push(n);
  });
  return out;
};

const Pagination = async ({ page, totalPages }: { page: number; totalPages: number }) => {
  if (totalPages <= 1) return null;
  const t = await getTranslations("blog");
  const base =
    "flex items-center justify-center min-w-10 h-10 px-3 rounded-md border-[.5px] text-sm transition-colors";
  return (
    <nav
      aria-label={t("pages")}
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
    >
      {page > 1 ? (
        <Link
          href={pageHref(page - 1)}
          className={`${base} border-zinc-600 hover:border-zinc-400`}
          aria-label={t("prevPage")}
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
      ) : (
        <span className={`${base} border-zinc-800 text-zinc-700`} aria-hidden>
          <ChevronLeft className="w-4 h-4" />
        </span>
      )}

      {pageNumbers(page, totalPages).map((n, i) =>
        n === "…" ? (
          <span key={`gap-${i}`} className="px-1 text-zinc-500">
            …
          </span>
        ) : n === page ? (
          <span
            key={n}
            aria-current="page"
            className={`${base} border-zinc-200 bg-zinc-200 text-black`}
          >
            {n}
          </span>
        ) : (
          <Link
            key={n}
            href={pageHref(n)}
            className={`${base} border-zinc-600 hover:border-zinc-400`}
          >
            {n}
          </Link>
        )
      )}

      {page < totalPages ? (
        <Link
          href={pageHref(page + 1)}
          className={`${base} border-zinc-600 hover:border-zinc-400`}
          aria-label={t("nextPage")}
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className={`${base} border-zinc-800 text-zinc-700`} aria-hidden>
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  );
};

const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

async function Page({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { page?: string | string[]; tab?: string | string[] };
}) {
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const showVideos = hasYoutubeKey();
  const rawTab = first(searchParams.tab);
  const tab: Tab =
    rawTab === "telegram" ? "telegram" : rawTab === "videos" && showVideos ? "videos" : "articles";

  const tabs: { id: Tab; label: string; href: string }[] = [
    { id: "articles", label: t("tabArticles"), href: "/blog" },
    ...(showVideos ? [{ id: "videos" as Tab, label: t("tabVideos"), href: "/blog?tab=videos" }] : []),
    { id: "telegram", label: t("tabTelegram"), href: "/blog?tab=telegram" },
  ];

  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[150px] text-zinc-300 pb-20">
      <div className="mt-[100px] mb-8">
        <h1 className="text-4xl">{t("title")}</h1>
        <p className="mt-2 text-sm text-zinc-500">{t("intro")}</p>
        {t("uzOnly") && <p className="mt-1 text-xs text-zinc-600">{t("uzOnly")}</p>}
      </div>
      <nav aria-label={t("tabsLabel")} className="mb-10 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <Link
            key={t.id}
            href={t.href}
            aria-current={t.id === tab ? "page" : undefined}
            className={cn(
              "px-4 py-2 rounded-md border-[.5px] text-sm transition-colors",
              t.id === tab
                ? "border-zinc-200 bg-zinc-200 text-black"
                : "border-zinc-600 hover:border-zinc-400"
            )}
          >
            {t.label}
          </Link>
        ))}
      </nav>
      {tab === "articles" && <ArticlesTab page={Number(first(searchParams.page)) || 1} />}
      {tab === "videos" && <VideosTab />}
      {tab === "telegram" && <TelegramTab />}
    </div>
  );
}

async function VideosTab() {
  const t = await getTranslations("blog");
  const videos = await getYoutubeVideos(12);
  if (videos.length === 0) return <Empty text={t("emptyVideos")} />;
  return (
    <>
      <VideoGrid videos={videos.map((v) => ({ ...v, date: formatDate(v.publishedAt) }))} />
      <div className="mt-10 flex justify-center">
        <a
          href={config.social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border-[.5px] border-zinc-600 hover:border-zinc-400 text-sm transition-colors"
        >
          <FaYoutube className="text-red-500" /> {t("subscribeYoutube")}
        </a>
      </div>
    </>
  );
}

async function TelegramTab() {
  const t = await getTranslations("blog");
  const posts = await getTelegramPosts(12);
  if (posts.length === 0) return <Empty text={t("emptyTelegram")} />;
  return (
    <>
      <ul className="columns-1 md:columns-2 lg:columns-3 gap-6 [&>li]:mb-6">
        {posts.map((post) => (
          <li
            key={post.id}
            className="break-inside-avoid border-[.5px] rounded-md border-zinc-600 overflow-hidden hover:border-zinc-400 transition-colors"
            style={{ backdropFilter: "blur(2px)" }}
          >
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="block">
              {post.image && (
                <div className="relative aspect-[4/3] bg-zinc-900">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                {post.forwardedFrom && (
                  <p className="mb-2 text-xs text-sky-400">↪ {post.forwardedFrom}</p>
                )}
                {post.text && (
                  <p className="text-sm text-zinc-300 whitespace-pre-line line-clamp-[10]">
                    {post.text}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {formatDate(post.date)}
                  </span>
                  {post.views && (
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {post.views}
                    </span>
                  )}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center">
        <a
          href={`https://t.me/${TELEGRAM_CHANNEL}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border-[.5px] border-zinc-600 hover:border-zinc-400 text-sm transition-colors"
        >
          <FaTelegram className="text-sky-400" /> {t("subscribeTelegram")}
        </a>
      </div>
    </>
  );
}

async function ArticlesTab({ page: requested }: { page: number }) {
  const t = await getTranslations("blog");
  const { posts, page, totalPages, total } = await getPostsPage(requested, PER_PAGE);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-500">
        <span>{total > 0 && t("total", { count: total })}</span>
        <a
          href="https://itc-academy.uz/blog/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-zinc-200 transition-colors"
        >
          itc-academy.uz/blog
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {posts.length === 0 ? (
        <div className="flex justify-center items-center h-[40vh]">
          <h2 className="text-2xl text-center">{t("emptyArticles")}</h2>
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const date = formatDate(post.publishedAt);
              return (
                <li
                  key={post.id}
                  className="group border-[.5px] rounded-md border-zinc-600 overflow-hidden hover:border-zinc-400 transition-colors"
                  style={{ backdropFilter: "blur(2px)" }}
                >
                  <Link href={`/blog/${post.id}`} className="flex flex-col h-full">
                    <div className="relative h-[200px] bg-zinc-900 overflow-hidden">
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                        />
                      )}
                      {post.category && (
                        <span className="absolute top-3 left-3 text-xs bg-white text-black rounded-lg px-2 py-0.5">
                          {post.category}
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h2 className="text-lg leading-snug line-clamp-3">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-2 text-xs text-zinc-500 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-auto pt-4 flex items-center justify-between text-xs text-zinc-500">
                        <div className="flex items-center gap-3">
                          {date && (
                            <span className="flex items-center gap-1">
                              <CalendarDays className="w-3.5 h-3.5" />
                              {date}
                            </span>
                          )}
                          {post.author && (
                            <span className="flex items-center gap-1">
                              <UserRound className="w-3.5 h-3.5" />
                              {post.author}
                            </span>
                          )}
                        </div>
                        <span className="flex items-center gap-1 text-zinc-300">
                          {t("read")}
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Pagination page={page} totalPages={totalPages} />
        </>
      )}
    </div>
  );
}

export default Page;
