import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { getServices, getProcess, getFaq, getBudgets } from "@/data/services";
import projects from "@/data/projects";
import { localizeProject } from "@/data/projects-i18n";
import OrderForm from "@/components/OrderForm";
import OrderServiceButton from "@/components/order-service-button";
import { Link } from "@/i18n/navigation";
import { alternatesFor, localizedPath } from "@/i18n/helpers";
import { config } from "@/data/config";
import { ogLocales, type Locale } from "@/i18n/routing";

type Props = { params: { locale: string }; searchParams: { service?: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "services" });
  const title = `${t("metaTitle")} | Husan Suyunov`;
  const url = `${config.site}${localizedPath(locale, "/services")}`;
  return {
    title,
    description: t("metaDescription"),
    alternates: alternatesFor(locale, "/services"),
    // Ulashilganda (Telegram, Facebook, LinkedIn) bosh sahifa emas, shu sahifa sarlavhasi chiqsin
    openGraph: {
      title,
      description: t("metaDescription"),
      url,
      type: "website",
      locale: ogLocales[locale as Locale],
      siteName: "Husan Suyunov",
    },
    twitter: { card: "summary_large_image", title, description: t("metaDescription") },
  };
}

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`border-[.5px] rounded-md border-zinc-600 ${className}`}
    style={{ backdropFilter: "blur(2px)" }}
  >
    {children}
  </div>
);

async function Page({ params: { locale }, searchParams }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const services = getServices(locale);
  const faq = getFaq(locale);
  const tn = await getTranslations("nav");
  const pageUrl = `${config.site}${localizedPath(locale, "/services")}`;

  // Tuzilgan ma'lumot: xizmatlar katalogi, FAQ va sahifa yo'li (Google uchun)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${pageUrl}#service`,
        name: `Husan Suyunov — ${t("catalogName")}`,
        url: pageUrl,
        description: t("metaDescription"),
        image: `${config.site}/opengraph-image`,
        email: config.email,
        telephone: "+998975216686",
        areaServed: { "@type": "Country", name: "Uzbekistan" },
        availableLanguage: ["uz", "ru", "en"],
        founder: { "@type": "Person", name: "Husan Suyunov", url: config.site },
        sameAs: [config.social.telegram, config.social.github, config.social.linkedin],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t("catalogName"),
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            url: `${pageUrl}#${s.id}`,
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.description,
              serviceType: s.title,
              provider: { "@type": "Person", name: "Husan Suyunov" },
              areaServed: { "@type": "Country", name: "Uzbekistan" },
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: tn("home"), item: `${config.site}${localizedPath(locale, "/")}` },
          { "@type": "ListItem", position: 2, name: tn("services"), item: pageUrl },
        ],
      },
    ],
  };
  const projectTitle = (id: string) => {
    const p = projects.find((x) => x.id === id);
    return p ? localizeProject(p, locale).title.split(" — ")[0] : id;
  };

  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[150px] text-zinc-300 pt-[100px] pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label={t("breadcrumb")} className="mb-6 text-sm text-zinc-400">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-zinc-100 underline-offset-4 hover:underline">
              {tn("home")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-zinc-200">
            {tn("services")}
          </li>
        </ol>
      </nav>
      <header className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-zinc-400 leading-relaxed">{t("intro")}</p>
        <a
          href="#buyurtma"
          className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded-md bg-zinc-200 text-black text-sm hover:bg-white transition-colors"
        >
          {t("cta")} <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </header>

      <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((s) => (
          <li key={s.id} id={s.id} className="scroll-mt-24">
            <Card className="p-6 h-full flex flex-col">
              <div className="text-3xl" aria-hidden="true">{s.emoji}</div>
              <h2 className="mt-3 text-xl text-zinc-100">
                <a href={`#${s.id}`} className="hover:underline underline-offset-4">
                  {s.title}
                </a>
              </h2>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{s.description}</p>
              <ul className="mt-4 flex flex-col gap-2 text-sm">
                {s.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-green-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.stack.map((tech) => (
                  <span key={tech} className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    {tech}
                  </span>
                ))}
              </div>
              {s.examples.length > 0 && (
                <p className="mt-4 text-xs text-zinc-400">
                  {t("examples")}{" "}
                  {s.examples.map((id, i) => (
                    <React.Fragment key={id}>
                      {i > 0 && ", "}
                      <Link href={`/projects/${id}`} className="underline hover:text-zinc-200">
                        {projectTitle(id)}
                      </Link>
                    </React.Fragment>
                  ))}
                </p>
              )}
              <div className="mt-auto pt-6 flex items-center justify-between gap-3">
                <span className="text-sm text-zinc-300">
                  <span className="sr-only">{t("priceLabel")}: </span>
                  {s.price}
                </span>
                <OrderServiceButton
                  serviceId={s.id}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-md border-[.5px] border-zinc-600 hover:border-zinc-400 transition-colors"
                >
                  {t("orderBtn")} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </OrderServiceButton>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      <section className="mt-16">
        <h2 id="process" className="text-3xl mb-6">{t("process")}</h2>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {getProcess(locale).map((step, i) => (
            <li key={step.title}>
              <Card className="p-6 h-full">
                <span className="font-mono text-sm text-zinc-400">0{i + 1}</span>
                <h3 className="mt-2 text-lg text-zinc-100">{step.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{step.text}</p>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <h2 id="faq" className="text-3xl mb-6">{t("faq")}</h2>
          <div className="flex flex-col gap-3">
            {faq.map((f) => (
              <details key={f.q} className="group rounded-md border-[.5px] border-zinc-700 bg-zinc-900/40 p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-zinc-100">
                  {f.q}
                  <ChevronDown className="w-4 h-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-3 text-sm text-zinc-400">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        <div id="buyurtma" className="lg:col-span-3 scroll-mt-24">
          <Card className="p-6 md:p-10 bg-black/40">
            <h2 className="text-3xl mb-2">{t("orderTitle")}</h2>
            <p className="mb-6 text-sm text-zinc-400">{t("orderNote")}</p>
            <OrderForm
              services={services.map(({ id, title }) => ({ id, title }))}
              budgets={getBudgets(locale)}
              defaultService={searchParams.service}
            />
          </Card>
        </div>
      </section>
    </div>
  );
}

export default Page;
