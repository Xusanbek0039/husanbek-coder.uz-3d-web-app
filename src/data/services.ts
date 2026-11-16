type L<T = string> = { uz: T; ru: T; en: T };
type LocaleKey = keyof L;

type ServiceDef = {
  id: string;
  emoji: string;
  title: L;
  description: L;
  includes: L<string[]>;
  stack: string[];
  /** Narx matni — o'zingiz yangilang, masalan: { uz: "5 000 000 so'mdan", ... } */
  price: L;
  /** src/data/projects.tsx dagi loyiha id'lari */
  examples: string[];
};

export type Service = Omit<ServiceDef, "title" | "description" | "includes" | "price"> & {
  title: string;
  description: string;
  includes: string[];
  price: string;
};

const NEGOTIABLE: L = { uz: "Kelishiladi", ru: "Договорная", en: "Negotiable" };

const SERVICES_DEF: ServiceDef[] = [
  {
    id: "web",
    emoji: "🌐",
    title: { uz: "Web sayt va landing", ru: "Веб-сайт и лендинг", en: "Website & landing page" },
    description: {
      uz: "Kompaniya, shaxsiy brend yoki mahsulot uchun tez, SEO'ga tayyor va barcha qurilmalarga moslashgan zamonaviy sayt.",
      ru: "Быстрый современный сайт для компании, личного бренда или продукта — готов к SEO и адаптирован под все устройства.",
      en: "A fast, modern, SEO-ready and fully responsive website for a company, personal brand or product.",
    },
    includes: {
      uz: [
        "Dizayn va responsive vyorstka",
        "Admin panel (kontentni o'zingiz boshqarasiz)",
        "SEO: meta-teglar, sitemap, Google/Yandex",
        "Domen, hosting va SSL sozlash",
      ],
      ru: [
        "Дизайн и адаптивная вёрстка",
        "Админ-панель (управляете контентом сами)",
        "SEO: мета-теги, sitemap, Google/Яндекс",
        "Настройка домена, хостинга и SSL",
      ],
      en: [
        "Design and responsive layout",
        "Admin panel (manage content yourself)",
        "SEO: meta tags, sitemap, Google/Yandex",
        "Domain, hosting and SSL setup",
      ],
    },
    stack: ["Next.js", "React", "Django", "Tailwind"],
    price: NEGOTIABLE,
    examples: ["goodever", "shoira-blog", "portfolio"],
  },
  {
    id: "lms-crm",
    emoji: "🎓",
    title: { uz: "LMS / CRM tizim", ru: "LMS / CRM-система", en: "LMS / CRM system" },
    description: {
      uz: "O'quv markazi, maktab yoki biznes jarayonlarini raqamlashtirish: kurslar, o'quvchilar, to'lovlar, hisobotlar.",
      ru: "Цифровизация учебного центра, школы или бизнес-процессов: курсы, ученики, платежи, отчёты.",
      en: "Digitalize a training center, school or business processes: courses, students, payments, reports.",
    },
    includes: {
      uz: [
        "Rollar va ruxsatlar (admin, o'qituvchi, o'quvchi, ota-ona)",
        "Kurslar, testlar, vazifalar, baholash",
        "Click / Payme / Uzum to'lov integratsiyasi",
        "REST API — mobil ilova uchun tayyor",
      ],
      ru: [
        "Роли и права (админ, преподаватель, ученик, родитель)",
        "Курсы, тесты, задания, оценки",
        "Интеграция оплаты Click / Payme / Uzum",
        "REST API — готово для мобильного приложения",
      ],
      en: [
        "Roles and permissions (admin, teacher, student, parent)",
        "Courses, tests, assignments, grading",
        "Click / Payme / Uzum payment integration",
        "REST API — ready for a mobile app",
      ],
    },
    stack: ["Python", "Django", "DRF", "PostgreSQL"],
    price: NEGOTIABLE,
    examples: ["itc-academy", "itc-lms", "marosimgo"],
  },
  {
    id: "telegram-bot",
    emoji: "🤖",
    title: { uz: "Telegram bot", ru: "Telegram-бот", en: "Telegram bot" },
    description: {
      uz: "Savdo, xizmat ko'rsatish, ro'yxatga olish yoki kontent uchun bot — sayt va bazangiz bilan integratsiyada.",
      ru: "Бот для продаж, сервиса, записи или контента — интегрированный с вашим сайтом и базой данных.",
      en: "A bot for sales, customer service, sign-ups or content — integrated with your website and database.",
    },
    includes: {
      uz: [
        "Menyular, inline tugmalar, to'lovlar",
        "Admin panel va statistika",
        "Sayt/CRM bilan sinxronizatsiya",
        "Serverga joylash va 24/7 ishlash",
      ],
      ru: [
        "Меню, inline-кнопки, платежи",
        "Админ-панель и статистика",
        "Синхронизация с сайтом/CRM",
        "Размещение на сервере и работа 24/7",
      ],
      en: [
        "Menus, inline buttons, payments",
        "Admin panel and statistics",
        "Sync with your website/CRM",
        "Server deployment and 24/7 uptime",
      ],
    },
    stack: ["Python", "aiogram 3", "Django", "PostgreSQL"],
    price: NEGOTIABLE,
    examples: ["itc-academy-bot", "chatgpt-telegram-bot", "instagram-video-bot"],
  },
  {
    id: "ai",
    emoji: "🧠",
    title: {
      uz: "Sun'iy intellekt integratsiyasi",
      ru: "Интеграция искусственного интеллекта",
      en: "AI integration",
    },
    description: {
      uz: "Biznesingizga AI qo'shish: mijozlarga javob beruvchi chatbot, hujjatlardan qidiruv, matnni tahlil qilish.",
      ru: "AI для вашего бизнеса: чат-бот для ответов клиентам, поиск по документам, анализ текста.",
      en: "Bring AI to your business: a customer-support chatbot, document search, text analysis.",
    },
    includes: {
      uz: [
        "LLM asosidagi chatbot (sayt yoki Telegram)",
        "O'z ma'lumotlaringiz bo'yicha javob (RAG)",
        "NLP: tasniflash, xulosa, tarjima",
        "Xarajatlarni nazorat qilish va xavfsizlik",
      ],
      ru: [
        "Чат-бот на базе LLM (сайт или Telegram)",
        "Ответы по вашим данным (RAG)",
        "NLP: классификация, резюме, перевод",
        "Контроль расходов и безопасность",
      ],
      en: [
        "LLM-powered chatbot (website or Telegram)",
        "Answers grounded in your own data (RAG)",
        "NLP: classification, summarization, translation",
        "Cost control and security",
      ],
    },
    stack: ["Python", "FastAPI", "OpenAI / Claude API", "PyTorch"],
    price: NEGOTIABLE,
    examples: ["itc-academy", "chatgpt-telegram-bot"],
  },
  {
    id: "mentoring",
    emoji: "🧭",
    title: {
      uz: "Konsultatsiya va mentorlik",
      ru: "Консультации и менторство",
      en: "Consulting & mentoring",
    },
    description: {
      uz: "Loyiha arxitekturasini tanlash, kod review, jamoa uchun Python/Django bo'yicha amaliy mashg'ulotlar.",
      ru: "Выбор архитектуры проекта, код-ревью, практические занятия по Python/Django для команды.",
      en: "Choosing a project architecture, code review, hands-on Python/Django training for your team.",
    },
    includes: {
      uz: [
        "Texnik audit va arxitektura tavsiyalari",
        "Kod review va refaktoring rejasi",
        "Python, Django, Telegram bot bo'yicha mentorlik",
        "Deploy va DevOps bo'yicha yordam",
      ],
      ru: [
        "Технический аудит и рекомендации по архитектуре",
        "Код-ревью и план рефакторинга",
        "Менторство по Python, Django и Telegram-ботам",
        "Помощь с деплоем и DevOps",
      ],
      en: [
        "Technical audit and architecture advice",
        "Code review and a refactoring plan",
        "Mentoring in Python, Django and Telegram bots",
        "Help with deployment and DevOps",
      ],
    },
    stack: ["Python", "Django", "Docker", "CI/CD"],
    price: NEGOTIABLE,
    examples: [],
  },
];

