import type { Locale } from "@/i18n/routing";

/** Uchala tildagi matn */
export type Localized = Record<Locale, string>;

/** Tanlangan tildagi matnni qaytaradi (topilmasa — o'zbekcha) */
export const pick = (text: Localized, locale: string): string =>
  text[locale as Locale] ?? text.uz;
