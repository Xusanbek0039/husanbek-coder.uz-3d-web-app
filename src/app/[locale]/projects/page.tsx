import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import projects from "@/data/projects";
import { alternatesFor } from "@/i18n/helpers";
import ProjectsGrid from "@/components/projects/projects-grid";
import { toCardData } from "@/components/projects/card-data";

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  return {
    title: `${t("metaTitle")} | Husan Suyunov`,
    description: t("metaDescription"),
    alternates: alternatesFor(locale, "/projects"),
  };
}

async function Page({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations("projectsPage");
  const list = projects.map((p) => toCardData(p, locale));

  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[150px] text-zinc-300 pb-20">
      <h1 className="text-4xl mt-[100px] mb-3">{t("title")}</h1>
      <p className="mb-[50px] text-sm text-zinc-400">{t("subtitle")}</p>
      <ProjectsGrid items={list} />
    </div>
  );
}

export default Page;
