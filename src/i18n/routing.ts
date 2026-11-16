import { defineRouting } from "next-intl/routing";

export const locales = ["uz", "ru", "en"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "uz",
  // o'zbekcha URL'lar o'zgarmaydi (/about), boshqalar prefiks bilan (/ru/about, /en/about)
  localePrefix: "as-needed",
  // Til faqat URL bilan belgilanadi. Aks holda NEXT_LOCALE cookie yoki brauzer tili
  // prefikssiz (o'zbekcha) sahifalarni /ru yoki /en ga qayta yo'naltirib yuboradi.
  localeDetection: false,
});

export const localeNames: Record<Locale, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
  en: "English",
};

export const ogLocales: Record<Locale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};
