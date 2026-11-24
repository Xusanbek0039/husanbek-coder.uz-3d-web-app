import type { Localized } from "./types";

export interface ExperienceItem {
  id: string;
  role: Localized;
  organization: Localized;
  /** Boshlangan yil */
  start: number;
  /** Tugagan yil; null — hozirgacha */
  end: number | null;
  /** 2–3 ta asosiy yutuq. Hozircha bittadan — qolganlarini egasi beradi. */
  achievements: Localized[];
}

export interface EducationItem {
  id: string;
  institution: Localized;
  field: Localized;
  start: number;
  end: number;
}

export const experience: ExperienceItem[] = [
  {
    id: "e1",
    role: { uz: "Filial rahbari", ru: "Руководитель филиала", en: "Branch Manager" },
    organization: { uz: "IT Park Zomin tuman filiali", ru: "Филиал IT Park в Зааминском районе", en: "IT Park, Zaamin district branch" },
    start: 2023,
    end: null,
    achievements: [
      { uz: "Filial faoliyatini boshqarish, o'quv jarayonini raqamlashtirish: itclms.uz va ITC Academy platformalarini ishlab chiqish va yuritish.", ru: "Управление филиалом и цифровизация учебного процесса: разработка и поддержка платформ itclms.uz и ITC Academy.", en: "Managing the branch and digitalizing the learning process: building and maintaining the itclms.uz and ITC Academy platforms." },
    ],
  },
  {
    id: "e2",
    role: { uz: "O'qituvchi", ru: "Преподаватель", en: "Instructor" },
    organization: { uz: "IT Creative — IT Creative Academy", ru: "IT Creative — IT Creative Academy", en: "IT Creative — IT Creative Academy" },
    start: 2022,
    end: 2022,
    achievements: [
      { uz: "Python, web dasturlash va Telegram botlar bo'yicha darslar; o'quvchilar uchun amaliy loyihalar.", ru: "Занятия по Python, веб-разработке и Telegram-ботам; практические проекты для студентов.", en: "Classes on Python, web development and Telegram bots; hands-on projects for students." },
    ],
  },
  {
    id: "e3",
    role: { uz: "Buxgalter yordamchisi", ru: "Помощник бухгалтера", en: "Accountant Assistant" },
    organization: { uz: "“Sharqona Garden Travel” Toshkent viloyati", ru: "«Sharqona Garden Travel», Ташкентская область", en: "“Sharqona Garden Travel”, Tashkent region" },
    start: 2021,
    end: 2022,
    achievements: [
      { uz: "Moliyaviy hujjatlar bilan ishlash — biznes jarayonlarini avtomatlashtirishga qiziqishim shu yerdan boshlangan.", ru: "Работа с финансовыми документами — отсюда начался мой интерес к автоматизации бизнес-процессов.", en: "Working with financial documents — this is where my interest in automating business processes began." },
    ],
  },
];

export const education: EducationItem[] = [
  {
    id: "d1",
    institution: { uz: "Toshkent Xalqaro Kimyo Universiteti", ru: "Kimyo International University in Tashkent", en: "Kimyo International University in Tashkent" },
    field: { uz: "Tarmoqlarda biznesni boshqarish", ru: "Управление бизнесом в сетях", en: "Business Management in Networks" },
    start: 2022,
    end: 2026,
  },
  {
    id: "d2",
    institution: { uz: "PDP Academy", ru: "PDP Academy", en: "PDP Academy" },
    field: { uz: "HTML + CSS, JavaScript, TypeScript, React", ru: "HTML + CSS, JavaScript, TypeScript, React", en: "HTML + CSS, JavaScript, TypeScript, React" },
    start: 2021,
    end: 2022,
  },
  {
    id: "d3",
    institution: { uz: "MohirDev platformasi", ru: "Платформа MohirDev", en: "MohirDev platform" },
    field: { uz: "Python algoritmlar, Telegram botlar, web freymvorklar", ru: "Алгоритмы на Python, Telegram-боты, веб-фреймворки", en: "Python algorithms, Telegram bots, web frameworks" },
    start: 2019,
    end: 2021,
  },
];
