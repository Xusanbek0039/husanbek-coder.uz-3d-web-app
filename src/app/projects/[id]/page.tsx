import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import projects from "@/data/projects";
import { FloatingDock } from "@/components/ui/floating-dock";
import { config } from "@/data/config";

type Props = { params: { id: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = projects.find((p) => p.id === params.id);
  if (!project) return { title: "Loyiha topilmadi | Husan Suyunov" };
  return {
    title: `${project.title} | Husan Suyunov`,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${config.site}/projects/${project.id}`,
      images: [{ url: project.src }],
    },
  };
}

function Page({ params }: Props) {
  const index = projects.findIndex((p) => p.id === params.id);
  if (index === -1) notFound();
  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[150px] text-zinc-300 pt-[100px] pb-20">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Barcha loyihalar
      </Link>

      <header className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <span className="text-xs bg-white text-black rounded-lg px-2 py-0.5">
            {project.category}
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl leading-tight text-zinc-100">
            {project.title}
          </h1>
          <p className="mt-4 text-zinc-400 leading-relaxed">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-zinc-200 text-black text-sm hover:bg-white transition-colors"
            >
              Tashrif buyurish
              <ArrowUpRight className="w-4 h-4" />
            </a>
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
            alt={project.title}
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
            <p className="text-sm text-zinc-500">Frontend</p>
          </div>
        )}
        {project.skills.backend.length > 0 && (
          <div className="flex flex-col items-center gap-2 text-3xl">
            <FloatingDock items={project.skills.backend} />
            <p className="text-sm text-zinc-500">Backend</p>
          </div>
        )}
      </section>

      <section
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
            <span className="block text-xs text-zinc-500">Oldingi loyiha</span>
            <span className="block truncate">{prev.title}</span>
          </span>
        </Link>
        <Link
          href={`/projects/${next.id}`}
          className="group flex items-center justify-end text-right gap-3 p-4 rounded-md border-[.5px] border-zinc-700 hover:border-zinc-500 transition-colors"
        >
          <span className="min-w-0">
            <span className="block text-xs text-zinc-500">Keyingi loyiha</span>
            <span className="block truncate">{next.title}</span>
          </span>
          <ArrowRight className="w-5 h-5 shrink-0 text-zinc-500 group-hover:text-zinc-200" />
        </Link>
      </nav>
    </div>
  );
}

export default Page;
