import { config } from "@/data/config";
import { localizedPath } from "@/i18n/helpers";

/** JSON-LD tugunlarini bir-biriga bog'lash uchun doimiy ID'lar */
export const PERSON_ID = `${config.site}/#person`;
export const WEBSITE_ID = `${config.site}/#website`;

export const absoluteUrl = (locale: string, path: string) =>
  `${config.site}${localizedPath(locale, path)}`;

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
