"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, BriefcaseBusiness, GraduationCap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Timeline from "@/components/profile/timeline";
import SectionHeading from "@/components/ui/section-heading";
import { educationTimeline, experienceTimeline } from "@/data/timeline";

const ExperienceSection = () => {
  const t = useTranslations("about");
  const ts = useTranslations("experienceSection");
  const locale = useLocale();
  const present = ts("present");

  const card =
    "p-6 md:p-10 rounded-xl border-[.5px] border-zinc-700 bg-zinc-900/80 backdrop-blur-sm text-zinc-300 font-sans";

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative z-[2] max-w-6xl mx-auto px-4 py-24">
      <SectionHeading id="experience-title" className="mb-12">
        {ts("title")}
      </SectionHeading>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className={card}>
          <h3 className="text-2xl mb-6 flex items-center gap-3 text-zinc-100">
            <BriefcaseBusiness className="w-6 h-6" aria-hidden="true" /> {t("experienceTitle")}
          </h3>
          <Timeline items={experienceTimeline(locale, present)} />
        </div>
        <div className={card}>
          <h3 className="text-2xl mb-6 flex items-center gap-3 text-zinc-100">
            <GraduationCap className="w-6 h-6" aria-hidden="true" /> {t("educationTitle")}
          </h3>
          <Timeline items={educationTimeline(locale, present)} />
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
