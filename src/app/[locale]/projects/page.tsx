import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import projects from "@/data/projects";
import JsonLd from "@/components/seo/json-ld";
import { absoluteUrl, pageJsonLd, pageMetadata } from "@/lib/seo";
import ProjectsGrid from "@/components/projects/projects-grid";
import { toCardData } from "@/components/projects/card-data";

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  return pageMetadata(locale, "/projects", `${t("metaTitle")} | Husan Suyunov`, t("metaDescription"));
}

async function Page({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations("projectsPage");
  const list = projects.map((p) => toCardData(p, locale));

  const tn = await getTranslations("nav");
  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[150px] text-zinc-300 pb-20">
      <JsonLd
        data={pageJsonLd({
          type: "CollectionPage",
          locale,
          path: "/projects",
          name: t("metaTitle"),
          description: t("metaDescription"),
          crumbs: [
            { name: tn("home"), path: "/" },
            { name: tn("projects"), path: "/projects" },
          ],
          extra: {
            mainEntity: {
              "@type": "ItemList",
              itemListElement: list.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.title,
                url: absoluteUrl(locale, `/projects/${p.id}`),
              })),
            },
          },
        })}
      />
      <h1 className="text-4xl mt-[100px] mb-3">{t("title")}</h1>
      <p className="mb-[50px] text-sm text-zinc-400">{t("subtitle")}</p>
      <ProjectsGrid items={list} />
    </div>
  );
}

export default Page;
