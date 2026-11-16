"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Brain, Network, TestTube2, Workflow } from "lucide-react";
import {
  SiAmazonaws,
  SiCplusplus,
  SiCss3,
  SiDjango,
  SiDocker,
  SiFastapi,
  SiFirebase,
  SiFlask,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiOpenjdk,
  SiPostgresql,
  SiPytest,
  SiPython,
  SiPytorch,
  SiReact,
  SiSelenium,
  SiSqlite,
  SiTelegram,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";

type SkillItem = { name: string; icon: ReactNode };
type SkillGroup = { title: string; emoji: string; items: SkillItem[] };

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Dasturlash tillari",
    emoji: "💻",
    items: [
      { name: "Python", icon: <SiPython /> },
      { name: "HTML + CSS", icon: <SiHtml5 /> },
      { name: "Java", icon: <SiOpenjdk /> },
      { name: "C++", icon: <SiCplusplus /> },
    ],
  },
  {
    title: "Backend",
    emoji: "⚙️",
    items: [
      { name: "Django", icon: <SiDjango /> },
      { name: "FastAPI", icon: <SiFastapi /> },
      { name: "Flask", icon: <SiFlask /> },
    ],
  },
  {
    title: "Frontend",
    emoji: "🎨",
    items: [
      { name: "HTML", icon: <SiHtml5 /> },
      { name: "CSS", icon: <SiCss3 /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "React", icon: <SiReact /> },
    ],
  },
  {
    title: "Ma'lumotlar bazasi",
    emoji: "🗄️",
    items: [
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "SQLite", icon: <SiSqlite /> },
    ],
  },
  {
    title: "Sun'iy intellekt",
    emoji: "🧠",
    items: [
      { name: "Machine Learning", icon: <Brain className="w-4 h-4" /> },
      { name: "Deep Learning", icon: <Network className="w-4 h-4" /> },
      { name: "TensorFlow", icon: <SiTensorflow /> },
      { name: "PyTorch", icon: <SiPytorch /> },
    ],
  },
  {
    title: "Telegram botlar",
    emoji: "🤖",
    items: [
      { name: "aiogram", icon: <SiTelegram /> },
      { name: "Telethon", icon: <SiTelegram /> },
      { name: "Pyrogram", icon: <SiTelegram /> },
    ],
  },
  {
    title: "Versiya nazorati",
    emoji: "🌿",
    items: [
      { name: "Git", icon: <SiGit /> },
      { name: "GitHub", icon: <SiGithub /> },
    ],
  },
  {
    title: "Bulutli xizmatlar",
    emoji: "☁️",
    items: [
      { name: "AWS", icon: <SiAmazonaws /> },
      { name: "Firebase", icon: <SiFirebase /> },
    ],
  },
  {
    title: "DevOps va avtomatlashtirish",
    emoji: "🚀",
    items: [
      { name: "Docker", icon: <SiDocker /> },
      { name: "CI/CD", icon: <Workflow className="w-4 h-4" /> },
    ],
  },
  {
    title: "Testlash va sifat nazorati",
    emoji: "🧪",
    items: [
      { name: "Unit testing", icon: <TestTube2 className="w-4 h-4" /> },
      { name: "Integration testing", icon: <TestTube2 className="w-4 h-4" /> },
      { name: "PyTest", icon: <SiPytest /> },
      { name: "Selenium", icon: <SiSelenium /> },
    ],
  },
];

const LANGUAGES = [
  { name: "Rus tili", level: 50 },
  { name: "Ingliz tili", level: 45 },
  { name: "Koreys tili", level: 30 },
];

const cardClass = cn(
  "rounded-xl border p-5",
  "border-neutral-300/70 bg-white/80",
  "dark:border-neutral-700/70 dark:bg-black/70"
);

const CvSkillsSection = () => {
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
        Ko&apos;nikmalarim
      </h2>
      <p className="mx-auto mt-4 mb-12 max-w-2xl text-center text-sm md:text-base text-neutral-600 dark:text-neutral-400">
        Python asosida LMS, CRM va sun&apos;iy intellekt loyihalarini backend va
        frontend qismlari bilan to&apos;liq yarataman, Telegram botlar ishlab
        chiqaman.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {SKILL_GROUPS.map((group, idx) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
            className={cn(cardClass, "backdrop-blur-md")}
          >
            <h3 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-100">
              <span className="mr-2">{group.emoji}</span>
              {group.title}
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
            Tillar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LANGUAGES.map((lang) => (
              <div key={lang.name}>
                <div className="mb-1 flex justify-between font-mono text-sm text-neutral-700 dark:text-neutral-300">
                  <span>{lang.name}</span>
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
