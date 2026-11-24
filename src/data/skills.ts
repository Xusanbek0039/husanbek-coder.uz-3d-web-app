import type { Localized } from "./types";

export type SkillLevel = "core" | "familiar";

export interface SkillItem {
  name: string;
  level: SkillLevel;
}

/**
 * Faqat real loyihalarda ishlatilgan texnologiyalar.
 * "core" — egasi bergan asosiy ro'yxat; "familiar" — src/data/projects.tsx dagi
 * loyihalarda qo'llangan, lekin asosiy ro'yxatda yo'qlari.
 */
export const skills: SkillItem[] = [
  { name: "Python", level: "core" },
  { name: "Django", level: "core" },
  { name: "Django REST Framework", level: "core" },
  { name: "FastAPI", level: "core" },
  { name: "React", level: "core" },
  { name: "Next.js", level: "core" },
  { name: "PostgreSQL", level: "core" },
  { name: "Docker", level: "core" },
  { name: "aiogram", level: "core" },

  { name: "JavaScript", level: "familiar" },
  { name: "TypeScript", level: "familiar" },
  { name: "HTML / CSS", level: "familiar" },
  { name: "Tailwind CSS", level: "familiar" },
  { name: "MongoDB", level: "familiar" },
  { name: "Telegram Bot API", level: "familiar" },
  { name: "OpenAI API", level: "familiar" },
  { name: "GitHub Actions", level: "familiar" },
  { name: "Nginx", level: "familiar" },
  { name: "Vite", level: "familiar" },
  { name: "Three.js", level: "familiar" },
];

/** CEFR darajasi; null — ona tili */
export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface SpokenLanguage {
  id: string;
  name: Localized;
  level: CefrLevel | null;
}

export const spokenLanguages: SpokenLanguage[] = [
  { id: "uz", name: { uz: "O'zbek tili", ru: "Узбекский", en: "Uzbek" }, level: null },
  { id: "ru", name: { uz: "Rus tili", ru: "Русский", en: "Russian" }, level: "B1" },
  { id: "en", name: { uz: "Ingliz tili", ru: "Английский", en: "English" }, level: "B1" },
  { id: "ko", name: { uz: "Koreys tili", ru: "Корейский", en: "Korean" }, level: "A2" },
];
