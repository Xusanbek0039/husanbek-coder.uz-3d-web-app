import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Heart, MessageCircle } from "lucide-react";
import type { BlogComment, BlogEngagement, BlogPerson } from "@/lib/itc-blog";
import { cn, formatDate } from "@/lib/utils";

const AVATAR_STACK = 8;
const NAMED_LIKERS = 2;
const VISIBLE_COMMENTS = 20;

const card = "border-[.5px] rounded-md border-zinc-600";
const blur = { backdropFilter: "blur(2px)" };

function Avatar({
  person,
  size,
  className,
}: {
  person: BlogPerson;
  size: number;
  className?: string;
}) {
  const base = cn("shrink-0 rounded-full", className);
  if (person.photo) {
    return (
      <Image
        src={person.photo}
        alt=""
        width={size}
        height={size}
        className={cn(base, "object-cover bg-zinc-800")}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={cn(
        base,
        "flex items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-500 font-semibold text-white"
      )}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
    >
      {person.initials}
    </span>
  );
}

function CommentItem({ comment }: { comment: BlogComment }) {
  const when = formatDate(comment.createdAt) ?? comment.timeAgo;
  return (
    <li className="flex gap-3 px-5 md:px-6 py-4">
      <Avatar person={comment.author} size={36} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <span className="text-sm font-medium text-zinc-100">{comment.author.name}</span>
          {when && <span className="text-xs text-zinc-500">{when}</span>}
        </div>
        <p lang="uz" className="mt-1 text-sm text-zinc-300 whitespace-pre-line break-words">
          {comment.text}
        </p>
        {!!comment.likes && (
          <span className="mt-2 inline-flex items-center gap-1 text-xs text-zinc-500">
            <Heart className="w-3 h-3" />
            {comment.likes}
          </span>
        )}
      </div>
    </li>
  );
}

export default async function PostEngagement({ data }: { data: BlogEngagement }) {
  const t = await getTranslations("blog");
  const { likers, comments } = data;
  const named = likers?.slice(0, NAMED_LIKERS) ?? [];
  const others = data.likesCount - named.length;

  return (
    <section className="mt-10 space-y-6">
      <div className={cn(card, "p-5 md:p-6")} style={blur}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span className="flex items-center gap-2 text-zinc-100">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              {t("likesCount", { count: data.likesCount })}
            </span>
            <a
              href="#comments"
              className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {t("commentsCount", { count: data.commentsCount })}
            </a>
          </div>
          <span className="text-xs text-zinc-500">{t("engagementFrom")}</span>
        </div>

        {likers && likers.length > 0 && (
          <div className="mt-5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex -space-x-2">
                {likers.slice(0, AVATAR_STACK).map((p, i) => (
                  <Avatar key={i} person={p} size={32} className="ring-2 ring-zinc-950" />
                ))}
              </div>
              <p className="text-sm text-zinc-400">
                <span className="sr-only">{t("likedBy")}: </span>
                <span className="text-zinc-200">{named.map((p) => p.name).join(", ")}</span>
                {others > 0 && <> {t("andMore", { count: others })}</>}
              </p>
            </div>

            {likers.length > NAMED_LIKERS && (
              <details className="mt-4">
                <summary className="w-fit cursor-pointer select-none text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
                  {t("likedBy")} — {t("showAllLikers")}
                </summary>
                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {likers.map((p, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-300 min-w-0">
                      <Avatar person={p} size={28} />
                      <span className="truncate">{p.name}</span>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        )}
      </div>

      <div id="comments" className={cn(card, "overflow-hidden scroll-mt-28")} style={blur}>
        <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b-[.5px] border-zinc-700">
          <h2 className="flex items-center gap-2 text-lg text-zinc-100">
            <MessageCircle className="w-5 h-5" />
            {t("commentsTitle")}
          </h2>
          <span className="min-w-7 rounded-full bg-zinc-200 px-2 py-0.5 text-center text-xs text-black">
            {data.commentsCount}
          </span>
        </div>

        {comments.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-zinc-500">{t("noComments")}</p>
        ) : (
          <>
            <ul className="divide-y-[.5px] divide-zinc-800">
              {comments.slice(0, VISIBLE_COMMENTS).map((c) => (
                <CommentItem key={c.id} comment={c} />
              ))}
            </ul>
            {comments.length > VISIBLE_COMMENTS && (
              <details className="border-t-[.5px] border-zinc-800">
                <summary className="cursor-pointer select-none px-5 md:px-6 py-4 text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
                  {t("moreComments", { count: comments.length - VISIBLE_COMMENTS })}
                </summary>
                <ul className="divide-y-[.5px] divide-zinc-800 border-t-[.5px] border-zinc-800">
                  {comments.slice(VISIBLE_COMMENTS).map((c) => (
                    <CommentItem key={c.id} comment={c} />
                  ))}
                </ul>
              </details>
            )}
          </>
        )}
      </div>
    </section>
  );
}
