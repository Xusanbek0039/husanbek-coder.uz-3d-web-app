import { routing, type Locale } from "./routing";
import { config } from "@/data/config";

/** Berilgan yo'l uchun tilga mos URL: uz -> /about, ru -> /ru/about */
export const localizedPath = (locale: string, path: string) => {
  const clean = path === "/" ? "" : path;
  return locale === routing.defaultLocale ? clean || "/" : `/${locale}${clean}`;
};

/** generateMetadata uchun: canonical va hreflang alternativlari */
export const alternatesFor = (locale: string, path: string) => ({
  canonical: localizedPath(locale, path),
  languages: Object.fromEntries([
    ...routing.locales.map((l) => [l, `${config.site}${localizedPath(l, path)}`]),
    ["x-default", `${config.site}${localizedPath(routing.defaultLocale, path)}`],
  ]),
});

export const isLocale = (l: string): l is Locale =>
  (routing.locales as readonly string[]).includes(l);
