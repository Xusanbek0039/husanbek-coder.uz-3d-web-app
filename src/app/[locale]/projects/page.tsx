import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ChevronRight } from "lucide-react";
import projects from "@/data/projects";
import { localizeProject } from "@/data/projects-i18n";
import { Link } from "@/i18n/navigation";
import { alternatesFor } from "@/i18n/helpers";

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  return {
    title: `${t("metaTitle")} | Husan Suyunov`,
    description: t("metaDescription"),
    alternates: alternatesFor(locale, "/projects"),
  };
}

async function Page({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations("projectsPage");
  const list = projects.map((p) => localizeProject(p, locale));

  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[150px] text-zinc-300 pb-20">
      <h1 className="text-4xl mt-[100px] mb-3">{t("title")}</h1>
      <p className="mb-[50px] text-sm text-zinc-500">{t("subtitle")}</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((project, i) => (
          <li
            key={project.id}
            className="group border-[.5px] rounded-md border-zinc-600 overflow-hidden hover:border-zinc-400 transition-colors"
            style={{ backdropFilter: "blur(2px)" }}
          >
            <Link href={`/projects/${project.id}`} className="flex flex-col h-full">
              <div className="relative aspect-[3/2] bg-zinc-900 overflow-hidden">
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  priority={i < 3}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-xs bg-white text-black rounded-lg px-2 py-0.5">
                  {project.category}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg leading-snug">{project.title}</h2>
                <p className="mt-2 text-xs text-zinc-500 line-clamp-3">{project.description}</p>
                <span className="mt-auto pt-4 flex items-center gap-1 text-xs text-zinc-300">
                  {t("details")}
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page;
