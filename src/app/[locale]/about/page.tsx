import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  FaEnvelope,
  FaGithub,
  FaGitlab,
  FaLinkedin,
  FaLocationDot,
  FaPhone,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa6";
import { ArrowUpRight, BriefcaseBusiness, FileText, GitFork, GraduationCap, Star } from "lucide-react";
import ToolsCarousel from "./tools-carousel";
import {
  GITHUB_USER,
  getContributions,
  getGithubProfile,
  getGithubRepos,
  languageShares,
} from "@/lib/github";
import { getCommittersRank } from "@/lib/committers";
import Timeline from "@/components/profile/timeline";
import { educationTimeline, experienceTimeline } from "@/data/timeline";
import { spokenLanguages } from "@/data/skills";
import { experienceYears } from "@/data/profile";
import { pick } from "@/data/types";
import projects from "@/data/projects";
import ContributionGraph from "@/components/profile/contribution-graph";
import { formatDate } from "@/lib/utils";
import JsonLd from "@/components/seo/json-ld";
import { pageJsonLd, pageMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";

export const revalidate = 3600;

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "about" });
  return pageMetadata(locale, "/about", `${t("metaTitle")} | Husan Suyunov`, t("metaDescription"));
}

const FALLBACK_AVATAR = "https://avatars.githubusercontent.com/u/109731657?v=4";

const KEY_PROJECTS = [
  { name: "MarosimGo", href: "https://github.com/Xusanbek0039/Marosim-Go" },
  { name: "ITC Academy", href: "https://itc-academy.uz/" },
  { name: "ITC Zomin LMS", href: "https://www.itclms.uz/" },
  { name: "Goodever.uz", href: "https://goodever.uz/" },
  { name: "@itc_academybot", href: "https://t.me/itc_academybot" },
];


const OTHER: Record<string, string> = { uz: "Boshqa", ru: "Другие", en: "Other" };

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`p-6 md:p-10 border-[.5px] rounded-md border-zinc-600 ${className}`}
    style={{ backdropFilter: "blur(2px)" }}
  >
    {children}
  </div>
);

