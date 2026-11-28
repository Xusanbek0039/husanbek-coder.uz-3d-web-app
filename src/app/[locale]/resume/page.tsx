import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FileDown } from "lucide-react";
import projects from "@/data/projects";
import { localizeProject } from "@/data/projects-i18n";
import { config } from "@/data/config";
import JsonLd from "@/components/seo/json-ld";
import { pageJsonLd, pageMetadata } from "@/lib/seo";
import { getGithubProfile, GITHUB_USER } from "@/lib/github";
import { getCommittersRank } from "@/lib/committers";
import { displayHost } from "@/components/profile/project-links";
import PrintButton from "./print-button";
import { competencies, skills, spokenLanguages } from "@/data/skills";
import { experience as experienceData, sortedExperience } from "@/data/experience";
import { educationTimeline, experienceTimeline } from "@/data/timeline";
import { CV_PDF_PATH, experienceYears } from "@/data/profile";
import { pick } from "@/data/types";
import { hasCvPdf } from "@/lib/cv";

export const revalidate = 3600;

type Props = { params: { locale: string } };

// public/cv/ dagi PDF hali qo'yilmagan bo'lsa, eski Google Drive havolasi ishlatiladi
const CV_DRIVE_URL =
  "https://drive.google.com/file/d/1CeOgFcAtSVFQ-uLgslayaFbH1eCEwDEM/view?usp=sharing";

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "resume" });
  return pageMetadata(locale, "/resume", t("metaTitle"), t("metaDescription"));
}

const KEY_PROJECT_IDS = ["marosimgo", "itc-academy", "itc-lms", "itc-academy-bot", "goodever"];

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-7 break-inside-avoid-page">
    <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-800 border-b border-zinc-200 pb-1 mb-3">
      {title}
    </h2>
    {children}
  </section>
);

