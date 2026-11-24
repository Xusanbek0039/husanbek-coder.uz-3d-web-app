"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Brain, TestTube2, Workflow } from "lucide-react";
import {
  SiAmazonaws,
  SiDjango,
  SiDocker,
  SiFastapi,
  SiFlask,
  SiGit,
  SiGithubactions,
  SiHtml5,
  SiMysql,
  SiPostgresql,
  SiPytest,
  SiPython,
  SiReact,
  SiSqlite,
  SiTelegram,
  SiTypescript,
} from "react-icons/si";

type SkillItem = { name: string; icon: ReactNode };
type SkillGroup = { key: string; emoji: string; items: SkillItem[]; primary?: boolean; secondary?: boolean };

// Asosiy yo'nalish — Python Backend. Qolganlari backendni qo'llab-quvvatlovchi ko'nikmalar.
const SKILL_GROUPS: SkillGroup[] = [
  {
    key: "backend",
    emoji: "⚙️",
    primary: true,
    items: [
      { name: "Python", icon: <SiPython /> },
      { name: "Django", icon: <SiDjango /> },
      { name: "Django REST Framework", icon: <SiDjango /> },
      { name: "FastAPI", icon: <SiFastapi /> },
      { name: "Flask", icon: <SiFlask /> },
      { name: "REST API", icon: <Workflow className="w-4 h-4" /> },
    ],
  },
  {
    key: "databases",
    emoji: "🗄️",
    items: [
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "SQLite", icon: <SiSqlite /> },
    ],
  },
  {
    key: "devops",
    emoji: "🚀",
    items: [
      { name: "Docker", icon: <SiDocker /> },
      { name: "GitHub Actions (CI/CD)", icon: <SiGithubactions /> },
      { name: "AWS", icon: <SiAmazonaws /> },
      { name: "Git", icon: <SiGit /> },
    ],
  },
  {
    key: "testing",
    emoji: "🧪",
    items: [
      { name: "PyTest", icon: <SiPytest /> },
      { name: "Unit testing", icon: <TestTube2 className="w-4 h-4" /> },
      { name: "Integration testing", icon: <TestTube2 className="w-4 h-4" /> },
    ],
  },
  {
    key: "bots",
    emoji: "🤖",
    items: [
      { name: "aiogram", icon: <SiTelegram /> },
      { name: "Telethon", icon: <SiTelegram /> },
      { name: "Pyrogram", icon: <SiTelegram /> },
    ],
  },
  {
    key: "extra",
    emoji: "➕",
    secondary: true,
    items: [
      { name: "React", icon: <SiReact /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "HTML + CSS", icon: <SiHtml5 /> },
      { name: "Machine Learning", icon: <Brain className="w-4 h-4" /> },
    ],
  },
];

const LANGUAGES = [
  { key: "ru", level: 50 },
  { key: "en", level: 45 },
  { key: "ko", level: 30 },
];

const cardClass = cn(
  "rounded-xl border p-5",
  "border-neutral-300/70 bg-white/80",
  "dark:border-neutral-700/70 dark:bg-black/70"
);

const CvSkillsSection = () => {
  const t = useTranslations("cvSkills");
  return (
    <section
      id="skills-cv"
      className="max-w-7xl mx-auto px-4 md:px-8 py-24"
    >
      <h2
        className={cn(
          "bg-clip-text text-3xl text-center text-transparent md:text-5xl",
          "bg-gradient-to-b from-black/80 to-black/50",
          "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50"
        )}
      >
        {t("title")}
      </h2>
      <p className="mx-auto mt-4 mb-12 max-w-2xl text-center text-sm md:text-base text-neutral-600 dark:text-neutral-400">
        {t("subtitle")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {SKILL_GROUPS.map((group, idx) => (
          <motion.div
            key={group.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
            className={cn(
              cardClass,
              "backdrop-blur-md",
              group.primary && "sm:col-span-2 border-emerald-500/60 dark:border-emerald-500/50 ring-1 ring-emerald-500/20",
              group.secondary && "opacity-80"
            )}
          >
            <h3 className="mb-4 flex flex-wrap items-center gap-2 text-lg font-semibold text-neutral-800 dark:text-neutral-100">
              <span>{group.emoji}</span>
              {t(`groups.${group.key}`)}
              {group.primary && (
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-normal text-emerald-700 dark:text-emerald-300">
                  {t("primaryBadge")}
                </span>
              )}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs md:text-sm",
                    "bg-neutral-200/70 text-neutral-800",
                    "dark:bg-neutral-800/70 dark:text-neutral-200"
                  )}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.name}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.16 }}
          className={cn(cardClass, "backdrop-blur-md sm:col-span-2 lg:col-span-2")}
        >
          <h3 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-100">
            <span className="mr-2">🌍</span>
            {t("groups.spoken")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LANGUAGES.map((lang) => (
              <div key={lang.key}>
                <div className="mb-1 flex justify-between font-mono text-sm text-neutral-700 dark:text-neutral-300">
                  <span>{t(`langs.${lang.key}`)}</span>
                  <span>{lang.level}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-300/70 dark:bg-neutral-800">
                  <motion.div
                    className="h-full rounded-full bg-neutral-800 dark:bg-neutral-200"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CvSkillsSection;
