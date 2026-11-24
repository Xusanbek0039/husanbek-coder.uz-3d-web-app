import React from "react";
import { BoxReveal } from "../reveal-animations";
import { useTranslations } from "next-intl";
import SectionHeading from "../ui/section-heading";

const SkillsSection = () => {
  const t = useTranslations("skills");
  return (
    <section id="skills" aria-labelledby="skills-title" className="w-full h-screen md:h-[150dvh]">
      <div className="top-[70px] sticky mb-96 px-4">
        <BoxReveal width="100%">
          <SectionHeading id="skills-title">{t("title")}</SectionHeading>
        </BoxReveal>
        <p className="mx-auto mt-4 max-w-2xl font-normal text-base text-center text-neutral-700 dark:text-neutral-200">
          {t("hint")}
        </p>
      </div>
    </section>
  );
};

export default SkillsSection;
