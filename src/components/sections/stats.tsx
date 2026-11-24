"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Trophy } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { cn, formatDate } from "@/lib/utils";
import { config } from "@/data/config";
import SectionHeading from "@/components/ui/section-heading";
import ContributionGraph from "@/components/profile/contribution-graph";
import type { Contributions } from "@/lib/github";
import type { CommittersRank } from "@/lib/committers";

export type HomeStats = {
  repos: number | null;
  followers: number | null;
  contributions: Contributions | null;
  committers: CommittersRank;
  projects: number;
  /** Ish tajribasi yillari (src/data/profile.ts) */
  years: number;
  /** O'quvchilar soni; null — ko'rsatilmaydi */
  students: number | null;
};

/** Ko'rinishga kelganda 0 dan qiymatgacha sanaydigan raqam */
const CountUp = ({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
};

const StatCard = ({
  children,
  label,
  sub,
  href,
  highlight,
}: {
  children: React.ReactNode;
  label: string;
  sub?: string;
  href?: string;
  highlight?: boolean;
}) => {
  const cls = cn(
    "flex flex-col justify-center rounded-xl border-[.5px] p-5 text-center backdrop-blur-sm transition-colors",
    highlight
      ? "border-amber-500/50 bg-amber-500/10 hover:border-amber-400 col-span-2 md:col-span-1"
      : "border-zinc-300 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60"
  );
  const body = (
    <>
      <div className={cn("text-4xl md:text-5xl", highlight ? "text-amber-600 dark:text-amber-300" : "text-zinc-900 dark:text-zinc-100")}>
        {children}
      </div>
      <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 font-sans">{label}</div>
      {sub && <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300 font-sans">{sub}</div>}
    </>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
};

const StatsSection = ({ stats }: { stats: HomeStats }) => {
  const t = useTranslations("homeStats");
  const { committers, contributions } = stats;
  const yearly = contributions?.total ?? committers.contribs;

  return (
    <section id="stats" aria-labelledby="stats-title" className="relative z-[2] max-w-6xl mx-auto px-4 py-24">
      <SectionHeading id="stats-title">
        {t("title")}
      </SectionHeading>
      <p className="mt-4 mb-12 text-center text-sm text-zinc-600 dark:text-zinc-300 font-sans">{t("subtitle")}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          highlight
          href={committers.url}
          label={t("rank")}
          sub={t("rankOf", { total: committers.total })}
        >
          <span className="inline-flex items-center gap-2">
            <Trophy className="w-8 h-8 md:w-10 md:h-10" />
            <CountUp to={committers.rank} prefix="#" />
          </span>
        </StatCard>
        <StatCard label={t("contributions")}>
          <CountUp to={yearly} />
        </StatCard>
        <StatCard label={t("experience")}>
          <CountUp to={stats.years} suffix="+" />
        </StatCard>
        <StatCard label={t("repos")}>
          {stats.repos != null ? <CountUp to={stats.repos} /> : "130+"}
        </StatCard>
        <StatCard label={t("projects")}>
          <CountUp to={stats.projects} />
        </StatCard>
        <StatCard label={t("followers")}>
          {stats.followers != null ? <CountUp to={stats.followers} /> : "30+"}
        </StatCard>
      </div>

      {contributions && (
        <div className="mt-6 rounded-xl border-[.5px] border-zinc-300 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 p-5 backdrop-blur-sm font-sans">
          <ContributionGraph
            data={contributions}
            totalLabel={t("contributionsTotal", { count: contributions.total })}
            dayLabel={(date, count) => t("contributionDay", { date: formatDate(date) ?? date, count })}
            less={t("less")}
            more={t("more")}
          />
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm font-sans">
        <a
          href={config.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <SiGithub /> {t("github")} <ArrowUpRight className="w-4 h-4" />
        </a>
        <a
          href={committers.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <Trophy className="w-4 h-4" /> {t("committers")} <ArrowUpRight className="w-4 h-4" />
        </a>
        {committers.updatedAt && (
          <span className="text-xs text-zinc-600 dark:text-zinc-300">
            {t("updated", { date: formatDate(committers.updatedAt) ?? committers.updatedAt })}
          </span>
        )}
      </div>
    </section>
  );
};

export default StatsSection;