async function Page({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations("resume");
  const tl = await getTranslations("cvSkills.langs");
  const tk = await getTranslations("cvSkills");
  const tp = await getTranslations("experienceSection");
  const cvAvailable = hasCvPdf();
  const [gh, rank] = await Promise.all([getGithubProfile(), getCommittersRank()]);

  const labels = {
    present: tp("present"),
    kinds: {
      teaching: tp("kinds.teaching"),
      management: tp("kinds.management"),
      development: tp("kinds.development"),
    },
  };
  const experience = experienceTimeline(locale, labels);
  const currentRoles = sortedExperience().filter((e) => e.end === null);
  const facts = [
    { value: `${experienceYears()}+`, label: t("facts.years") },
    { value: String(experienceData.length), label: t("facts.positions") },
    { value: String(projects.length), label: t("facts.projects") },
    { value: `#${rank.rank}`, label: t("facts.rank") },
  ];
  const education = educationTimeline(locale, tp("present"));
  const keyProjects = KEY_PROJECT_IDS.map((id) => projects.find((p) => p.id === id))
    .filter((p): p is (typeof projects)[number] => Boolean(p))
    .map((p) => localizeProject(p, locale));

  const contacts = [
    { label: config.email, href: `mailto:${config.email}` },
    { label: "+998 97 521 66 86", href: "tel:+998975216686" },
    { label: "t.me/husanbek_coder", href: config.social.telegram },
    { label: `github.com/${GITHUB_USER}`, href: `https://github.com/${GITHUB_USER}` },
    { label: "linkedin.com/in/husan-suyunov-b6887933b", href: config.social.linkedin },
    { label: "husanbek-coder.uz", href: config.site },
  ];

  const tn = await getTranslations("nav");
  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[200px] pt-24 pb-20">
      <JsonLd
        data={pageJsonLd({
          type: "ProfilePage",
          locale,
          path: "/resume",
          name: t("metaTitle"),
          description: t("metaDescription"),
          crumbs: [
            { name: tn("home"), path: "/" },
            { name: tn("resume"), path: "/resume" },
          ],
        })}
      />
      <div className="no-print mb-5 flex flex-wrap items-center justify-end gap-3">
        <PrintButton label={t("print")} />
        <a
          href={cvAvailable ? CV_PDF_PATH : CV_DRIVE_URL}
          target={cvAvailable ? undefined : "_blank"}
          rel="noopener noreferrer"
          download={cvAvailable ? "Husan-Suyunov-CV.pdf" : undefined}
          className="flex items-center gap-2 h-10 px-4 rounded-md border-[.5px] border-zinc-500 text-zinc-200 text-sm hover:border-zinc-300 transition-colors"
        >
          <FileDown className="w-4 h-4" aria-hidden="true" />
          {cvAvailable ? t("download") : t("pdf")}
        </a>
      </div>

      <article
        id="resume"
        className="mx-auto max-w-4xl rounded-lg bg-white text-zinc-800 shadow-2xl p-8 md:p-14 font-sans print:shadow-none print:p-0"
      >
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b-2 border-zinc-900 pb-5">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900">Husan Suyunov</h1>
            <p className="mt-1 text-xl text-emerald-800 font-semibold">{t("title")}</p>
            <ul className="mt-2 space-y-0.5 text-sm text-zinc-700">
              {currentRoles.map((r) => (
                <li key={r.id}>
                  <span className="font-semibold">{pick(r.role, locale)}</span> — {pick(r.organization, locale)}
                </li>
              ))}
            </ul>
            <p className="mt-1 text-sm text-zinc-600">{t("location")}</p>
          </div>
          <ul className="text-sm text-zinc-600 md:text-right">
            {contacts.map((c) => (
              <li key={c.href}>
                <a href={c.href} className="inline-block py-1 hover:text-emerald-800">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <dl className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
          {facts.map((f) => (
            <div key={f.label} className="rounded-md bg-zinc-100 p-3 text-center">
              <dt className="sr-only">{f.label}</dt>
              <dd className="text-2xl font-bold text-zinc-900">{f.value}</dd>
              <dd aria-hidden="true" className="text-xs text-zinc-600">{f.label}</dd>
            </div>
          ))}
        </dl>

        <Section title={t("summaryTitle")}>
          <p className="text-sm leading-relaxed">{t("summary", { years: experienceYears() })}</p>
        </Section>

        <Section title={t("competenciesTitle")}>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            {competencies.map((c) => (
              <li key={c.id} className="rounded-md border border-zinc-200 p-3 break-inside-avoid">
                <h3 className="font-semibold text-zinc-900">{pick(c.title, locale)}</h3>
                <p className="mt-1 text-zinc-600">{pick(c.description, locale)}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t("experienceTitle")}>
          <ol className="relative border-l-2 border-zinc-200 ml-1 space-y-5">
            {experience.map((e) => (
              <li key={e.period + e.title} className="ml-5 break-inside-avoid">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full ${
                    e.current ? "bg-emerald-600" : "bg-zinc-300"
                  }`}
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h3 className="text-base font-semibold text-zinc-900">{e.title}</h3>
                  <span className="flex items-center gap-2 text-xs font-mono text-zinc-600">
                    {e.current && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-sans text-emerald-800">
                        {tp("current")}
                      </span>
                    )}
                    {e.period}
                  </span>
                </div>
                <p className="text-sm text-zinc-700">{e.place}</p>
                {e.tags && e.tags.length > 0 && (
                  <p className="mt-1 text-xs text-zinc-600">{e.tags.join(" · ")}</p>
                )}
                {e.items && e.items.length > 0 && (
                  <ul className="mt-1 list-disc pl-4 text-sm text-zinc-700">
                    {e.items.map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </Section>

        <Section title={t("projectsTitle")}>
          <ul className="space-y-3">
            {keyProjects.map((p) => (
              <li key={p.id} className="text-sm break-inside-avoid">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="font-semibold text-zinc-900">{p.title}</h3>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-emerald-800 underline">
                      {displayHost(p.live)}
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-zinc-600 underline">
                      GitHub
                    </a>
                  )}
                </div>
                <p className="text-xs text-zinc-600">{p.category}</p>
                <p className="mt-0.5 text-zinc-600">{p.description}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t("skillsTitle")}>
          <dl className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-x-4 gap-y-1.5 text-sm">
            {(["core", "familiar"] as const).map((level) => (
              <React.Fragment key={level}>
                <dt className="font-semibold text-zinc-900">{tk(`levels.${level}`)}</dt>
                <dd className={level === "familiar" ? "text-zinc-600" : ""}>
                  {skills.filter((sk) => sk.level === level).map((sk) => sk.name).join(" · ")}
                </dd>
              </React.Fragment>
            ))}
          </dl>
        </Section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
          <Section title={t("educationTitle")}>
            <ul className="space-y-3 text-sm">
              {education.map((e) => (
                <li key={e.period + e.title}>
                  <h3 className="font-semibold text-zinc-900">{e.place}</h3>
                  <p className="text-zinc-600">{e.title}</p>
                  <p className="text-xs font-mono text-zinc-600">{e.period}</p>
                </li>
              ))}
            </ul>
          </Section>
          <div>
            <Section title={t("languagesTitle")}>
              <ul className="text-sm space-y-1">
                {spokenLanguages.map((l) => (
                  <li key={l.id} className="flex justify-between gap-4">
                    <span>{pick(l.name, locale)}</span>
                    {" "}
                    <span className="text-zinc-600">{l.level ?? `(${tl("native")})`}</span>
                  </li>
                ))}
              </ul>
            </Section>
            <Section title={t("achievementsTitle")}>
              <ul className="text-sm space-y-1.5 list-disc pl-4">
                <li>
                  <a href={rank.url} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-800">
                    {t("rank", { rank: rank.rank, total: rank.total, contribs: rank.contribs })}
                  </a>
                </li>
                {gh && <li>{t("repos", { count: gh.public_repos })}</li>}
              </ul>
            </Section>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Page;
