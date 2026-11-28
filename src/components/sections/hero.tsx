import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import { Briefcase, Download, File, FolderKanban, Trophy } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiGitlab, SiInstagram, SiTelegram, SiYoutube } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { config } from "@/data/config";
import { CV_PDF_PATH } from "@/data/profile";
import { Link as LocaleLink } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const AVATAR = "https://avatars.githubusercontent.com/u/109731657?v=4";

export type HeroProps = {
  rank: number;
  rankUrl: string;
  /** Tajriba yillari, loyihalar soni, o'quvchilar soni — src/data dan hisoblanadi */
  metrics: { years: number; projects: number; students: number | null };
  /** public/cv/ da PDF bormi */
  cvAvailable: boolean;
};

const SOCIALS = [
  { href: config.social.telegram, label: "Telegram", icon: SiTelegram },
  { href: config.social.instagram, label: "Instagram", icon: SiInstagram },
  { href: config.social.github, label: "GitHub", icon: SiGithub },
  { href: config.social.gitlab, label: "GitLab", icon: SiGitlab },
  { href: config.social.linkedin, label: "LinkedIn", icon: FaLinkedin },
  { href: config.social.youtube, label: "YouTube", icon: SiYoutube },
];

const HeroSection = ({ rank, rankUrl, metrics, cvAvailable }: HeroProps) => {
  const t = useTranslations("hero");
  const { isLoading } = usePreloader();

  const metricItems = [
    { value: `${metrics.years}+`, label: t("metrics.years") },
    { value: String(metrics.projects), label: t("metrics.projects") },
    ...(metrics.students != null ? [{ value: `${metrics.students}+`, label: t("metrics.students") }] : []),
  ];

  return (
    <section id="hero" aria-labelledby="hero-title" className={cn("relative w-full min-h-screen")}>
      <div className="grid md:grid-cols-2">
        {/* Matn server HTML'da bor (SEO). Ism (LCP) darhol ko'rinadi, qolganlari preloader tugagach animatsiya bilan chiqadi */}
        <div
          className={cn(
            "min-h-[calc(100dvh-3rem)] md:min-h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-28 pb-24 px-4 sm:pt-24 md:p-24 lg:p-32 xl:p-40"
          )}
        >
          <div>
            <BlurIn delay={0.5} play={!isLoading}>
              <div className="flex flex-wrap items-center gap-2 ml-3 mb-2">
                <span className="flex items-center gap-2 rounded-full border border-emerald-600/50 bg-emerald-500/10 pl-1 pr-3 py-1 text-xs text-emerald-800 dark:text-emerald-300 font-sans">
                  <Image
                    src={AVATAR}
                    alt={t("avatarAlt")}
                    width={24}
                    height={24}
                    priority
                    className="rounded-full w-6 h-6"
                  />
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  {t("openToWork")}
                </span>
                <a
                  href={rankUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-amber-600/50 bg-amber-500/10 px-3 py-1 text-xs text-amber-800 dark:text-amber-300 font-sans hover:bg-amber-500/20 transition-colors"
                >
                  <Trophy className="w-3.5 h-3.5" aria-hidden="true" />
                  {t("rankBadge", { rank })}
                </a>
              </div>
            </BlurIn>
            <BlurIn delay={0.7} play={!isLoading}>
              <p
                className={cn(
                  "md:self-start mt-4 font-thin text-md text-slate-600 dark:text-zinc-300 ml-3",
                  "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
                )}
              >
                {t("greeting")}
              </p>
            </BlurIn>
            <div>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <h1
                    id="hero-title"
                    className={cn(
                      "font-thin text-6xl text-transparent text-slate-800 ml-1 text-left",
                      "cursor-default text-edge-outline font-display sm:text-7xl md:text-9xl "
                    )}
                  >
                    {config.author.split(" ")[0]}
                    <br />
                    {config.author.split(" ")[1]}
                  </h1>
                </TooltipTrigger>
                <TooltipContent side="top" className="dark:bg-white dark:text-black">
                  {t("motto")}
                </TooltipContent>
              </Tooltip>
            </div>
            <BlurIn delay={1.2} play={!isLoading}>
              <p className="md:self-start md:mt-4 ml-3 max-w-xl text-md sm:text-xl text-slate-700 dark:text-zinc-200 font-display">
                {t("role")}
              </p>
            </BlurIn>
            <BlurIn delay={1.4} play={!isLoading}>
              <p className="ml-3 mt-2 max-w-md text-sm text-slate-700 dark:text-zinc-300 font-sans">
                {t("tagline")}
              </p>
            </BlurIn>
            {/* Ijtimoiy tarmoqlar — qisqa tavsif ostida */}
            <BlurIn delay={1.45} play={!isLoading}>
              <ul className="ml-3 mt-4 flex flex-wrap gap-3" aria-label={t("socials")}>
                {SOCIALS.map(({ href, label, icon: Icon }) => (
                  <li key={label}>
                    <Button asChild variant="outline" size="icon">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t("socialLabel", { name: label })}
                        title={label}
                      >
                        <Icon size={20} aria-hidden="true" />
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            </BlurIn>
            <BlurIn delay={1.5} play={!isLoading}>
              <dl className="ml-3 mt-5 flex flex-wrap gap-x-6 gap-y-2 font-sans">
                {metricItems.map((m) => (
                  <div key={m.label} className="flex items-baseline gap-1.5">
                    <dt className="sr-only">{m.label}</dt>
                    <dd className="text-2xl font-semibold text-slate-900 dark:text-white">{m.value}</dd>
                    <dd aria-hidden="true" className="text-xs text-slate-600 dark:text-zinc-300">
                      {m.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </BlurIn>
          </div>

          <div className="mt-8 md:ml-2 flex flex-col gap-3 w-full max-w-md">
            <div className="flex flex-col sm:flex-row gap-3">
              <BoxReveal delay={1.8} width="100%">
                <Button asChild className="flex items-center gap-2 w-full">
                  <a href="#projects">
                    <FolderKanban size={20} aria-hidden="true" />
                    {t("viewProjects")}
                  </a>
                </Button>
              </BoxReveal>
              <BoxReveal delay={1.9} width="100%">
                <Button asChild variant="secondary" className="flex items-center gap-2 w-full">
                  <LocaleLink href="/services#buyurtma">
                    <Briefcase size={20} aria-hidden="true" />
                    {t("order")}
                  </LocaleLink>
                </Button>
              </BoxReveal>
            </div>
            <div className="md:self-start flex flex-wrap gap-3">
              <Button asChild variant="outline" className="flex items-center gap-2">
                <LocaleLink href="/resume">
                  <File size={18} aria-hidden="true" />
                  {t("cv")}
                </LocaleLink>
              </Button>
              {cvAvailable && (
                <Button asChild variant="outline" className="flex items-center gap-2">
                  <a href={CV_PDF_PATH} download="Husan-Suyunov-CV.pdf">
                    <Download size={18} aria-hidden="true" />
                    {t("cvDownload")}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="grid col-span-1"></div>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]" aria-hidden="true">
        <ScrollDownIcon />
      </div>
    </section>
  );
};

export default HeroSection;
