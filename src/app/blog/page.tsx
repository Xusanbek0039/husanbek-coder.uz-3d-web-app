import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, UserRound } from "lucide-react";
import { getItcPosts } from "@/lib/itc-blog";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Bloglar | Husan Suyunov",
  description:
    "IT dunyosi yangiliklari, darsliklar va maslahatlar — ITC Academy blogidan.",
};

const formatDate = (iso: string | null) => {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${d.getFullYear()}`;
};

async function Page() {
  const { posts } = await getItcPosts();

  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[150px] text-zinc-300 pb-20">
      <div className="mt-[100px] mb-[50px] flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-4xl">Bloglar</h1>
          <p className="mt-2 text-sm text-zinc-500">
            IT dunyosi yangiliklari, darsliklar va maslahatlar — men muallif
            bo&apos;lgan ITC Academy blogidan.
          </p>
        </div>
        <a
          href="https://itc-academy.uz/blog/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 w-fit text-sm px-4 py-2 rounded-md border-[.5px] border-zinc-600 hover:border-zinc-400 transition-colors"
        >
          Barcha postlar itc-academy.uz da
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {posts.length === 0 ? (
        <div className="flex justify-center items-center h-[40vh]">
          <h2 className="text-2xl text-center">
            Hozircha blog postlarini yuklab bo&apos;lmadi. Keyinroq qayta urinib
            ko&apos;ring!
          </h2>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const date = formatDate(post.publishedAt);
            return (
              <li
                key={post.id}
                className="group border-[.5px] rounded-md border-zinc-600 overflow-hidden hover:border-zinc-400 transition-colors"
                style={{ backdropFilter: "blur(2px)" }}
              >
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col h-full"
                >
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
                        O&apos;qish
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Page;
