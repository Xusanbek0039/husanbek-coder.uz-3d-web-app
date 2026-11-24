"use client";

import { useTranslations } from "next-intl";
import { PROJECT_KINDS, type ProjectKind } from "@/data/projects";
import { cn } from "@/lib/utils";

export type ProjectFilterValue = ProjectKind | "all";

/** Loyihalarni turkum bo'yicha filtrlash tugmalari */
const ProjectFilter = ({
  value,
  onChange,
  counts,
  className,
}: {
  value: ProjectFilterValue;
  onChange: (v: ProjectFilterValue) => void;
  counts: Record<ProjectFilterValue, number>;
  className?: string;
}) => {
  const t = useTranslations("projectsSection.filters");
  const options: ProjectFilterValue[] = ["all", ...PROJECT_KINDS];
  return (
    <div role="group" aria-label={t("label")} className={cn("flex flex-wrap justify-center gap-2", className)}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          aria-pressed={value === opt}
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-sans transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
            value === opt
              ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-black"
              : "border-zinc-400 text-zinc-700 hover:border-zinc-700 dark:border-zinc-600 dark:text-zinc-300 dark:hover:border-zinc-300"
          )}
        >
          {t(opt)} <span className="opacity-70">({counts[opt]})</span>
        </button>
      ))}
    </div>
  );
};

export const countByKind = (items: { kinds: ProjectKind[] }[]) => {
  const counts = { all: items.length, web: 0, lms: 0, bot: 0, ai: 0 } as Record<ProjectFilterValue, number>;
  items.forEach((i) => i.kinds.forEach((k) => (counts[k] += 1)));
  return counts;
};

export const matchesFilter = (kinds: ProjectKind[], value: ProjectFilterValue) =>
  value === "all" || kinds.includes(value);

export default ProjectFilter;
