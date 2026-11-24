"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, BriefcaseBusiness, Code2, GraduationCap, Presentation, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Timeline from "@/components/profile/timeline";
import SectionHeading from "@/components/ui/section-heading";
import { educationTimeline, experienceTimeline } from "@/data/timeline";
import { competencies } from "@/data/skills";
import { experience } from "@/data/experience";
import { pick } from "@/data/types";

const COMPETENCY_ICONS = { teaching: Presentation, management: Users, development: Code2 };

const ExperienceSection = () => {
  const t = useTranslations("about");
  const ts = useTranslations("experienceSection");
  const locale = useLocale();
  const labels = {
    present: ts("present"),
    kinds: {
      teaching: ts("kinds.teaching"),
      management: ts("kinds.management"),
      development: ts("kinds.development"),
    },
  };
  const currentCount = experience.filter((e) => e.end === null).length;

  const card =
    "p-6 md:p-10 rounded-xl border-[.5px] border-zinc-700 bg-zinc-900/80 backdrop-blur-sm text-zinc-300 font-sans";

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative z-[2] max-w-6xl mx-auto px-4 py-24">
      <SectionHeading id="experience-title">{ts("title")}</SectionHeading>
      <p className="mt-4 mb-10 text-center text-sm text-zinc-700 dark:text-zinc-300 font-sans">
        {ts("summary", { positions: experience.length, current: currentCount })}
      </p>

      <ul className="mb-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {competencies.map((c) => {
          const Icon = COMPETENCY_ICONS[c.id];
          return (
            <li key={c.id} className="rounded-xl border-[.5px] border-zinc-700 bg-zinc-900/80 p-5 backdrop-blur-sm font-sans">
              <h3 className="flex items-center gap-2 text-base text-zinc-100">
                <Icon className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                {pick(c.title, locale)}
              </h3>
              <p className="mt-2 text-sm text-zinc-300">{pick(c.description, locale)}</p>
            </li>
          );
        })}
      </ul>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className={`${card} lg:col-span-3`}>
          <h3 className="text-2xl mb-6 flex items-center gap-3 text-zinc-100">
            <BriefcaseBusiness className="w-6 h-6" aria-hidden="true" /> {t("experienceTitle")}
          </h3>
          <Timeline items={experienceTimeline(locale, labels)} currentLabel={ts("current")} />
        </div>
        <div className={`${card} lg:col-span-2`}>
          <h3 className="text-2xl mb-6 flex items-center gap-3 text-zinc-100">
            <GraduationCap className="w-6 h-6" aria-hidden="true" /> {t("educationTitle")}
          </h3>
          <Timeline items={educationTimeline(locale, labels.present)} />
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          href="/resume"
          className="flex items-center gap-2 rounded-md border-[.5px] border-zinc-500 px-5 py-2.5 text-sm font-sans text-zinc-200 hover:border-zinc-300 hover:text-white transition-colors bg-zinc-900/70"
        >
          {ts("more")} <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};

export default ExperienceSection;
