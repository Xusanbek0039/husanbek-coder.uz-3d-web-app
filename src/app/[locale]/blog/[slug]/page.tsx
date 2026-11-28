import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { alternatesFor } from "@/i18n/helpers";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, UserRound } from "lucide-react";
import { getEngagement, getPost } from "@/lib/itc-blog";
import { formatDate } from "@/lib/utils";
import { config } from "@/data/config";
import PostEngagement from "@/components/blog/post-engagement";
import PostMedia from "@/components/blog/post-media";

export const revalidate = 300;

type Props = { params: { slug: string; locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) {
    const t = await getTranslations({ locale: params.locale, namespace: "blog" });
    return { title: `${t("postNotFound")} | Husan Suyunov` };
  }
  const url = `${config.site}/blog/${post.id}`;
  return {
    title: `${post.title} | Husan Suyunov`,
    description: post.excerpt,
    alternates: alternatesFor(params.locale, `/blog/${post.id}`),
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      images: post.image ? [{ url: post.image }] : undefined,
      publishedTime: post.publishedAt ?? undefined,
      authors: post.author ? [post.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

async function Page({ params }: Props) {
  setRequestLocale(params.locale);
  const t = await getTranslations("blog");
  const [post, engagement] = await Promise.all([
    getPost(params.slug),
    getEngagement(params.slug),
  ]);
  if (!post) notFound();

  const date = formatDate(post.publishedAt);

  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[150px] text-zinc-300 pb-20">
      <article className="max-w-3xl mx-auto mt-[100px]">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("allPosts")}
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
            {post.category && (
              <span className="bg-white text-black rounded-lg px-2 py-0.5">
                {post.category}
              </span>
            )}
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
          <h1 className="mt-4 text-3xl md:text-4xl leading-tight text-zinc-100">
            {post.title}
          </h1>
        </header>

        <PostMedia
          title={post.title}
          images={post.images}
          video={post.video}
          imageAlt={(n) => t("imageAlt", { title: post.title, n })}
        />

        {t("uzOnly") && <p className="mt-6 text-xs text-zinc-500">{t("uzOnly")}</p>}
        {post.html ? (
          <div
            lang="uz"
            className="blog-content mt-10 p-6 md:p-10 border-[.5px] rounded-md border-zinc-600"
            style={{ backdropFilter: "blur(2px)" }}
            // HTML server tomonda sanitize-html bilan tozalangan (src/lib/itc-blog.ts)
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        ) : (
          <div
            lang="uz"
            className="blog-content mt-10 p-6 md:p-10 border-[.5px] rounded-md border-zinc-600"
            style={{ backdropFilter: "blur(2px)" }}
          >
            <p>{post.excerpt}</p>
          </div>
        )}

        {engagement && <PostEngagement data={engagement} />}

        <footer className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("allPosts")}
          </Link>
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-md border-[.5px] border-zinc-600 hover:border-zinc-400 transition-colors"
          >
            {t("commentsOn")}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </footer>
      </article>
    </div>
  );
}

export default Page;
