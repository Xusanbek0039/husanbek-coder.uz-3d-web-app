import type { Localized } from "./types";

export interface ExperienceItem {
  id: string;
  role: Localized;
  organization: Localized;
  /** Boshlangan yil */
  start: number;
  /** Tugagan yil; null — hozirgacha */
  end: number | null;
  /** Lavozim turi: pedagogik (mentorlik/o'qituvchilik), boshqaruv yoki dasturlash */
  kind: ("teaching" | "management" | "development")[];
  /** 2–3 ta asosiy yutuq. Bo'sh bo'lsa ko'rsatilmaydi — egasi keyin to'ldiradi. */
  achievements: Localized[];
}

/** Saralash: avval hozirgi lavozimlar, keyin tugagan yili/boshlangan yili bo'yicha yangisi birinchi */
export const sortedExperience = (): ExperienceItem[] =>
  [...experience].sort(
    (a, b) => (b.end ?? 9999) - (a.end ?? 9999) || b.start - a.start
  );

export interface EducationItem {
  id: string;
  institution: Localized;
  field: Localized;
  start: number;
  end: number;
}

export const experience: ExperienceItem[] = [
  {
    id: "dtrm",
    role: { uz: "Dasturchi mentor", ru: "Ментор-программист", en: "Programming Mentor" },
    organization: {
      uz: "O'zbekiston Respublikasi Raqamli texnologiyalar vazirligi huzuridagi Raqamli ta'limni rivojlantirish markazi davlat muassasasi",
      ru: "Государственное учреждение «Центр развития цифрового образования» при Министерстве цифровых технологий Республики Узбекистан",
      en: "State institution “Digital Education Development Center” under the Ministry of Digital Technologies of the Republic of Uzbekistan",
    },
    start: 2025,
    end: null,
    kind: ["teaching", "development"],
    achievements: [],
  },
  {
    id: "yatm",
    role: { uz: "Menejer va dasturchi", ru: "Менеджер и программист", en: "Manager and Developer" },
    organization: {
      uz: "Yoshlar ishlari agentligi huzuridagi Yoshlar axborot texnologiyalari markazi",
      ru: "Центр информационных технологий для молодёжи при Агентстве по делам молодёжи",
      en: "Youth Information Technology Center under the Youth Affairs Agency",
    },
    start: 2025,
    end: 2026,
    kind: ["management", "development"],
    achievements: [],
  },
  {
    id: "e1",
    role: { uz: "Filial rahbari", ru: "Руководитель филиала", en: "Branch Manager" },
    organization: { uz: "IT Park Zomin tuman filiali", ru: "Филиал IT Park в Зааминском районе", en: "IT Park, Zaamin district branch" },
    start: 2023,
    end: null,
    kind: ["management", "development"],
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
    kind: ["teaching"],
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
    kind: [],
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