const PROCESS_DEF: { title: L; text: L }[] = [
  {
    title: { uz: "Ariza", ru: "Заявка", en: "Request" },
    text: {
      uz: "Formani to'ldirasiz yoki Telegram'da yozasiz — g'oyangizni qisqacha tushuntirasiz.",
      ru: "Заполняете форму или пишете в Telegram — кратко описываете идею.",
      en: "Fill in the form or message me on Telegram — briefly describe your idea.",
    },
  },
  {
    title: { uz: "Kelishuv", ru: "Договорённость", en: "Agreement" },
    text: {
      uz: "Talablar, muddat va narxni aniqlaymiz, texnik topshiriq tuziladi.",
      ru: "Уточняем требования, сроки и цену, составляем техническое задание.",
      en: "We agree on requirements, timeline and price, and write a specification.",
    },
  },
  {
    title: { uz: "Ishlab chiqish", ru: "Разработка", en: "Development" },
    text: {
      uz: "Bosqichma-bosqich ishlayman, har bosqich natijasini ko'rib borasiz.",
      ru: "Работаю поэтапно, вы видите результат каждого этапа.",
      en: "I work in stages, and you review the result of each one.",
    },
  },
  {
    title: { uz: "Topshirish", ru: "Сдача", en: "Delivery" },
    text: {
      uz: "Serverga joylash, o'rgatish va kelishilgan muddatda bepul qo'llab-quvvatlash.",
      ru: "Размещение на сервере, обучение и бесплатная поддержка в оговорённый срок.",
      en: "Deployment, training and free support for the agreed period.",
    },
  },
];

