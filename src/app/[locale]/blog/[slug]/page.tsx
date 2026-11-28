import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, UserRound } from "lucide-react";
import { getEngagement, getPost } from "@/lib/itc-blog";
import { formatDate } from "@/lib/utils";
import { config } from "@/data/config";
import PostEngagement from "@/components/blog/post-engagement";
import PostMedia from "@/components/blog/post-media";
import JsonLd from "@/components/seo/json-ld";
import { PERSON_ID, breadcrumbJsonLd, clampText } from "@/lib/seo";

export const revalidate = 300;

type Props = { params: { slug: string; locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) {
    const t = await getTranslations({ locale: params.locale, namespace: "blog" });
    return { title: t("postNotFound") };
  }
  const title = clampText(post.title, 60);
  const description = clampText(post.excerpt || post.title, 160);
  return {
    title,
    description,
    // Post itc-academy.uz dagi maqolaning nusxasi: Google'ga asl manba ko'rsatiladi,
    // takroriy kontent sifatida baholanmaydi (docs/seo.md)
    alternates: { canonical: post.url },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${config.site}/blog/${post.id}`,
      images: post.image ? [{ url: post.image }] : undefined,
      publishedTime: post.publishedAt ?? undefined,
      authors: post.author ? [post.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
  const tn = await getTranslations("nav");
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: clampText(post.title, 110),
      description: clampText(post.excerpt || post.title, 300),
      image: post.images.length ? post.images : undefined,
      datePublished: post.publishedAt ?? undefined,
      inLanguage: "uz",
      url: post.url,
      mainEntityOfPage: post.url,
      author: post.author ? { "@type": "Person", name: post.author } : { "@id": PERSON_ID },
      publisher: { "@type": "Organization", name: "IT Creative Academy", url: "https://itc-academy.uz/" },
    },
    breadcrumbJsonLd(params.locale, [
      { name: tn("home"), path: "/" },
      { name: tn("blog"), path: "/blog" },
      { name: clampText(post.title, 60), path: `/blog/${post.id}` },
    ]),
  ];

  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[150px] text-zinc-300 pb-20">
      <JsonLd data={jsonLd} />
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
          images={post.images}
          video={post.video}
          alts={post.images.map((_, i) =>
            post.images.length === 1 ? post.title : t("imageAlt", { title: post.title, n: i + 1 })
          )}
          labels={{
            open: t("galleryOpen"),
            close: t("galleryClose"),
            prev: t("galleryPrev"),
            next: t("galleryNext"),
          }}
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
