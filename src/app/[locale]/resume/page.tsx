import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FileDown } from "lucide-react";
import projects from "@/data/projects";
import { localizeProject } from "@/data/projects-i18n";
import { config } from "@/data/config";
import { alternatesFor } from "@/i18n/helpers";
import { getGithubProfile, GITHUB_USER } from "@/lib/github";
import { getCommittersRank } from "@/lib/committers";
import { displayHost } from "@/components/profile/project-links";
import PrintButton from "./print-button";

export const revalidate = 3600;

type Props = { params: { locale: string } };

const CV_PDF_URL =
  "https://drive.google.com/file/d/1CeOgFcAtSVFQ-uLgslayaFbH1eCEwDEM/view?usp=sharing";

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "resume" });
  return {
    title: `${t("metaTitle")} | Husan Suyunov`,
    description: t("metaDescription"),
    alternates: alternatesFor(locale, "/resume"),
  };
}

// Rezyumedagi ko'nikmalar — asosiy yo'nalish Python Backend
const SKILLS: { key: string; items: string[] }[] = [
  { key: "backend", items: ["Python", "Django", "Django REST Framework", "FastAPI", "Flask", "REST API"] },
  { key: "db", items: ["PostgreSQL", "MySQL", "SQLite"] },
  { key: "devops", items: ["Docker", "GitHub Actions (CI/CD)", "AWS", "Git"] },
  { key: "testing", items: ["PyTest", "Unit testing", "Integration testing"] },
  { key: "bots", items: ["aiogram", "Telethon", "Pyrogram"] },
  { key: "extra", items: ["React", "TypeScript", "HTML/CSS", "Machine Learning"] },
];

const KEY_PROJECT_IDS = ["marosimgo", "itc-academy", "itc-lms", "itc-academy-bot", "goodever"];

const LANGUAGES = [
  { key: "uz", level: null },
  { key: "ru", level: 50 },
  { key: "en", level: 45 },
  { key: "ko", level: 30 },
];

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-7 break-inside-avoid-page">
    <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-700 border-b border-zinc-200 pb-1 mb-3">
      {title}
    </h2>
    {children}
  </section>
);

async function Page({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations("resume");
  const ta = await getTranslations("about");
  const tl = await getTranslations("cvSkills.langs");
  const [gh, rank] = await Promise.all([getGithubProfile(), getCommittersRank()]);

  const experience = (["e1", "e2", "e3"] as const).map((k) => ({
    period: ta(`experience.${k}.period`),
    title: ta(`experience.${k}.title`),
    place: ta(`experience.${k}.place`),
    text: ta(`experience.${k}.text`),
  }));
  const education = (["d1", "d2", "d3"] as const).map((k) => ({
    period: ta(`education.${k}.period`),
    title: ta(`education.${k}.title`),
    place: ta(`education.${k}.place`),
  }));
  const keyProjects = KEY_PROJECT_IDS.map((id) => projects.find((p) => p.id === id))
    .filter((p): p is (typeof projects)[number] => Boolean(p))
    .map((p) => localizeProject(p, locale));

  const contacts = [
    { label: config.email, href: `mailto:${config.email}` },
    { label: "+998 97 521 66 86", href: "tel:+998975216686" },
    { label: "t.me/husanbek_coder", href: config.social.telegram },
    { label: `github.com/${GITHUB_USER}`, href: `https://github.com/${GITHUB_USER}` },
    { label: "linkedin.com/in/xusanbek0039", href: config.social.linkedin },
    { label: "husanbek-coder.uz", href: config.site },
  ];

  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[200px] pt-24 pb-20">
      <div className="no-print mb-5 flex flex-wrap items-center justify-end gap-3">
        <PrintButton label={t("print")} />
        <a
          href={CV_PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 h-10 px-4 rounded-md border-[.5px] border-zinc-500 text-zinc-200 text-sm hover:border-zinc-300 transition-colors"
        >
          <FileDown className="w-4 h-4" />
          {t("pdf")}
        </a>
      </div>

      <article
        id="resume"
        className="mx-auto max-w-4xl rounded-lg bg-white text-zinc-800 shadow-2xl p-8 md:p-14 font-sans print:shadow-none print:p-0"
      >
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b-2 border-zinc-900 pb-5">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900">Husan Suyunov</h1>
            <p className="mt-1 text-xl text-emerald-700 font-semibold">{t("title")}</p>
            <p className="mt-1 text-sm text-zinc-500">{t("location")}</p>
          </div>
          <ul className="text-sm text-zinc-600 md:text-right space-y-0.5">
            {contacts.map((c) => (
              <li key={c.href}>
                <a href={c.href} className="hover:text-emerald-700">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <Section title={t("summaryTitle")}>
          <p className="text-sm leading-relaxed">{t("summary")}</p>
        </Section>

        <Section title={t("skillsTitle")}>
          <dl className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-x-4 gap-y-1.5 text-sm">
            {SKILLS.map((g) => (
              <React.Fragment key={g.key}>
                <dt className="font-semibold text-zinc-900">{t(`skills.${g.key}`)}</dt>
                <dd className={g.key === "extra" ? "text-zinc-500" : ""}>{g.items.join(" · ")}</dd>
              </React.Fragment>
            ))}
          </dl>
        </Section>

        <Section title={t("experienceTitle")}>
          <ul className="space-y-4">
            {experience.map((e) => (
              <li key={e.period + e.title} className="break-inside-avoid">
                <div className="flex flex-wrap justify-between gap-2">
                  <h3 className="font-semibold text-zinc-900">
                    {e.title} — <span className="font-normal">{e.place}</span>
                  </h3>
                  <span className="text-xs font-mono text-zinc-500">{e.period}</span>
                </div>
                <p className="mt-1 text-sm text-zinc-600">{e.text}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t("projectsTitle")}>
          <ul className="space-y-3">
            {keyProjects.map((p) => (
              <li key={p.id} className="text-sm break-inside-avoid">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="font-semibold text-zinc-900">{p.title}</h3>
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">
                    {displayHost(p.live)}
                  </a>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 underline">
                      GitHub
                    </a>
                  )}
                </div>
                <p className="text-xs text-zinc-500">{p.category}</p>
                <p className="mt-0.5 text-zinc-600">{p.description}</p>
              </li>
            ))}
          </ul>
        </Section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
          <Section title={t("educationTitle")}>
            <ul className="space-y-3 text-sm">
              {education.map((e) => (
                <li key={e.period + e.title}>
                  <h3 className="font-semibold text-zinc-900">{e.place}</h3>
                  <p className="text-zinc-600">{e.title}</p>
                  <p className="text-xs font-mono text-zinc-500">{e.period}</p>
                </li>
              ))}
            </ul>
          </Section>
          <div>
            <Section title={t("languagesTitle")}>
              <ul className="text-sm space-y-1">
                {LANGUAGES.map((l) => (
                  <li key={l.key} className="flex justify-between">
                    <span>{tl(l.key)}</span>
                    <span className="text-zinc-500">{l.level == null ? tl("native") : `${l.level}%`}</span>
                  </li>
                ))}
              </ul>
            </Section>
            <Section title={t("achievementsTitle")}>
              <ul className="text-sm space-y-1.5 list-disc pl-4">
                <li>
                  <a href={rank.url} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700">
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
