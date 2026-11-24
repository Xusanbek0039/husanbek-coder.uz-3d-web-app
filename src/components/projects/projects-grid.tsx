"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ProjectFilter, { countByKind, matchesFilter, type ProjectFilterValue } from "./project-filter";
import ProjectMeta from "./project-meta";
import type { ProjectCardData } from "./card-data";

/** /projects sahifasi: turkum filtri + kartalar */
const ProjectsGrid = ({ items }: { items: ProjectCardData[] }) => {
  const t = useTranslations("projectsPage");
  const ts = useTranslations("projectsSection");
  const [filter, setFilter] = React.useState<ProjectFilterValue>("all");
  const counts = React.useMemo(() => countByKind(items), [items]);
  const visible = items.filter((p) => matchesFilter(p.kinds, filter));

  return (
    <>
      <ProjectFilter value={filter} onChange={setFilter} counts={counts} className="justify-start mb-8" />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((project, i) => (
          <li
            key={project.id}
            className="group flex flex-col border-[.5px] rounded-md border-zinc-600 overflow-hidden hover:border-zinc-400 transition-colors"
            style={{ backdropFilter: "blur(2px)" }}
          >
            <Link
              href={`/projects/${project.id}`}
              className="flex flex-col flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <div className="relative aspect-[3/2] bg-zinc-900 overflow-hidden">
                <Image
                  src={project.src}
                  alt={ts("screenshotAlt", { title: project.title })}
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
                <p className="mt-2 text-xs text-zinc-400 line-clamp-3">{project.description}</p>
                <span className="mt-auto pt-4 flex items-center gap-1 text-xs text-zinc-300">
                  {t("details")}
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
            <ProjectMeta project={project} className="px-4 pb-4" />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProjectsGrid;
