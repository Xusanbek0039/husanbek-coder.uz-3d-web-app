import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaLocationDot,
  FaPhone,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa6";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  FileText,
  GitFork,
  GraduationCap,
  Star,
} from "lucide-react";
import ToolsCarousel from "./tools-carousel";
import {
  GITHUB_USER,
  getContributions,
  getGithubProfile,
  getGithubRepos,
  languageShares,
  type Contributions,
} from "@/lib/github";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Men haqimda | Husan Suyunov",
  description:
    "Husan Suyunov — Full-Stack Python dasturchi. Django, FastAPI, React, LMS/CRM tizimlari, AI va Telegram botlar.",
};

const FALLBACK_AVATAR = "https://avatars.githubusercontent.com/u/109731657?v=4";
const CV_URL =
  "https://drive.google.com/file/d/1CeOgFcAtSVFQ-uLgslayaFbH1eCEwDEM/view?usp=sharing";

const CONTACT_LINKS = [
  {
    name: "Email",
    content: "itpark0071@gmail.com",
    href: "mailto:itpark0071@gmail.com",
    icon: <FaEnvelope />,
  },
  {
    name: "Telefon",
    content: "+998 97 521 66 86",
    href: "tel:+998975216686",
    icon: <FaPhone />,
  },
  {
    name: "Telegram",
    content: "@husanbek_coder",
    href: "https://t.me/husanbek_coder",
    icon: <FaTelegram />,
  },
  {
    name: "GitHub",
    content: GITHUB_USER,
    href: `https://github.com/${GITHUB_USER}`,
    icon: <FaGithub />,
  },
  {
    name: "LinkedIn",
    content: "xusanbek0039",
    href: "https://www.linkedin.com/in/xusanbek0039/",
    icon: <FaLinkedin />,
  },
  {
    name: "YouTube",
    content: "IT Creative",
    href: "https://www.youtube.com/@IT_Creative/",
    icon: <FaYoutube />,
  },
];

const EXPERIENCE = [
  {
    period: "2023 — hozir",
    title: "Filial rahbari",
    place: "IT Park Zomin tuman filiali",
    text: "Filial faoliyatini boshqarish, o‘quv jarayonini raqamlashtirish: itclms.uz va ITC Academy platformalarini ishlab chiqish va yuritish.",
  },
  {
    period: "2022",
    title: "O‘qituvchi",
    place: "IT Creative — IT Creative Academy",
    text: "Python, web dasturlash va Telegram botlar bo‘yicha darslar; o‘quvchilar uchun amaliy loyihalar.",
  },
  {
    period: "2021 — 2022",
    title: "Buxgalter yordamchisi",
    place: "“Sharqona Garden Travel” Toshkent viloyati",
    text: "Moliyaviy hujjatlar bilan ishlash — biznes jarayonlarini avtomatlashtirishga qiziqishim shu yerdan boshlangan.",
  },
];

const EDUCATION = [
  {
    period: "2022 — 2026",
    title: "Tarmoqlarda biznesni boshqarish",
    place: "Toshkent Xalqaro Kimyo Universiteti",
  },
  {
    period: "2021 — 2022",
    title: "HTML + CSS, JavaScript, TypeScript, React",
    place: "PDP Academy",
  },
  {
    period: "2019 — 2021",
    title: "Python algoritmlar, Telegram botlar, web freymvorklar",
    place: "MohirDev platformasi",
  },
];

const KEY_PROJECTS = [
  { name: "MarosimGo", href: "https://github.com/Xusanbek0039/Marosim-Go" },
  { name: "ITC Academy", href: "https://itc-academy.uz/" },
  { name: "ITC Zomin LMS", href: "https://www.itclms.uz/" },
  { name: "Goodever.uz", href: "https://goodever.uz/" },
  { name: "@itc_academybot", href: "https://t.me/itc_academybot" },
];

const LANGUAGES = [
  { name: "O‘zbek tili", level: 100, note: "ona tili" },
  { name: "Rus tili", level: 50 },
  { name: "Ingliz tili", level: 45 },
  { name: "Koreys tili", level: 30 },
];

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`p-6 md:p-10 border-[.5px] rounded-md border-zinc-600 ${className}`}
    style={{ backdropFilter: "blur(2px)" }}
  >
    {children}
  </div>
);

