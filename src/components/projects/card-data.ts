import type { Project, ProjectKind } from "@/data/projects";
import { localizeProject } from "@/data/projects-i18n";
import { pick } from "@/data/types";

/** Kartaga kerakli, serializatsiya qilinadigan (JSX'siz) ma'lumot */
export type ProjectCardData = {
  id: string;
  title: string;
  category: string;
  description: string;
  src: string;
  kinds: ProjectKind[];
  isClient: boolean;
  inProgress: boolean;
  year?: string;
  role?: string;
  outcome?: string;
  tech: string[];
  live?: string;
  github?: string;
};

export const toCardData = (project: Project, locale: string, maxTech = 5): ProjectCardData => {
  const p = localizeProject(project, locale);
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    description: p.description,
    src: p.src,
    kinds: p.kinds,
    isClient: Boolean(p.isClient),
    inProgress: p.status === "inProgress",
    year: p.year,
    role: p.role ? pick(p.role, locale) : undefined,
    outcome: p.outcome ? pick(p.outcome, locale) : undefined,
    tech: [...(p.skills.backend ?? []), ...(p.skills.frontend ?? [])]
      .map((s) => s.title)
      .slice(0, maxTech),
    live: p.live,
    github: p.github,
  };
};
