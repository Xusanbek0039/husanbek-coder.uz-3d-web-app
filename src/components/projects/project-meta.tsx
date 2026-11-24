"use client";

import { useTranslations } from "next-intl";
import { BadgeCheck, CalendarDays, UserRound } from "lucide-react";
import ProjectLinks from "@/components/profile/project-links";
import type { ProjectCardData } from "./card-data";
import { cn } from "@/lib/utils";

/** Karta ostidagi ma'lumotlar: mijoz belgisi, yil, rol, natija, texnologiyalar, havolalar */
const ProjectMeta = ({ project, className }: { project: ProjectCardData; className?: string }) => {
  const t = useTranslations("projectsSection");
  return (
    <div className={cn("flex flex-col gap-2 font-sans", className)}>
      {(project.isClient || project.year || project.role) && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-700 dark:text-zinc-300">
          {project.isClient && (
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/15 px-2 py-0.5 text-sky-800 dark:text-sky-300">
              <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
              {t("client")}
            </span>
          )}
          {project.year && (
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="sr-only">{t("year")}: </span>
              {project.year}
            </span>
          )}
          {project.role && (
            <span className="inline-flex items-center gap-1">
              <UserRound className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="sr-only">{t("role")}: </span>
              {project.role}
            </span>
          )}
        </div>
      )}
      {project.outcome && (
        <p className="text-sm text-emerald-800 dark:text-emerald-300">{project.outcome}</p>
      )}
      {project.tech.length > 0 && (
        <ul aria-label={t("tech")} className="flex flex-wrap gap-1">
          {project.tech.map((name) => (
            <li
              key={name}
              className="rounded border border-zinc-400 px-1.5 text-[11px] leading-5 text-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
            >
              {name}
            </li>
          ))}
        </ul>
      )}
      {(project.live || project.github) && <ProjectLinks live={project.live} github={project.github} />}
    </div>
  );
};

export default ProjectMeta;
