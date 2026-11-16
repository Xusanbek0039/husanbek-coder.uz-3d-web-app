export type Service = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  includes: string[];
  stack: string[];
  /** Narx matni — o'zingiz yangilang, masalan: "5 000 000 so'mdan" */
  price: string;
  /** src/data/projects.tsx dagi loyiha id'lari */
  examples: string[];
};

export const SERVICES: Service[] = [
  {
    id: "web",
    emoji: "🌐",
    title: "Web sayt va landing",
    description:
      "Kompaniya, shaxsiy brend yoki mahsulot uchun tez, SEO'ga tayyor va barcha qurilmalarga moslashgan zamonaviy sayt.",
    includes: [
      "Dizayn va responsive vyorstka",
      "Admin panel (kontentni o'zingiz boshqarasiz)",
      "SEO: meta-teglar, sitemap, Google/Yandex",
      "Domen, hosting va SSL sozlash",
    ],
    stack: ["Next.js", "React", "Django", "Tailwind"],
    price: "Kelishiladi",
    examples: ["goodever", "shoira-blog", "portfolio"],
  },
  {
    id: "lms-crm",
    emoji: "🎓",
    title: "LMS / CRM tizim",
    description:
      "O'quv markazi, maktab yoki biznes jarayonlarini raqamlashtirish: kurslar, o'quvchilar, to'lovlar, hisobotlar.",
    includes: [
      "Rollar va ruxsatlar (admin, o'qituvchi, o'quvchi, ota-ona)",
      "Kurslar, testlar, vazifalar, baholash",
      "Click / Payme / Uzum to'lov integratsiyasi",
      "REST API — mobil ilova uchun tayyor",
    ],
    stack: ["Python", "Django", "DRF", "PostgreSQL"],
    price: "Kelishiladi",
    examples: ["itc-academy", "itc-lms", "marosimgo"],
  },
  {
    id: "telegram-bot",
    emoji: "🤖",
    title: "Telegram bot",
    description:
      "Savdo, xizmat ko'rsatish, ro'yxatga olish yoki kontent uchun bot — sayt va bazangiz bilan integratsiyada.",
    includes: [
      "Menyular, inline tugmalar, to'lovlar",
      "Admin panel va statistika",
      "Sayt/CRM bilan sinxronizatsiya",
      "Serverga joylash va 24/7 ishlash",
    ],
    stack: ["Python", "aiogram 3", "Django", "PostgreSQL"],
    price: "Kelishiladi",
    examples: ["itc-academy-bot", "chatgpt-telegram-bot", "instagram-video-bot"],
  },
  {
    id: "ai",
    emoji: "🧠",
    title: "Sun'iy intellekt integratsiyasi",
    description:
      "Biznesingizga AI qo'shish: mijozlarga javob beruvchi chatbot, hujjatlardan qidiruv, matnni tahlil qilish.",
    includes: [
      "LLM asosidagi chatbot (sayt yoki Telegram)",
      "O'z ma'lumotlaringiz bo'yicha javob (RAG)",
      "NLP: tasniflash, xulosa, tarjima",
      "Xarajatlarni nazorat qilish va xavfsizlik",
    ],
    stack: ["Python", "FastAPI", "OpenAI / Claude API", "PyTorch"],
    price: "Kelishiladi",
    examples: ["itc-academy", "chatgpt-telegram-bot"],
  },
  {
    id: "mentoring",
    emoji: "🧭",
    title: "Konsultatsiya va mentorlik",
    description:
      "Loyiha arxitekturasini tanlash, kod review, jamoa uchun Python/Django bo'yicha amaliy mashg'ulotlar.",
    includes: [
      "Texnik audit va arxitektura tavsiyalari",
      "Kod review va refaktoring rejasi",
      "Python, Django, Telegram bot bo'yicha mentorlik",
      "Deploy va DevOps bo'yicha yordam",
    ],
    stack: ["Python", "Django", "Docker", "CI/CD"],
    price: "Kelishiladi",
    examples: [],
  },
];

export const PROCESS = [
  { title: "Ariza", text: "Formani to'ldirasiz yoki Telegram'da yozasiz — g'oyangizni qisqacha tushuntirasiz." },
  { title: "Kelishuv", text: "Talablar, muddat va narxni aniqlaymiz, texnik topshiriq tuziladi." },
  { title: "Ishlab chiqish", text: "Bosqichma-bosqich ishlayman, har bosqich natijasini ko'rib borasiz." },
  { title: "Topshirish", text: "Serverga joylash, o'rgatish va kelishilgan muddatda bepul qo'llab-quvvatlash." },
];

export const FAQ = [
  {
    q: "Loyiha qancha vaqt oladi?",
    a: "Landing sayt odatda 1–2 hafta, Telegram bot 1–3 hafta, LMS/CRM tizim esa talablarga qarab 1–3 oy.",
  },
  {
    q: "To'lov qanday amalga oshiriladi?",
    a: "Odatda bosqichma-bosqich: boshlashda oldindan to'lov, qolgani natijalar topshirilganda.",
  },
  {
    q: "Loyiha kodi kimga tegishli bo'ladi?",
    a: "To'liq to'lovdan keyin manba kod va barcha kirish ma'lumotlari sizga topshiriladi.",
  },
  {
    q: "Ishga tushgandan keyin yordam berasizmi?",
    a: "Ha — kelishilgan muddatda xatolarni bepul tuzataman, keyin esa qo'llab-quvvatlash shartnomasi asosida.",
  },
];

export const BUDGETS = [
  "Aniq emas",
  "5 mln so'mgacha",
  "5–15 mln so'm",
  "15–40 mln so'm",
  "40 mln so'mdan yuqori",
];
