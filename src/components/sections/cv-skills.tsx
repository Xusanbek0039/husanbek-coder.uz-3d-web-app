"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { skillIcon } from "@/components/profile/skill-icons";
import { skills, spokenLanguages, type SkillLevel } from "@/data/skills";
import { pick } from "@/data/types";
import SectionHeading from "@/components/ui/section-heading";


const LEVELS: SkillLevel[] = ["core", "familiar"];

const cardClass = cn(
  "rounded-xl border p-5 backdrop-blur-md",
  "border-neutral-300/70 bg-white/85",
  "dark:border-neutral-700/70 dark:bg-black/75"
);

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.4, delay },
});

const CvSkillsSection = () => {
  const t = useTranslations("cvSkills");
  const locale = useLocale();
  return (
    <section id="skills-cv" aria-labelledby="skills-cv-title" className="max-w-6xl mx-auto px-4 md:px-8 py-24">
      <SectionHeading id="skills-cv-title">{t("title")}</SectionHeading>
      <p className="mx-auto mt-4 mb-12 max-w-2xl text-center text-sm md:text-base text-neutral-700 dark:text-neutral-300">
        {t("subtitle")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {LEVELS.map((level, idx) => (
          <motion.div
            key={level}
            {...reveal(idx * 0.08)}
            className={cn(
              cardClass,
              level === "core" && "border-emerald-600/60 dark:border-emerald-500/50 ring-1 ring-emerald-500/20"
            )}
          >
            <h3 className="mb-1 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {t(`levels.${level}`)}
            </h3>
            <p className="mb-4 text-xs text-neutral-600 dark:text-neutral-300">{t(`levelHints.${level}`)}</p>
            <ul className="flex flex-wrap gap-2">
              {skills
                .filter((s) => s.level === level)
                .map((s) => (
                  <li
                    key={s.name}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs md:text-sm",
                      "bg-neutral-200/80 text-neutral-900",
                      "dark:bg-neutral-800/80 dark:text-neutral-100"
                    )}
                  >
                    {React.createElement(skillIcon(s.name), { className: "text-base", "aria-hidden": true })}
                    {s.name}
                  </li>
                ))}
            </ul>
          </motion.div>
        ))}
        <motion.div {...reveal(0.16)} className={cn(cardClass, "md:col-span-2")}>
          <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {t("groups.spoken")}
          </h3>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {spokenLanguages.map((lang) => (
              <li
                key={lang.id}
                className="flex items-center justify-between gap-3 rounded-md bg-neutral-200/80 dark:bg-neutral-800/80 px-3 py-2 text-sm"
              >
                <span className="text-neutral-900 dark:text-neutral-100">{pick(lang.name, locale)}</span>{" "}
                <span className="font-mono text-xs text-neutral-700 dark:text-neutral-300">
                  {lang.level ?? `(${t("langs.native")})`}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default CvSkillsSection;
