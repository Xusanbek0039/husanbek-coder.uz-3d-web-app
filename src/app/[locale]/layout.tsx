import type { Metadata } from "next";
import { Archivo_Black, Rubik } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import ElasticCursor from "@/components/ui/ElasticCursor";
import Particles from "@/components/Particles";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header/header";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/footer/footer";
import Script from "next/script";
import Preloader from "@/components/preloader";
import EasterEggs from "@/components/easter-eggs";
import { config } from "@/data/config";
import { skills } from "@/data/skills";
import SocketContextProvider from "@/contexts/socketio";
import RemoteCursors from "@/components/realtime/remote-cursors";
import { routing, ogLocales, type Locale } from "@/i18n/routing";
import { alternatesFor, isLocale } from "@/i18n/helpers";
import { getCommittersRank, type CommittersRank } from "@/lib/committers";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Husan Suyunov",
  url: config.site,
  inLanguage: ["uz", "ru", "en"],
};

type Props = { children: React.ReactNode; params: { locale: string } };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(config.site),
    title: t("title"),
    description: t("description"),
    authors: [{ name: config.author }],
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
  name: "Husan Suyunov",
  alternateName: ["Husanbek Suyunov", "Suyunov Husan Shavkat o'g'li", "Хусан Суюнов"],
  url: config.site,
  image: "https://avatars.githubusercontent.com/u/109731657?v=4",
  jobTitle: "Full-Stack Python Developer",
  description,
  email: `mailto:${config.email}`,
  worksFor: { "@type": "Organization", name: "IT Park Zomin tuman filiali", url: "https://www.itclms.uz/" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Kimyo International University in Tashkent" },
  address: { "@type": "PostalAddress", addressRegion: "Jizzax", addressCountry: "UZ" },
  knowsAbout: skills.filter((s) => s.level === "core").map((s) => s.name),
  knowsLanguage: ["uz", "ru", "en"],
  nationality: { "@type": "Country", name: "Uzbekistan" },
  award: `#${rank.rank} of ${rank.total} most active GitHub users in Uzbekistan (committers.top)`,
  subjectOf: { "@type": "WebPage", name: "committers.top — Uzbekistan", url: rank.url },
  sameAs: [
    config.social.github,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(t("short"), rank)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
            <Particles className="fixed inset-0 -z-10 animate-fade-in" quantity={100} />
            <Preloader>
              <SocketContextProvider>
                <RemoteCursors />
                <TooltipProvider>
                  <Header />
                  {children}
                  <Footer />
                </TooltipProvider>
              </SocketContextProvider>
              <Toaster />
              <EasterEggs />
              <ElasticCursor />
            </Preloader>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
