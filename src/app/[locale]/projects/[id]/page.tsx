import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, ArrowUpRight, Info } from "lucide-react";
import ProjectMeta from "@/components/projects/project-meta";
import { toCardData } from "@/components/projects/card-data";
import { FaGithub } from "react-icons/fa6";
import projects from "@/data/projects";
import { localizeProject } from "@/data/projects-i18n";
import { FloatingDock } from "@/components/ui/floating-dock";
import { config } from "@/data/config";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { alternatesFor } from "@/i18n/helpers";
import JsonLd from "@/components/seo/json-ld";
import { PERSON_ID, absoluteUrl, breadcrumbJsonLd, clampText } from "@/lib/seo";

type Props = { params: { locale: string; id: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map((p) => ({ locale, id: p.id })));
}

export async function generateMetadata({ params: { locale, id } }: Props): Promise<Metadata> {
  const base = projects.find((p) => p.id === id);
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  if (!base) return { title: `${t("notFound")} | Husan Suyunov` };
  const project = localizeProject(base, locale);
  const description = clampText(project.description, 160);
  return {
    title: `${project.title} | Husan Suyunov`,
    description,
    alternates: alternatesFor(locale, `/projects/${project.id}`),
    openGraph: {
      title: project.title,
      description,
      url: `${config.site}/projects/${project.id}`,
      images: [{ url: project.src }],
    },
  };
}

async function Page({ params: { locale, id } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations("projectsPage");
  const ts = await getTranslations("projectsSection");
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) notFound();
  const project = localizeProject(projects[index], locale);
  const prev = localizeProject(projects[(index - 1 + projects.length) % projects.length], locale);
  const next = localizeProject(projects[(index + 1) % projects.length], locale);
  const uzOnly = t("uzOnly");
  const tn = await getTranslations("nav");
  const card = toCardData(projects[index], locale, 20);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      genre: project.category,
      image: `${config.site}${project.src}`,
      url: absoluteUrl(locale, `/projects/${project.id}`),
      author: { "@id": PERSON_ID },
      keywords: card.tech.join(", "),
      dateCreated: project.year,
      creativeWorkStatus: project.status === "inProgress" ? "Draft" : "Published",
      sameAs: [project.live, project.github].filter(Boolean),
      inLanguage: locale,
    },
    breadcrumbJsonLd(locale, [
      { name: tn("home"), path: "/" },
      { name: tn("projects"), path: "/projects" },
      { name: project.title, path: `/projects/${project.id}` },
    ]),
  ];

  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[150px] text-zinc-300 pt-[100px] pb-20">
      <JsonLd data={jsonLd} />
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("all")}
      </Link>

      <header className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <span className="text-xs bg-white text-black rounded-lg px-2 py-0.5">{project.category}</span>
          <h1 className="mt-4 text-3xl md:text-5xl leading-tight text-zinc-100">{project.title}</h1>
          <p className="mt-4 text-zinc-400 leading-relaxed">{project.description}</p>
          <ProjectMeta
            project={{ ...toCardData(projects[index], locale, 8), live: undefined, github: undefined }}
            className="mt-4"
          />
          <div className="mt-6 flex flex-wrap gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-zinc-200 text-black text-sm hover:bg-white transition-colors"
              >
                {t("visit")}
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-md border-[.5px] border-zinc-600 text-sm hover:border-zinc-400 transition-colors"
              >
                <FaGithub />
                GitHub
              </a>
            )}
          </div>
        </div>
        <div className="relative aspect-[3/2] rounded-md overflow-hidden border-[.5px] border-zinc-700 bg-zinc-900">
          <Image
            src={project.src}
            alt={ts("screenshotAlt", { title: project.title })}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </header>

      <section
        className="mt-10 p-6 md:p-8 border-[.5px] rounded-md border-zinc-600 flex flex-col md:flex-row md:justify-evenly gap-6"
        style={{ backdropFilter: "blur(2px)" }}
      >
        {project.skills.frontend.length > 0 && (
          <div className="flex flex-col items-center gap-2 text-3xl">
            <FloatingDock items={project.skills.frontend} />
            <p className="text-sm text-zinc-400">Frontend</p>
          </div>
        )}
        {project.skills.backend.length > 0 && (
          <div className="flex flex-col items-center gap-2 text-3xl">
            <FloatingDock items={project.skills.backend} />
            <p className="text-sm text-zinc-400">Backend</p>
          </div>
        )}
      </section>

      {uzOnly && (
        <p className="mt-6 flex items-center gap-2 text-sm text-zinc-400">
          <Info className="w-4 h-4 shrink-0" />
          {uzOnly}
        </p>
      )}

      <section
        lang={uzOnly ? "uz" : undefined}
        className="mt-6 p-6 md:p-10 border-[.5px] rounded-md border-zinc-600 [&_.font-mono]:text-zinc-300"
        style={{ backdropFilter: "blur(2px)" }}
      >
        {project.content}
      </section>

      <nav className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href={`/projects/${prev.id}`}
          className="group flex items-center gap-3 p-4 rounded-md border-[.5px] border-zinc-700 hover:border-zinc-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 shrink-0 text-zinc-500 group-hover:text-zinc-200" />
          <span className="min-w-0">
            <span className="block text-xs text-zinc-500">{t("prev")}</span>
            <span className="block truncate">{prev.title}</span>
          </span>
        </Link>
        <Link
          href={`/projects/${next.id}`}
          className="group flex items-center justify-end text-right gap-3 p-4 rounded-md border-[.5px] border-zinc-700 hover:border-zinc-500 transition-colors"
        >
          <span className="min-w-0">
            <span className="block text-xs text-zinc-500">{t("next")}</span>
            <span className="block truncate">{next.title}</span>
          </span>
          <ArrowRight className="w-5 h-5 shrink-0 text-zinc-500 group-hover:text-zinc-200" />
        </Link>
      </nav>
    </div>
  );
}

export default Page;
