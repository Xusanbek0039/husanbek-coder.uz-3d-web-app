import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { getServices, getProcess, getFaq, getBudgets } from "@/data/services";
import projects from "@/data/projects";
import { localizeProject } from "@/data/projects-i18n";
import OrderForm from "@/components/OrderForm";
import { Link } from "@/i18n/navigation";
import { alternatesFor } from "@/i18n/helpers";

type Props = { params: { locale: string }; searchParams: { service?: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: `${t("metaTitle")} | Husan Suyunov`,
    description: t("metaDescription"),
    alternates: alternatesFor(locale, "/services"),
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
  const projectTitle = (id: string) => {
    const p = projects.find((x) => x.id === id);
    return p ? localizeProject(p, locale).title.split(" — ")[0] : id;
  };

  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[150px] text-zinc-300 pt-[100px] pb-20">
      <header className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-zinc-400 leading-relaxed">{t("intro")}</p>
        <a
          href="#buyurtma"
          className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded-md bg-zinc-200 text-black text-sm hover:bg-white transition-colors"
        >
          {t("cta")} <ArrowRight className="w-4 h-4" />
        </a>
      </header>

      <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((s) => (
          <li key={s.id}>
            <Card className="p-6 h-full flex flex-col">
              <div className="text-3xl">{s.emoji}</div>
              <h2 className="mt-3 text-xl text-zinc-100">{s.title}</h2>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{s.description}</p>
              <ul className="mt-4 flex flex-col gap-2 text-sm">
                {s.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-green-400" />
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
                <p className="mt-4 text-xs text-zinc-500">
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
                <span className="text-sm text-zinc-400">{s.price}</span>
                <Link
                  href={{ pathname: "/services", query: { service: s.id }, hash: "buyurtma" }}
                  scroll={false}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-md border-[.5px] border-zinc-600 hover:border-zinc-400 transition-colors"
                >
                  {t("orderBtn")} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      <section className="mt-16">
        <h2 className="text-3xl mb-6">{t("process")}</h2>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {getProcess(locale).map((step, i) => (
            <li key={step.title}>
              <Card className="p-6 h-full">
                <span className="font-mono text-sm text-zinc-500">0{i + 1}</span>
                <h3 className="mt-2 text-lg text-zinc-100">{step.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{step.text}</p>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-3xl mb-6">{t("faq")}</h2>
          <div className="flex flex-col gap-3">
            {getFaq(locale).map((f) => (
              <details key={f.q} className="group rounded-md border-[.5px] border-zinc-700 bg-zinc-900/40 p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-zinc-100">
                  {f.q}
                  <ChevronDown className="w-4 h-4 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-zinc-400">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        <div id="buyurtma" className="lg:col-span-3 scroll-mt-24">
          <Card className="p-6 md:p-10 bg-black/40">
            <h2 className="text-3xl mb-2">{t("orderTitle")}</h2>
            <p className="mb-6 text-sm text-zinc-500">{t("orderNote")}</p>
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