const Timeline = ({
  items,
}: {
  items: { period: string; title: string; place: string; text?: string }[];
}) => (
  <ol className="relative border-l border-zinc-700 ml-2">
    {items.map((item) => (
      <li key={item.period + item.title} className="mb-8 last:mb-0 ml-6">
        <span className="absolute -left-[5px] mt-2 w-[9px] h-[9px] rounded-full bg-zinc-300" />
        <p className="text-xs font-mono text-zinc-500">{item.period}</p>
        <h3 className="text-lg text-zinc-200">{item.title}</h3>
        <p className="text-sm text-zinc-400">{item.place}</p>
        {item.text && (
          <p className="mt-2 text-sm text-zinc-500">{item.text}</p>
        )}
      </li>
    ))}
  </ol>
);

const LEVEL_CLASS = [
  "bg-zinc-800",
  "bg-emerald-900",
  "bg-emerald-700",
  "bg-emerald-500",
  "bg-emerald-300",
];

const ContributionGraph = ({ data }: { data: Contributions }) => (
  <div>
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-[3px] w-max">
        {data.weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((d) => (
              <span
                key={d.date}
                title={`${formatDate(d.date)}: ${d.count} ta hissa`}
                className={`block w-[10px] h-[10px] rounded-[2px] ${LEVEL_CLASS[d.level]}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
    <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
      <span>So&apos;nggi bir yilda {data.total} ta hissa (contribution)</span>
      <span className="flex items-center gap-1">
        Kam
        {LEVEL_CLASS.map((c) => (
          <span key={c} className={`block w-[10px] h-[10px] rounded-[2px] ${c}`} />
        ))}
        Ko&apos;p
      </span>
    </div>
  </div>
);

async function Page() {
  const [gh, repos, contributions] = await Promise.all([
    getGithubProfile(),
    getGithubRepos(),
    getContributions(),
  ]);
  const recentRepos = repos.slice(0, 6);
  const languages = languageShares(repos);
  const avatar = gh?.avatar_url ?? FALLBACK_AVATAR;

  const stats = [
    { value: "7+", label: "yillik tajriba" },
    { value: gh ? String(gh.public_repos) : "130+", label: "GitHub repozitoriy" },
    { value: gh ? String(gh.followers) : "30+", label: "GitHub kuzatuvchi" },
    { value: "10+", label: "real loyiha" },
  ];

  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[200px] text-zinc-300 pt-20 pb-20">
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
                  alt="Husan Suyunov"
                  src={avatar}
                  width={400}
                  height={400}
                  priority
                />
              </div>
              <div className="flex flex-col gap-2 lg:items-center ml-6 md:ml-12 lg:ml-0">
                <p className="text-xl lg:text-center">Husan Suyunov</p>
                <div className="text-xs bg-zinc-700 w-fit px-3 py-1 rounded-full">
                  Full-Stack Python Developer
                </div>
                <p className="flex items-center gap-2 text-xs text-zinc-500">
                  <FaLocationDot /> Jizzax, Sh. Rashidov tumani
                </p>
              </div>
            </div>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 h-11 rounded-md bg-zinc-200 text-black text-sm hover:bg-white transition-colors"
            >
              <FileText className="w-4 h-4" />
              Resume CV ko&apos;rish
            </a>
            <hr className="my-6 border-zinc-600" />
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {CONTACT_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    className="flex items-center px-3 gap-3 w-full h-12 border-zinc-700 bg-zinc-800 hover:border-zinc-500 border-[.5px] rounded-md transition-colors"
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                  >
                    <div className="w-6 text-lg">{link.icon}</div>
                    <div className="flex flex-col min-w-0">
                      <div className="text-sm">{link.name}</div>
                      <div className="text-xs text-zinc-500 truncate">
                        {link.content}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="lg:basis-3/4 min-w-0 flex flex-col gap-5">
          <Card>
            <h1 className="text-3xl mb-6">Men haqimda</h1>
            <p className="mb-5 leading-relaxed">
              Assalomu alaykum! Men <b>Suyunov Husan</b> — Full-Stack Python
              dasturchiman. Python, Django, FastAPI va React yordamida web
              ilovalar, LMS va CRM tizimlarini backend va frontend qismlari bilan
              to&apos;liq ishlab chiqaman. Sun&apos;iy intellekt (NLP, Machine
              Learning) loyihalari va Telegram botlar yaratish ham asosiy
              yo&apos;nalishlarimdan.
            </p>
            <p className="mb-5 leading-relaxed">
              Hozirda <b>IT Park Zomin tuman filiali rahbari</b> sifatida ta&apos;lim
              jarayonini raqamlashtirish ustida ishlayman: itclms.uz, ITC
              Academy platformasi va uning Telegram boti — shu ishning
              natijalari. Toshkent Xalqaro Kimyo Universitetida &laquo;Tarmoqlarda
              biznesni boshqarish&raquo; yo&apos;nalishida tahsil olaman, shuning
              uchun loyihalarga texnik va biznes nuqtai nazaridan birdek
              qarayman.
            </p>
            <p className="leading-relaxed text-zinc-400">
              Yangi texnologiyalarni o&apos;rganish va murakkab muammolarga
              innovatsion yechim topish — mening ustuvor vazifalarim. Barcha
              loyiha kodlarim GitHub&apos;da ochiq.
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-md border-[.5px] border-zinc-700 bg-zinc-800/60 p-4 text-center"
                >
                  <div className="text-3xl text-zinc-100">{s.value}</div>
                  <div className="mt-1 text-xs text-zinc-500">{s.label}</div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <Card>
              <h2 className="text-2xl mb-6 flex items-center gap-3">
                <BriefcaseBusiness className="w-6 h-6" /> Ish tajribasi
              </h2>
              <Timeline items={EXPERIENCE} />
            </Card>
            <Card>
              <h2 className="text-2xl mb-6 flex items-center gap-3">
                <GraduationCap className="w-6 h-6" /> Ta&apos;lim
              </h2>
              <Timeline items={EDUCATION} />
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <Card>
              <h2 className="text-2xl mb-6">Asosiy loyihalar</h2>
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
              <p className="mt-4 text-sm text-zinc-500">
                Shuningdek: KIUT LMS (universitet uchun LMS) va IT Creative AI.
              </p>
            </Card>
            <Card>
              <h2 className="text-2xl mb-6">Tillar</h2>
              <div className="flex flex-col gap-4">
                {LANGUAGES.map((lang) => (
                  <div key={lang.name}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>{lang.name}</span>
                      <span className="font-mono text-zinc-500">
                        {lang.note ?? `${lang.level}%`}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-zinc-300"
                        style={{ width: `${lang.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {(recentRepos.length > 0 || languages.length > 0) && (
            <Card>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl flex items-center gap-3">
                  <FaGithub /> GitHub faolligi
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
                  <ContributionGraph data={contributions} />
                </div>
              )}

              {languages.length > 0 && (
                <div className="mb-8">
                  <h3 className="mb-3 text-sm text-zinc-400">
                    Repozitoriylardagi asosiy tillar
                  </h3>
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
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: l.color }}
                        />
                        <span className="text-zinc-300">{l.name}</span>
                        <span className="text-zinc-500">{l.percent}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recentRepos.length > 0 && (
                <>
                  <h3 className="mb-3 text-sm text-zinc-400">So&apos;nggi yangilangan repolar</h3>
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
                          <span className="mt-1 text-xs text-zinc-500 line-clamp-2 min-h-[2rem]">
                            {r.description ?? "Tavsif yo'q"}
                          </span>
                          <span className="mt-3 flex items-center gap-4 text-xs text-zinc-500">
                            {r.language && (
                              <span className="flex items-center gap-1">
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{
                                    backgroundColor:
                                      languages.find((l) => l.name === r.language)?.color ??
                                      "#71717a",
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
            <h2 className="text-2xl mb-6">Men foydalanadigan texnologiyalar</h2>
            <ToolsCarousel />
          </Card>
        </main>
      </div>
    </div>
  );
}

export default Page;
