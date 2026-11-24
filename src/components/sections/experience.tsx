"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, BriefcaseBusiness, GraduationCap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import Timeline from "@/components/profile/timeline";

const ExperienceSection = () => {
  const t = useTranslations("about");
  const ts = useTranslations("experienceSection");

  const experience = (["e1", "e2", "e3"] as const).map((k) => ({
    period: t(`experience.${k}.period`),
    title: t(`experience.${k}.title`),
    place: t(`experience.${k}.place`),
    text: t(`experience.${k}.text`),
  }));
  const education = (["d1", "d2", "d3"] as const).map((k) => ({
    period: t(`education.${k}.period`),
    title: t(`education.${k}.title`),
    place: t(`education.${k}.place`),
  }));

  const card =
    "p-6 md:p-10 rounded-xl border-[.5px] border-zinc-700 bg-zinc-900/70 backdrop-blur-sm text-zinc-300 font-sans";

  return (
    <section id="experience" className="relative z-[2] max-w-6xl mx-auto px-4 py-24">
      <h2
        className={cn(
          "bg-clip-text text-4xl text-center text-transparent md:text-6xl mb-12",
          "bg-gradient-to-b from-black/80 to-black/50",
          "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20"
        )}
      >
        {ts("title")}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className={card}>
          <h3 className="text-2xl mb-6 flex items-center gap-3 text-zinc-100">
            <BriefcaseBusiness className="w-6 h-6" /> {t("experienceTitle")}
          </h3>
          <Timeline items={experience} />
        </div>
        <div className={card}>
          <h3 className="text-2xl mb-6 flex items-center gap-3 text-zinc-100">
            <GraduationCap className="w-6 h-6" /> {t("educationTitle")}
          </h3>
          <Timeline items={education} />
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          href="/about"
          className="flex items-center gap-2 rounded-md border-[.5px] border-zinc-600 px-5 py-2.5 text-sm font-sans text-zinc-300 hover:border-zinc-300 hover:text-white transition-colors bg-zinc-900/60"
        >
          {ts("more")} <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default ExperienceSection;
