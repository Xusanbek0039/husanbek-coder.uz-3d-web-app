import type { IconType } from "react-icons";
import { LuBot, LuBraces, LuWorkflow } from "react-icons/lu";
import {
  SiDjango,
  SiDocker,
  SiFastapi,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNginx,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTelegram,
  SiThreedotjs,
  SiTypescript,
  SiVite,
} from "react-icons/si";

/** Faqat ko'rinish: texnologiya nomi (src/data/skills.ts) -> ikonka */
export const SKILL_ICONS: Record<string, IconType> = {
  Python: SiPython,
  Django: SiDjango,
  "Django REST Framework": LuWorkflow,
  FastAPI: SiFastapi,
  React: SiReact,
  "Next.js": SiNextdotjs,
  PostgreSQL: SiPostgresql,
  Docker: SiDocker,
  aiogram: LuBot,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "HTML / CSS": SiHtml5,
  "Tailwind CSS": SiTailwindcss,
  MongoDB: SiMongodb,
  "Telegram Bot API": SiTelegram,
  "OpenAI API": SiOpenai,
  "GitHub Actions": SiGithubactions,
  Nginx: SiNginx,
  Vite: SiVite,
  "Three.js": SiThreedotjs,
};

export const skillIcon = (name: string): IconType => SKILL_ICONS[name] ?? LuBraces;
