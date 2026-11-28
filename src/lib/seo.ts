import type { Metadata } from "next";
import { config } from "@/data/config";
import { alternatesFor, localizedPath } from "@/i18n/helpers";
import { ogLocales, type Locale } from "@/i18n/routing";

/** JSON-LD tugunlarini bir-biriga bog'lash uchun doimiy ID'lar */
export const PERSON_ID = `${config.site}/#person`;
export const WEBSITE_ID = `${config.site}/#website`;

export const absoluteUrl = (locale: string, path: string) =>
  `${config.site}${localizedPath(locale, path)}`;

export const SITE_NAME = "Husan Suyunov";

/** <title> shabloni: sahifa faqat o'z sarlavhasini beradi, ism shu yerdan qo'shiladi */
export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;

/** Open Graph va Twitter title shablonni ishlatmaydi — ism qo'lda qo'shiladi */
export const withSiteName = (title: string) => `${title} | ${SITE_NAME}`;

/** Umumiy OG rasm (src/app/opengraph-image.tsx). openGraph qayta yozilsa, avtomatik qo'shilmaydi */
export const DEFAULT_OG_IMAGE = {
  url: `${config.site}/opengraph-image`,
  width: 1200,
  height: 630,
};

/**
 * Ichki sahifa metadata'si: title, description, canonical/hreflang va o'ziga xos Open Graph.
 * openGraph berilmasa, Next.js layout'dagisini (bosh sahifa sarlavhasi va URL'i) meros qiladi.
 */
export const pageMetadata = (
  locale: string,
  path: string,
  title: string,
  description: string
): Metadata => {
  const fullTitle = withSiteName(title);
  return {
    title,
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      type: "website",
      title: fullTitle,
      description,
      url: absoluteUrl(locale, path),
      siteName: SITE_NAME,
      locale: ogLocales[locale as Locale],
      images: [{ ...DEFAULT_OG_IMAGE, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
};

/** Matnni so'z chegarasida qisqartiradi (title ~60, description ~160 belgi) */
export const clampText = (text: string, max: number) => {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,.;:—-]+$/, "")}…`;
};

/** Google qidiruvida sahifa ustidagi "Bosh sahifa › Loyihalar › ..." yo'li */
export const breadcrumbJsonLd = (locale: string, items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(locale, item.path),
  })),
});

type PageType = "WebPage" | "ProfilePage" | "CollectionPage" | "ContactPage" | "AboutPage";

/** Sahifa turi + breadcrumb. ProfilePage/AboutPage'da asosiy obyekt — Person */
export const pageJsonLd = ({
  type,
  locale,
  path,
  name,
  description,
  crumbs,
  extra,
}: {
  type: PageType;
  locale: string;
  path: string;
  name: string;
  description: string;
  crumbs: { name: string; path: string }[];
  extra?: Record<string, unknown>;
}) => [
  {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: absoluteUrl(locale, path),
    inLanguage: locale,
    isPartOf: { "@id": WEBSITE_ID },
    ...(type === "ProfilePage" || type === "AboutPage" ? { mainEntity: { "@id": PERSON_ID } } : {}),
    ...extra,
  },
  breadcrumbJsonLd(locale, crumbs),
];
