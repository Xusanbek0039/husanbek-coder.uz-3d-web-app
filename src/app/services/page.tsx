import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { SERVICES, PROCESS, FAQ, BUDGETS } from "@/data/services";
import projects from "@/data/projects";
import OrderForm from "@/components/OrderForm";

export const metadata: Metadata = {
  title: "Xizmatlar | Husan Suyunov",
  description:
    "Web sayt, LMS/CRM tizim, Telegram bot, sun'iy intellekt integratsiyasi va mentorlik — Husan Suyunov bilan loyihangizni boshlang.",
  alternates: { canonical: "/services" },
};

const projectTitle = (id: string) => projects.find((p) => p.id === id)?.title;

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`border-[.5px] rounded-md border-zinc-600 ${className}`}
    style={{ backdropFilter: "blur(2px)" }}
  >
    {children}
  </div>
);

function Page({ searchParams }: { searchParams: { service?: string } }) {
  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[150px] text-zinc-300 pt-[100px] pb-20">
      <header className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl">Xizmatlar</h1>
        <p className="mt-4 text-zinc-400 leading-relaxed">
          G&apos;oyadan ishlaydigan mahsulotgacha: web sayt, o&apos;quv va biznes
          tizimlari, Telegram botlar va sun&apos;iy intellekt. Real loyihalarda
          sinalgan texnologiyalar bilan ishlayman.
        </p>
        <a
          href="#buyurtma"
          className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded-md bg-zinc-200 text-black text-sm hover:bg-white transition-colors"
        >
          Loyihani muhokama qilish <ArrowRight className="w-4 h-4" />
        </a>
      </header>

      <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {SERVICES.map((s) => (
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
                {s.stack.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {s.examples.length > 0 && (
                <p className="mt-4 text-xs text-zinc-500">
                  Misollar:{" "}
                  {s.examples.map((id, i) => (
                    <React.Fragment key={id}>
                      {i > 0 && ", "}
                      <Link href={`/projects/${id}`} className="underline hover:text-zinc-200">
                        {projectTitle(id)?.split(" — ")[0] ?? id}
                      </Link>
                    </React.Fragment>
                  ))}
                </p>
              )}
              <div className="mt-auto pt-6 flex items-center justify-between gap-3">
                <span className="text-sm text-zinc-400">{s.price}</span>
                <Link
                  href={`/services?service=${s.id}#buyurtma`}
                  scroll={false}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-md border-[.5px] border-zinc-600 hover:border-zinc-400 transition-colors"
                >
                  Buyurtma berish <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      <section className="mt-16">
        <h2 className="text-3xl mb-6">Qanday ishlayman</h2>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS.map((step, i) => (
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
          <h2 className="text-3xl mb-6">Ko&apos;p beriladigan savollar</h2>
          <div className="flex flex-col gap-3">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-md border-[.5px] border-zinc-700 bg-zinc-900/40 p-4"
              >
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
            <h2 className="text-3xl mb-2">Buyurtma berish</h2>
            <p className="mb-6 text-sm text-zinc-500">
              Ariza to&apos;g&apos;ridan-to&apos;g&apos;ri menga Telegram va emailga keladi.
            </p>
            <OrderForm
              services={SERVICES.map(({ id, title }) => ({ id, title }))}
              budgets={BUDGETS}
              defaultService={searchParams.service}
            />
          </Card>
        </div>
      </section>
    </div>
  );
}

export default Page;