const FAQ_DEF: { q: L; a: L }[] = [
  {
    q: { uz: "Loyiha qancha vaqt oladi?", ru: "Сколько времени занимает проект?", en: "How long does a project take?" },
    a: {
      uz: "Landing sayt odatda 1–2 hafta, Telegram bot 1–3 hafta, LMS/CRM tizim esa talablarga qarab 1–3 oy.",
      ru: "Лендинг обычно 1–2 недели, Telegram-бот 1–3 недели, а LMS/CRM-система — 1–3 месяца в зависимости от требований.",
      en: "A landing page usually takes 1–2 weeks, a Telegram bot 1–3 weeks, and an LMS/CRM system 1–3 months depending on requirements.",
    },
  },
  {
    q: { uz: "To'lov qanday amalga oshiriladi?", ru: "Как происходит оплата?", en: "How does payment work?" },
    a: {
      uz: "Odatda bosqichma-bosqich: boshlashda oldindan to'lov, qolgani natijalar topshirilganda.",
      ru: "Обычно поэтапно: предоплата в начале, остальное — при сдаче результатов.",
      en: "Usually in stages: a prepayment at the start, the rest upon delivery.",
    },
  },
  {
    q: { uz: "Loyiha kodi kimga tegishli bo'ladi?", ru: "Кому принадлежит код проекта?", en: "Who owns the project code?" },
    a: {
      uz: "To'liq to'lovdan keyin manba kod va barcha kirish ma'lumotlari sizga topshiriladi.",
      ru: "После полной оплаты исходный код и все доступы передаются вам.",
      en: "After full payment, the source code and all credentials are handed over to you.",
    },
  },
  {
    q: {
      uz: "Ishga tushgandan keyin yordam berasizmi?",
      ru: "Помогаете ли вы после запуска?",
      en: "Do you provide support after launch?",
    },
    a: {
      uz: "Ha — kelishilgan muddatda xatolarni bepul tuzataman, keyin esa qo'llab-quvvatlash shartnomasi asosida.",
      ru: "Да — в оговорённый срок исправляю ошибки бесплатно, далее — по договору поддержки.",
      en: "Yes — I fix bugs for free during the agreed period, and afterwards under a support agreement.",
    },
  },
];

const BUDGETS_DEF: L<string[]> = {
  uz: ["Aniq emas", "5 mln so'mgacha", "5–15 mln so'm", "15–40 mln so'm", "40 mln so'mdan yuqori"],
  ru: ["Пока не знаю", "до 5 млн сумов", "5–15 млн сумов", "15–40 млн сумов", "более 40 млн сумов"],
  en: ["Not sure yet", "up to 5M UZS", "5–15M UZS", "15–40M UZS", "over 40M UZS"],
};

const lk = (locale: string): LocaleKey => (locale === "ru" || locale === "en" ? locale : "uz");

export const getServices = (locale: string): Service[] => {
  const l = lk(locale);
  return SERVICES_DEF.map((s) => ({
    ...s,
    title: s.title[l],
    description: s.description[l],
    includes: s.includes[l],
    price: s.price[l],
  }));
};

export const getProcess = (locale: string) =>
  PROCESS_DEF.map((p) => ({ title: p.title[lk(locale)], text: p.text[lk(locale)] }));

export const getFaq = (locale: string) =>
  FAQ_DEF.map((f) => ({ q: f.q[lk(locale)], a: f.a[lk(locale)] }));

export const getBudgets = (locale: string) => BUDGETS_DEF[lk(locale)];