async function Page({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tl = await getTranslations("cvSkills.langs");

  const [gh, repos, contributions, committers] = await Promise.all([
    getGithubProfile(),
    getGithubRepos(),
    getContributions(),
    getCommittersRank(),
  ]);
  const recentRepos = repos.slice(0, 6);
  const languages = languageShares(repos);
  const avatar = gh?.avatar_url ?? FALLBACK_AVATAR;

  const contacts = [
    { name: "Email", content: "itpark0071@gmail.com", href: "mailto:itpark0071@gmail.com", icon: <FaEnvelope /> },
    { name: t("phone"), content: "+998 97 521 66 86", href: "tel:+998975216686", icon: <FaPhone /> },
    { name: "Telegram", content: "@husanbek_coder", href: "https://t.me/husanbek_coder", icon: <FaTelegram /> },
    { name: "GitHub", content: GITHUB_USER, href: `https://github.com/${GITHUB_USER}`, icon: <FaGithub /> },
    { name: "GitLab", content: "Xusanbek0071", href: "https://gitlab.com/Xusanbek0071", icon: <FaGitlab /> },
    { name: "LinkedIn", content: "xusanbek0039", href: "https://www.linkedin.com/in/xusanbek0039/", icon: <FaLinkedin /> },
    { name: "YouTube", content: "IT Creative", href: "https://www.youtube.com/@IT_Creative/", icon: <FaYoutube /> },
  ];

  const stats = [
    { value: `${experienceYears()}+`, label: t("stats.experience") },
    { value: gh ? String(gh.public_repos) : "130+", label: t("stats.repos") },
    { value: gh ? String(gh.followers) : "30+", label: t("stats.followers") },
    { value: String(projects.length), label: t("stats.projects") },
    { value: `#${committers.rank}`, label: t("stats.committers", { total: committers.total }), href: committers.url },
    { value: String(contributions?.total ?? committers.contribs), label: t("stats.contributions") },
  ];

  const present = await getTranslations("experienceSection");
  const experience = experienceTimeline(locale, {
    present: present("present"),
    kinds: {
      teaching: present("kinds.teaching"),
      management: present("kinds.management"),
      development: present("kinds.development"),
    },
  });
  const education = educationTimeline(locale, present("present"));
  const bold = (chunks: React.ReactNode) => <b>{chunks}</b>;

  const tn = await getTranslations("nav");
  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[200px] text-zinc-300 pt-20 pb-20">
      <JsonLd
        data={pageJsonLd({
          type: "ProfilePage",
          locale,
          path: "/about",
          name: t("metaTitle"),
          description: t("metaDescription"),
          crumbs: [
            { name: tn("home"), path: "/" },
            { name: tn("about"), path: "/about" },
          ],
        })}
      />
      <div className="flex flex-col lg:flex-row gap-5">
        <aside className="w-full lg:basis-1/4 lg:min-w-[280px]">
          <div
            className="p-4 md:p-8 rounded-2xl border-[.5px] border-zinc-600 lg:sticky lg:top-24"
            style={{ backdropFilter: "blur(2px)" }}
          >
            <div className="flex flex-row lg:flex-col items-center">
              <div className="flex justify-center items-center lg:w-full lg:aspect-square bg-zinc-800 rounded-xl lg:mb-5">
                <Image
                  className="rounded-full m-4 lg:m-8 w-[100px] md:w-[150px] lg:w-[200px] aspect-square object-cover"
                  alt={t("avatarAlt")}
                  src={avatar}
                  width={400}
                  height={400}
                  priority
                />
              </div>
              <div className="flex flex-col gap-2 lg:items-center ml-6 md:ml-12 lg:ml-0">
                <p className="text-xl lg:text-center">Husan Suyunov</p>
                <div className="text-xs bg-zinc-700 w-fit px-3 py-1 rounded-full">{t("role")}</div>
                <p className="flex items-center gap-2 text-xs text-zinc-400">
                  <FaLocationDot /> {t("location")}
                </p>
              </div>
            </div>
            <Link
              href="/resume"
              className="mt-6 flex items-center justify-center gap-2 h-11 rounded-md bg-zinc-200 text-black text-sm hover:bg-white transition-colors"
            >
              <FileText className="w-4 h-4" />
              {t("cv")}
            </Link>
            <hr className="my-6 border-zinc-600" />
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {contacts.map((link) => (
                <li key={link.href}>
                  <a
                    className="flex items-center px-3 gap-3 w-full h-12 border-zinc-700 bg-zinc-800 hover:border-zinc-500 border-[.5px] rounded-md transition-colors"
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                  >
                    <div className="w-6 text-lg">{link.icon}</div>
                    <div className="flex flex-col min-w-0">
                      <div className="text-sm">{link.name}</div>
                      <div className="text-xs text-zinc-400 truncate">{link.content}</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="lg:basis-3/4 min-w-0 flex flex-col gap-5">
          <Card>
            <h1 className="text-3xl mb-6">{t("title")}</h1>
            <p className="mb-5 leading-relaxed">{t.rich("p1", { b: bold })}</p>
            <p className="mb-5 leading-relaxed">{t.rich("p2", { b: bold })}</p>
            <p className="leading-relaxed text-zinc-400">{t("p3")}</p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
              {stats.map((s) => {
                const body = (
                  <>
                    <div className="text-3xl text-zinc-100">{s.value}</div>
                    <div className="mt-1 text-xs text-zinc-400">{s.label}</div>
                  </>
                );
                const cls = "block rounded-md border-[.5px] border-zinc-700 bg-zinc-800/60 p-4 text-center";
                return "href" in s && s.href ? (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={`${cls} hover:border-emerald-500 transition-colors`}>
                    {body}
                  </a>
                ) : (
                  <div key={s.label} className={cls}>{body}</div>
                );
              })}
            </div>
          </Card>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <Card>
              <h2 className="text-2xl mb-6 flex items-center gap-3">
                <BriefcaseBusiness className="w-6 h-6" aria-hidden="true" /> {t("experienceTitle")}
              </h2>
              <Timeline items={experience} currentLabel={present("current")} />
            </Card>
            <Card>
              <h2 className="text-2xl mb-6 flex items-center gap-3">
                <GraduationCap className="w-6 h-6" aria-hidden="true" /> {t("educationTitle")}
              </h2>
              <Timeline items={education} />
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <Card>
              <h2 className="text-2xl mb-6">{t("keyProjects")}</h2>
              <ul className="flex flex-wrap gap-2">
                {KEY_PROJECTS.map((p) => (
                  <li key={p.name}>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-md border-[.5px] border-zinc-600 hover:border-zinc-400 transition-colors"
                    >
                      {p.name}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-zinc-400">{t("alsoProjects")}</p>
            </Card>
            <Card>
              <h2 className="text-2xl mb-6">{t("languages")}</h2>
              <div>
                <ul className="flex flex-col gap-3">
                  {spokenLanguages.map((lang) => (
                    <li key={lang.id} className="flex justify-between gap-4 text-sm">
                      <span>{pick(lang.name, locale)}</span>
                      <span className="font-mono text-zinc-400">{lang.level ?? tl("native")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          {(recentRepos.length > 0 || languages.length > 0) && (
            <Card>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl flex items-center gap-3">
                  <FaGithub /> {t("github")}
                </h2>
                <a
                  href={`https://github.com/${GITHUB_USER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  github.com/{GITHUB_USER}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {contributions && (
                <div className="mb-8">
                  <ContributionGraph
                    data={contributions}
                    totalLabel={t("contributions", { count: contributions.total })}
                    dayLabel={(date, count) =>
                      t("contributionDay", { date: formatDate(date) ?? date, count })
                    }
                    less={t("less")}
                    more={t("more")}
                  />
                </div>
              )}

              {languages.length > 0 && (
                <div className="mb-8">
                  <h3 className="mb-3 text-sm text-zinc-400">{t("githubLanguages")}</h3>
                  <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-zinc-800">
                    {languages.map((l) => (
                      <span
                        key={l.name}
                        title={`${l.name}: ${l.percent}%`}
                        style={{ width: `${l.percent}%`, backgroundColor: l.color }}
                      />
                    ))}
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs">
                    {languages.map((l) => (
                      <li key={l.name} className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                        <span className="text-zinc-300">{l.name === "Boshqa" ? OTHER[locale] ?? l.name : l.name}</span>
                        <span className="text-zinc-400">{l.percent}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recentRepos.length > 0 && (
                <>
                  <h3 className="mb-3 text-sm text-zinc-400">{t("githubRecent")}</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {recentRepos.map((r) => (
                      <li key={r.name}>
                        <a
                          href={r.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col h-full p-4 rounded-md border-[.5px] border-zinc-700 bg-zinc-800/40 hover:border-zinc-500 transition-colors"
                        >
                          <span className="text-zinc-100 truncate">{r.name}</span>
                          <span className="mt-1 text-xs text-zinc-400 line-clamp-2 min-h-[2rem]">
                            {r.description ?? t("noDescription")}
                          </span>
                          <span className="mt-3 flex items-center gap-4 text-xs text-zinc-400">
                            {r.language && (
                              <span className="flex items-center gap-1">
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{
                                    backgroundColor:
                                      languages.find((l) => l.name === r.language)?.color ?? "#71717a",
                                  }}
                                />
                                {r.language}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3" /> {r.stargazers_count}
                            </span>
                            <span className="flex items-center gap-1">
                              <GitFork className="w-3 h-3" /> {r.forks_count}
                            </span>
                            <span className="ml-auto">{formatDate(r.pushed_at)}</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Card>
          )}

          <Card>
            <h2 className="text-2xl mb-6">{t("tools")}</h2>
            <ToolsCarousel />
          </Card>
        </main>
      </div>
    </div>
  );
}

export default Page;
