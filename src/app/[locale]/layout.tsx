import type { Metadata } from "next";
import { Archivo_Black, Rubik } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import Particles from "@/components/Particles";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header/header";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/footer/footer";
import Script from "next/script";
import Preloader from "@/components/preloader";
import { config } from "@/data/config";
import { skills } from "@/data/skills";
import SocketContextProvider from "@/contexts/socketio";
import { LazyEasterEggs, LazyElasticCursor, LazyRemoteCursors } from "@/components/lazy-extras";
import { routing, ogLocales, type Locale } from "@/i18n/routing";
import { alternatesFor, isLocale } from "@/i18n/helpers";
import { getCommittersRank, type CommittersRank } from "@/lib/committers";
import { PERSON_ID, TITLE_TEMPLATE, WEBSITE_ID } from "@/lib/seo";
import JsonLd from "@/components/seo/json-ld";

const websiteJsonLd = (description: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "Husan Suyunov",
  alternateName: ["Husanbek Coder", "husanbek-coder.uz"],
  url: config.site,
  description,
  inLanguage: ["uz", "ru", "en"],
  publisher: { "@id": PERSON_ID },
});

type Props = { children: React.ReactNode; params: { locale: string } };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(config.site),
    title: { default: t("title"), template: TITLE_TEMPLATE },
    description: t("description"),
    applicationName: "Husan Suyunov",
    authors: [{ name: config.author, url: config.site }],
    creator: config.author,
    alternates: alternatesFor(locale, "/"),
    openGraph: {
      title: t("title"),
      description: t("short"),
      url: config.site,
      locale: ogLocales[locale as Locale],
      // Rasm: ./opengraph-image.tsx (1200x630, dinamik reyting bilan)
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("short"),
    },
    robots: { index: true, follow: true },
    // Google Search Console (HTML fayl usuli: public/google61bf653d910ca37d.html) va Yandex Webmaster
    verification: {
      google: "YTD0fLdAhFj3NGU6jOWh_ewfbSDNp7MvSnshIKTm1l0",
      // Yandex Webmaster kodi Netlify env'da; berilmagan bo'lsa teg chiqmaydi
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    },
    icons: { icon: "/favicon.ico" },
  };
}

const archivoBlack = Archivo_Black({
  subsets: ["latin", "latin-ext"],
  weight: "400",
});

// Archivo Black'da kirill harflari yo'q — ruscha sahifalar uchun Rubik (qalin)
const rubik = Rubik({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800"],
});

const personJsonLd = (description: string, rank: CommittersRank) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Husan Suyunov",
  alternateName: [
    "Husanbek Suyunov",
    "Husanbek Coder",
    "Suyunov Husan Shavkat o'g'li",
    "Хусан Суюнов",
    "Хусанбек Суюнов",
  ],
  url: config.site,
  image: "https://avatars.githubusercontent.com/u/109731657?v=4",
  jobTitle: "Full-Stack Python Developer",
  description,
  email: `mailto:${config.email}`,
  worksFor: [
    { "@type": "Organization", name: "IT Park Zomin tuman filiali", url: "https://www.itclms.uz/" },
    {
      "@type": "GovernmentOrganization",
      name: "O'zbekiston Respublikasi Raqamli texnologiyalar vazirligi huzuridagi Raqamli ta'limni rivojlantirish markazi",
    },
  ],
  hasOccupation: [
    { "@type": "Occupation", name: "Full-Stack Python Developer" },
    { "@type": "Occupation", name: "Programming Mentor" },
  ],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Kimyo International University in Tashkent" },
  address: { "@type": "PostalAddress", addressRegion: "Jizzax", addressCountry: "UZ" },
  knowsAbout: skills.filter((s) => s.level === "core").map((s) => s.name),
  knowsLanguage: ["uz", "ru", "en"],
  nationality: { "@type": "Country", name: "Uzbekistan" },
  award: `#${rank.rank} of ${rank.total} most active GitHub users in Uzbekistan (committers.top)`,
  subjectOf: { "@type": "WebPage", name: "committers.top — Uzbekistan", url: rank.url },
  sameAs: [
    config.social.github,
    config.social.gitlab,
    config.social.linkedin,
    config.social.telegram,
    config.social.youtube,
    config.social.instagram,
  ],
});

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations("meta");
  const rank = await getCommittersRank();

  return (
    <html lang={locale} className={locale === "ru" ? rubik.className : archivoBlack.className}>
      <head>
        {process.env.UMAMI_DOMAIN && process.env.UMAMI_SITE_ID && (
          <Script
            defer
            src={process.env.UMAMI_DOMAIN}
            data-website-id={process.env.UMAMI_SITE_ID}
          />
        )}
      </head>
      <body>
        <JsonLd data={[personJsonLd(t("short"), rank), websiteJsonLd(t("description"))]} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
            <Particles className="fixed inset-0 -z-10 animate-fade-in" quantity={100} />
            <Preloader>
              <SocketContextProvider>
                <LazyRemoteCursors />
                <TooltipProvider>
                  <Header />
                  {children}
                  <Footer />
                </TooltipProvider>
              </SocketContextProvider>
              <Toaster />
              <LazyEasterEggs />
              <LazyElasticCursor />
            </Preloader>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
