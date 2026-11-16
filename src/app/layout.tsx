import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";
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
import SocketContextProvider from "@/contexts/socketio";
import RemoteCursors from "@/components/realtime/remote-cursors";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Husan Suyunov",
  alternateName: ["Husanbek Suyunov", "Suyunov Husan Shavkat o'g'li"],
  url: config.site,
  image: "https://avatars.githubusercontent.com/u/109731657?v=4",
  jobTitle: "Full-Stack Python Developer",
  email: `mailto:${config.email}`,
  worksFor: { "@type": "Organization", name: "IT Park Zomin tuman filiali", url: "https://www.itclms.uz/" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Kimyo International University in Tashkent" },
  address: { "@type": "PostalAddress", addressRegion: "Jizzax", addressCountry: "UZ" },
  knowsAbout: ["Python", "Django", "FastAPI", "React", "Next.js", "PostgreSQL", "Telegram bots", "Machine Learning"],
  sameAs: [
    config.social.github,
    config.social.linkedin,
    config.social.telegram,
    config.social.youtube,
    config.social.instagram,
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(config.site),
  title: config.title,
  description: config.description.long,
  keywords: config.keywords,
  authors: [{ name: config.author }],
  openGraph: {
    title: config.title,
    description: config.description.short,
    url: config.site,
    images: [
      {
        url: config.ogImg,
        width: 800,
        height: 600,
        alt: "Portfolio ko'rish",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short,
    images: [config.ogImg],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico", // <-- favicon shu yerda qo‘shildi
  },
};

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="uz" className={archivoBlack.className}>
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Particles
            className="fixed inset-0 -z-10 animate-fade-in"
            quantity={100}
          />
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
      </body>
    </html>
  );
}




