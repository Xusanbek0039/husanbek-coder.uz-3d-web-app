import type { Project } from "./projects";

type Meta = { title: string; category: string; description: string };

/**
 * Loyihalarning ru/en sarlavha, kategoriya va qisqa tavsiflari.
 * O'zbekcha matnlar src/data/projects.tsx da. Batafsil `content` hozircha faqat o'zbekcha.
 */
const PROJECT_I18N: Record<string, { ru: Meta; en: Meta }> = {
  marosimgo: {
    ru: {
      title: "MarosimGo — цифровая платформа для торжеств",
      category: "Django DRF + Next.js, 5 панелей",
      description:
        "Система, объединяющая семьи, видеостудии и банкетные залы на одной платформе: Django DRF API + 5 панелей на Next.js.",
    },
    en: {
      title: "MarosimGo — a digital platform for celebrations",
      category: "Django DRF + Next.js, 5 panels",
      description:
        "A system connecting families, video studios and wedding venues on one platform: Django DRF API + 5 Next.js panels.",
    },
  },
  "itc-academy": {
    ru: {
      title: "ITC Academy — онлайн-платформа IT-образования",
      category: "Django LMS, PWA, платежи",
      description:
        "Платформа IT-обучения с видеоуроками, тестами, AI-помощником, системой монет и онлайн-оплатой (Django, PWA).",
    },
    en: {
      title: "ITC Academy — an online IT education platform",
      category: "Django LMS, PWA, payments",
      description:
        "An IT learning platform with video lessons, tests, an AI assistant, a coin system and online payments (Django, PWA).",
    },
  },
  "itc-lms": {
    ru: {
      title: "LMS филиала IT Park в Зааминском районе",
      category: "React + Vite, Django DRF API",
      description:
        "Сайт и система управления обучением для филиала IT Park в Заамине: фронтенд на React + Vite, Django REST API.",
    },
    en: {
      title: "IT Park Zaamin branch LMS",
      category: "React + Vite, Django DRF API",
      description:
        "Website and learning management system for the IT Park Zaamin branch: React + Vite frontend, Django REST API.",
    },
  },
  "itc-academy-bot": {
    ru: {
      title: "Telegram-бот ITC Academy",
      category: "Telegram-бот, AI-помощник",
      description: "AI-помощник платформы ITC Academy в Telegram — курсы и новости в одном месте.",
    },
    en: {
      title: "ITC Academy Telegram bot",
      category: "Telegram bot, AI assistant",
      description: "The ITC Academy platform's AI assistant in Telegram — courses and news in one place.",
    },
  },
  goodever: {
    ru: {
      title: "Goodever.uz — интернет-магазин и CRM",
      category: "Интернет-магазин, CRM",
      description:
        "Интернет-магазин товаров для HoReCa, строительства и офиса: каталог, корзина, заказы и админ-панель.",
    },
    en: {
      title: "Goodever.uz — online store and CRM",
      category: "Online store, CRM",
      description:
        "An online store for HoReCa, construction and office supplies: catalog, cart, orders and an admin panel.",
    },
  },
  portfolio: {
    ru: {
      title: "Мой сайт-портфолио",
      category: "Портфолио",
      description:
        "Личный сайт-портфолио с 3D-интерфейсом на Three.js/Spline и богатыми анимациями (Next.js, TypeScript).",
    },
    en: {
      title: "My portfolio website",
      category: "Portfolio",
      description:
        "A personal portfolio with a Three.js/Spline 3D interface and rich animations (Next.js, TypeScript).",
    },
  },
  "shoira-blog": {
    ru: {
      title: "Сайт-портфолио Shoira",
      category: "Портфолио",
      description:
        "Современная трёхъязычная блог-платформа с тёмной и светлой темой — писать и делиться статьями.",
    },
    en: {
      title: "Shoira portfolio website",
      category: "Portfolio",
      description:
        "A modern trilingual blog platform with dark/light modes — for writing and sharing articles.",
    },
  },
  "chatgpt-telegram-bot": {
    ru: {
      title: "ChatGPT Telegram-бот",
      category: "OpenAI API",
      description: "Telegram-бот ChatGPT с открытым исходным кодом на базе OpenAI API.",
    },
    en: {
      title: "ChatGPT Telegram bot",
      category: "OpenAI API",
      description: "An open-source ChatGPT Telegram bot built on the OpenAI API.",
    },
  },
  "instagram-video-bot": {
    ru: {
      title: "Загрузка видео из Instagram",
      category: "Instagram API",
      description: "Бот с открытым кодом, который скачивает видео из Instagram через Telegram.",
    },
    en: {
      title: "Instagram video downloader",
      category: "Instagram API",
      description: "An open-source bot that downloads Instagram videos via Telegram.",
    },
  },
};

/** Loyihaning sarlavha/kategoriya/tavsifini tanlangan tilga moslaydi */
export function localizeProject<T extends Project>(project: T, locale: string): T {
  if (locale !== "ru" && locale !== "en") return project;
  const meta = PROJECT_I18N[project.id]?.[locale];
  return meta ? { ...project, ...meta } : project;
}
