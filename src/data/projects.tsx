import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight, Languages } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import type { Localized } from "./types";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiChakraui,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReactquery,
  SiSanity,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVuedotjs,
  SiVite,
  SiNetlify,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiApachemaven,
  SiCplusplus,
  SiArduino,
  SiDjango,
  SiTelegram,
  SiGreensock,
  SiNginx,
  SiVercel,
  SiPwa,
  SiGoogledrive,
  SiGithubactions,
  SiScikitlearn,
  SiFastapi,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  if (!live && !repo) return null;
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && (
        <Button asChild variant={"default"} size={"sm"} className="font-mono">
          <Link rel="noopener noreferrer" target="_blank" href={live}>
            Tashrif buyurish
            <ArrowUpRight className="ml-3 w-5 h-5" aria-hidden="true" />
          </Link>
        </Button>
      )}
      {repo && (
        <Button asChild variant={"default"} size={"sm"} className="font-mono">
          <Link rel="noopener noreferrer" target="_blank" href={repo}>
            GitHub
            <ArrowUpRight className="ml-3 w-5 h-5" aria-hidden="true" />
          </Link>
        </Button>
      )}
    </div>
  );
};

const Architecture = ({ diagram }: { diagram: string }) => {
  return (
    <pre className="font-mono text-xs md:text-sm leading-relaxed whitespace-pre overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100/60 dark:bg-neutral-900/60 p-4 my-4">
      {diagram}
    </pre>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  chakra: {
    title: "Chakra UI",
    bg: "black",
    fg: "white",
    icon: <SiChakraui />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <SiPython />,
  },
  prisma: {
    title: "prisma",
    bg: "black",
    fg: "white",
    icon: <SiPrisma />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  express: {
    title: "Express",
    bg: "black",
    fg: "white",
    icon: <SiExpress />,
  },
  reactQuery: {
    title: "React Query",
    bg: "black",
    fg: "white",
    icon: <SiReactquery />,
  },
  shadcn: {
    title: "ShanCN UI",
    bg: "black",
    fg: "white",
    icon: <SiShadcnui />,
  },
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  docker: {
    title: "Docker",
    bg: "black",
    fg: "white",
    icon: <SiDocker />,
  },
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: {
    title: "Firebase",
    bg: "black",
    fg: "white",
    icon: <SiFirebase />,
  },
  sockerio: {
    title: "Socket.io",
    bg: "black",
    fg: "white",
    icon: <SiSocketdotio />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  vue: {
    title: "Vue.js",
    bg: "black",
    fg: "white",
    icon: <SiVuedotjs />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  sanity: {
    title: "Sanity",
    bg: "black",
    fg: "white",
    icon: <SiSanity />,
  },
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: {
    title: "GSAP",
    bg: "black",
    fg: "white",
    icon: <SiGreensock />,
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <TbBrandFramerMotion />,
  },
  supabase: {
    title: "Supabase",
    bg: "black",
    fg: "white",
    icon: <SiSupabase />,
  },
  // +
  vite: {
    title: "Vite",
    bg: "black",
    fg: "white",
    icon: <SiVite />,
  },
  openai: {
    title: "OpenAI",
    bg: "black",
    fg: "white",
    icon: // eslint-disable-next-line @next/next/no-img-element
    <img src="/assets/icons/openai-svgrepo-com_white.svg" alt="OpenAI" width={24} height={24} />,
  },
  netlify: {
    title: "Netlify",
    bg: "black",
    fg: "white",
    icon: <SiNetlify/>,
  },
  html: {
    title: "HTML5",
    bg: "black",
    fg: "white",
    icon: <SiHtml5/>,
  },
  css: {
    title: "CSS3",
    bg: "black",
    fg: "white",
    icon: <SiCss3/>,
  },
  bootstrap: {
    title: "Bootstrap",
    bg: "black",
    fg: "white",
    icon: <SiBootstrap/>,
  },
  maven: {
    title: "Maven",
    bg: "black",
    fg: "white",
    icon: <SiApachemaven/>,
  },
  java: {
    title: "Java",
    bg: "black",
    fg: "white",
    icon: // eslint-disable-next-line @next/next/no-img-element
    <img src="/assets/icons/icons8-java.svg" alt="Java" width={24} height={24} />,
  },
  cplusplus: {
    title: "C++",
    bg: "black",
    fg: "white",
    icon: <SiCplusplus/>,
  },
  arduino: {
    title: "Arduino",
    bg: "black",
    fg: "white",
    icon: <SiArduino/>,
  },
  django: {
    title: "Django",
    bg: "black",
    fg: "white",
    icon: <SiDjango />,
  },
  telegram: {
    title: "Telegram Bot API",
    bg: "black",
    fg: "white",
    icon: <SiTelegram />,
  },
  nginx: {
    title: "Nginx",
    bg: "black",
    fg: "white",
    icon: <SiNginx />,
  },
  vercel: {
    title: "Vercel",
    bg: "black",
    fg: "white",
    icon: <SiVercel />,
  },
  pwa: {
    title: "PWA",
    bg: "black",
    fg: "white",
    icon: <SiPwa />,
  },
  threejs: {
    title: "Three.js",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  googleDrive: {
    title: "Google Drive API",
    bg: "black",
    fg: "white",
    icon: <SiGoogledrive />,
  },
  githubActions: {
    title: "GitHub Actions",
    bg: "black",
    fg: "white",
    icon: <SiGithubactions />,
  },
  nlp: {
    title: "NLP",
    bg: "black",
    fg: "white",
    icon: <Languages />,
  },
  transformers: {
    title: "Transformers",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>T</strong>f
      </span>
    ),
  },
  xlmRoberta: {
    title: "XLM-RoBERTa",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>XLM</strong>R
      </span>
    ),
  },
  sklearn: {
    title: "scikit-learn",
    bg: "black",
    fg: "white",
    icon: <SiScikitlearn />,
  },
  fastapi: {
    title: "FastAPI",
    bg: "black",
    fg: "white",
    icon: <SiFastapi />,
  },
  huggingface: {
    title: "HuggingFace",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>HF</strong>
      </span>
    ),
  },
};
/** Filtr turkumlari: Web platforma / LMS / Telegram bot / AI */
export type ProjectKind = "web" | "lms" | "bot" | "ai";
export const PROJECT_KINDS: ProjectKind[] = ["web", "lms", "bot", "ai"];

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  description: string;
  /** Filtr uchun turkumlar (bir loyiha bir nechtasiga kirishi mumkin) */
  kinds: ProjectKind[];
  /** Mijoz buyurtmasi bilan qilingan loyiha */
  isClient?: boolean;
  /** Yil yoki muddat, masalan "2024" yoki "2023–2024". Berilmagan bo'lsa ko'rsatilmaydi. */
  year?: string;
  /** Loyihadagi rol, masalan "Backend + Frontend". Berilmagan bo'lsa ko'rsatilmaydi. */
  role?: Localized;
  /** 1–2 qatorli natija, masalan "300+ foydalanuvchi". Berilmagan bo'lsa ko'rsatilmaydi. */
  outcome?: Localized;
  /** Loyiha holati. Berilmagan bo'lsa — tugallangan loyiha, belgi ko'rsatilmaydi. */
  status?: "inProgress";
  github?: string;
  live?: string;
};
const projects: Project[] = [
  { // Uz-Sentiment — o'zbekcha sharhlar tahlili (NLP)
    id: "uz-sentiment",
    kinds: ["ai"],
    status: "inProgress",
    description: "Uzum Market'dagi o'zbekcha mahsulot sharhlarini negative, neutral va positive sinflarga ajratuvchi NLP loyiha. ~352 ming sharhdan iborat dataset, TF-IDF baseline va XLM-RoBERTa modeli, FastAPI + React demo.",
    category: "NLP, sentiment tahlil",
    title: "Uz-Sentiment — o'zbekcha sharhlar tahlili",
    // Muqova: demo skrinshotlari tayyor bo'lganda faqat shu yo'lni almashtiring
    src: "/assets/projects-screenshots/uz-sentiment/uz-sentiment-cover.webp",
    screenshots: [],
    github: "https://github.com/Xusanbek0039/uz-sentiment",
    skills: {
      frontend: [PROJECT_SKILLS.react],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.nlp,
        PROJECT_SKILLS.transformers,
        PROJECT_SKILLS.xlmRoberta,
        PROJECT_SKILLS.sklearn,
        PROJECT_SKILLS.fastapi,
        PROJECT_SKILLS.huggingface,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Uz-Sentiment — Uzum Market&apos;dagi o&apos;zbekcha mahsulot sharhlarini
            negative, neutral va positive sinflarga ajratuvchi NLP loyiha.
            Loyiha hozir ishlab chiqilmoqda.
          </TypographyP>
          <ProjectsLinks repo={this.github} />
          <SlideShow images={[this.src]} />
          <TypographyH3 className="my-4 mt-8">📊 Dataset</TypographyH3>
          <p className="font-mono mb-2">
            ~352 ming o&apos;zbekcha mahsulot sharhidan iborat dataset, har bir
            sharh uch sinfdan biriga ajratilgan: negative, neutral yoki positive.
          </p>
          <TypographyH3 className="my-4 mt-8">🧠 Modellar</TypographyH3>
          <p className="font-mono mb-2">
            TF-IDF + scikit-learn asosidagi baseline model va HuggingFace
            Transformers yordamida o&apos;zbekcha sharhlarga moslab o&apos;qitilgan
            XLM-RoBERTa modeli.
          </p>
          <TypographyH3 className="my-4 mt-8">🖥️ Demo</TypographyH3>
          <p className="font-mono mb-2">
            Model FastAPI orqali API sifatida taqdim etiladi, React interfeysida
            esa sharh matnini kiritib, uning sinfini ko&apos;rish mumkin bo&apos;ladi.
          </p>
        </div>
      );
    },
  },
  { // 00. MarosimGo — marosim xizmatlari platformasi
    id: "marosimgo",
    kinds: ["web"],
    description: "Oila, video studiya va to'yxonani bitta platformada bog'laydigan tizim: Django DRF API + 5 ta Next.js panel.",
    category: "Django DRF + Next.js, 5 ta panel",
    title: "MarosimGo — marosimlar uchun raqamli platforma",
    src: "/assets/projects-screenshots/marosimgo/marosimgo-cover.webp",
    screenshots: ["1.png", "2.png", "3.png", "4.png", "5.png"],
    live: "https://marosimgo.uz/",
    github: "https://github.com/Xusanbek0039/Marosim-Go",
    skills: {
      frontend: [
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.shadcn,
        PROJECT_SKILLS.framerMotion,
        PROJECT_SKILLS.reactQuery,
        PROJECT_SKILLS.threejs,
      ],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.django,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.googleDrive,
        PROJECT_SKILLS.githubActions,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            MarosimGo — oila, video studiya va to&apos;yxonani bitta platformada
            bog&apos;laydigan tizim: to&apos;yxonani tanlash va bron qilishdan tortib,
            marosim videolarini xavfsiz saqlash va yaqinlar bilan ruxsat
            asosida ulashishgacha.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow
            images={[
              `${BASE_PATH}/marosimgo/marosimgo-cover.webp`,
              `${BASE_PATH}/marosimgo/marosimgo-screenshot-1.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">👥 Uch tomon — bitta platforma</TypographyH3>
          <p className="font-mono mb-2">
            👰 Oilalar — marosim arxivi, galereya, mehmonlarni taklif qilish ·
            🎬 Studiyalar — video va rasmlarni yuklash, portfolio, reels, chat ·
            🏛️ To&apos;yxonalar — zallar, bo&apos;sh kunlar kalendari, bron so&apos;rovlari ·
            🛡️ Super Admin va Admin paneli — granular ruxsatlar, monitoring,
            audit va obunalar.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/marosimgo/marosimgo-screenshot-2.webp`,
              `${BASE_PATH}/marosimgo/marosimgo-screenshot-3.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">🏗️ Arxitektura</TypographyH3>
          <p className="font-mono mb-2">
            API-first arxitektura: barcha biznes logika va REST API faqat
            Django&apos;da (/api/v1/), Next.js ilovalari esa faqat interfeys.
            Har bir rol uchun alohida Next.js panel statik build qilinib,
            bitta Django (Passenger) ilovasi orqali 7 ta domenga xizmat
            ko&apos;rsatadi — domen nomiga qarab kerakli panel ochiladi. Panellar
            API&apos;ni o&apos;z domenida chaqiradi, shuning uchun cookie&apos;lar
            first-party, CORS kerak emas. Kelajakdagi mobil ilovalar ham
            xuddi shu API&apos;dan Bearer token bilan foydalanadi.
          </p>
          <Architecture
            diagram={`marosimgo.uz ............ Landing (HTML/CSS + Three.js)
superadmin. / admin. .... Next.js 16 panel (Super Admin, Admin)
studio. ................. Next.js panel (Studiya)
userlogin. .............. Next.js panel (Oila, mehmonlar)
toyxona. ................ Next.js panel (To'yxona)
api. .................... Mobil ilovalar uchun REST API
        │  HTTPS, /api/v1/ (same-origin cookie yoki Bearer)
        ▼
Passenger ──► Django 5.2 + DRF (bitta ilova)
               ├─ accounts      — JWT, rollar, RBAC, JSHSHIR shifrlash
               ├─ ceremonies    — marosim arxivi, taklifnomalar
               ├─ studios / venues — studiya va to'yxonalar, bron
               ├─ media         — yuklash, watermark, ko'rish
               ├─ subscriptions — obuna rejalari va limitlar
               ├─ audit / monitoring — o'zgarmas jurnal, API statistikasi
               └─ storage       ──► Google Drive (OAuth 2.0)
        │
        ▼
SQLite → PostgreSQL (DATABASE_URL) · Redis kesh (ixtiyoriy)`}
          />
          <TypographyH3 className="my-4 mt-8">🔒 Xavfsizlik</TypographyH3>
          <p className="font-mono mb-2">
            JWT (access 10 daqiqa, refresh 7 kun, rotation + blacklist, qayta
            ishlatilgan refresh&apos;da barcha sessiyalar bekor qilinadi) · tokenlar
            faqat HttpOnly cookie&apos;da · CSRF tekshiruvi · brute-force himoyasi va
            throttling · JSHSHIR Fernet bilan shifrlanadi, HMAC orqali qidiriladi ·
            rasmlardan EXIF o&apos;chiriladi va WEBP&apos;ga qayta kodlanadi · CSP va
            xavfsizlik sarlavhalari · har bir amal audit jurnaliga yoziladi.
            Backend pytest testlari va GitHub Actions CI bilan tekshiriladi.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/marosimgo/marosimgo-screenshot-4.webp`,
            ]}
          />
        </div>
      );
    },
  },
  { // 01. ITC Academy — o'quv platformasi
    id: "itc-academy",
    kinds: ["lms"],
    description: "Video darslar, testlar, AI yordamchi, coin tizimi va onlayn to'lovlarga ega IT ta'lim platformasi (Django, PWA).",
    category: "Django LMS, PWA, To'lov tizimi",
    title: "ITC Academy — onlayn IT ta'lim platformasi",
    src: "/assets/projects-screenshots/itc-academy/itc-academy-cover.webp",
    screenshots: ["1.png", "2.png", "3.png", "4.png", "5.png"],
    live: "https://itc-academy.uz/",
    skills: {
      frontend: [
        PROJECT_SKILLS.html,
        PROJECT_SKILLS.css,
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.gsap,
        PROJECT_SKILLS.threejs,
        PROJECT_SKILLS.pwa,
      ],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.django,
        PROJECT_SKILLS.nginx,
        PROJECT_SKILLS.telegram,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            itc-academy.uz — IT kasblarini noldan o&apos;rganish uchun to&apos;liq onlayn
            platforma: video darslar, testlar, uy vazifalari, AI yordamchi,
            o&apos;yinlar, coin tizimi va sertifikatlar — hammasi bitta joyda.
          </TypographyP>
          <ProjectsLinks live={this.live} />
          <SlideShow
            images={[
              `${BASE_PATH}/itc-academy/itc-academy-cover.webp`,
              `${BASE_PATH}/itc-academy/itc-academy-screenshot-1.webp`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">🔑 Asosiy imkoniyatlar</TypographyH3>
          <p className="font-mono mb-2">
            🎬 Video darslar va amaliy topshiriqlar · 📝 Testlar va uy vazifalari
            (ustoz tekshiradi) · 🤖 24/7 AI yordamchi (sayt va Telegram bot
            orqali) · 🪙 Coin tizimi — test, vazifa, kunlik savol va o&apos;yinlar
            uchun coin, do&apos;kon va kurs chegirmalari · 🎓 Sertifikatlar · 👨‍👩‍👧
            Ota-ona paneli (davomat va baholar) · 📚 Kutubxona va startaplar
            bo&apos;limi.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/itc-academy/itc-academy-screenshot-3.webp`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">💳 Pullik kurslar va to&apos;lovlar</TypographyH3>
          <p className="font-mono mb-2">
            Kurslar bir martalik to&apos;lov bilan umrbod ochiladi — to&apos;lovdan keyin
            kurs avtomatik faollashadi. Click, Payme, Paynet, Uzum, Humo kabi
            mahalliy to&apos;lov tizimlari qo&apos;llab-quvvatlanadi.
          </p>
          <TypographyH3 className="my-4 mt-8">📰 Blog va yangiliklar</TypographyH3>
          <p className="font-mono mb-2">
            IT dunyosi yangiliklari, darsliklar va maslahatlar — kategoriyalar,
            qidiruv, layk va izohlar bilan.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/itc-academy/itc-academy-screenshot-2.webp`,
              `${BASE_PATH}/itc-academy/itc-academy-screenshot-4.webp`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">🏗️ Arxitektura</TypographyH3>
          <p className="font-mono mb-2">
            Server-side rendering asosidagi monolit Django ilova. Sahifalar
            Django shablonlari orqali serverda yig&apos;iladi, interaktivlik va 3D
            effektlar esa vanilla JS + GSAP/ScrollTrigger, Lenis va Three.js
            yordamida qo&apos;shilgan. Sayt PWA sifatida o&apos;rnatiladi (service worker),
            Android (TWA) va desktop ilova ko&apos;rinishida ham ishlaydi.
          </p>
          <Architecture
            diagram={`Brauzer / PWA / Android (TWA) / Desktop ilova
        │  HTTPS
        ▼
Nginx (reverse proxy + kesh)
        │
        ▼
Phusion Passenger ──► Django (monolit, MVT)
                       ├─ accounts   — ro'yxat, login, rollar (o'quvchi/ustoz/ota-ona)
                       ├─ kurslar    — darslar, video, test, vazifa
                       ├─ coin       — mukofot, do'kon, chegirmalar
                       ├─ blog       — postlar, layk, izohlar
                       ├─ payments   — Click / Payme / Paynet / Uzum
                       └─ AI yordamchi API
        │                         ▲
        ▼                         │
  Ma'lumotlar bazasi       Telegram bot (@itc_academybot)`}
          />
          <p className="font-mono mb-2">
            Xavfsizlik: CSRF himoyasi, X-Frame-Options: DENY, nosniff va XSS
            sarlavhalari, faqat HTTPS orqali ishlovchi cookie&apos;lar.
          </p>
        </div>
      );
    },
  },
  { // 02. ITC LMS — IT Park Zomin
    id: "itc-lms",
    kinds: ["lms"],
    description: "IT Park Zomin tuman filiali uchun sayt va o'quv boshqaruv tizimi: React + Vite frontend, Django REST API.",
    category: "React + Vite, Django DRF API",
    title: "IT Park Zomin tuman filiali LMS",
    src: "/assets/projects-screenshots/itclms/itc-lms-cover.webp",
    screenshots: ["landing.png", "1.png", "2.png", "3.png"],
    live: "https://www.itclms.uz/",
    github:"https://github.com/Xusanbek0039/ITC-LMS-API",
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.vite, PROJECT_SKILLS.tailwind, PROJECT_SKILLS.js],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.django, PROJECT_SKILLS.vercel],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            IT Park Zomin tuman filiali (IT Shaharchasi) uchun rasmiy sayt va
            o&apos;quv boshqaruv tizimi: kurslar, afzalliklar, statistika va aloqa
            bo&apos;limlari. Ro&apos;yxatdan o&apos;tish va kirish ITC Academy platformasi
            bilan bog&apos;langan.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow
            images={[
              `${BASE_PATH}/itclms/itc-lms-cover.webp`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">🔧 API imkoniyatlari</TypographyH3>
          <p className="font-mono mb-2">
            👥 Foydalanuvchilarni ro&apos;yxatdan o&apos;tkazish va avtorizatsiya · 📚 Kurslar
            va darslar · 📝 Testlar va topshiriqlar · 📊 Baholash tizimi (grades,
            progress) · 🔒 JWT/Token orqali xavfsiz autentifikatsiya · 🧑‍🏫
            O&apos;qituvchi va talaba rollari · 📆 Kalendar va dars jadvali.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/itclms/itc-lms-screenshot-1.webp`,
              `${BASE_PATH}/itclms/itc-lms-screenshot-2.png`,
              `${BASE_PATH}/itclms/itc-lms-screenshot-3.webp`,
              `${BASE_PATH}/itclms/itc-lms-screenshot-4.png`,
              `${BASE_PATH}/itclms/itc-lms-screenshot-5.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">🏗️ Arxitektura</TypographyH3>
          <p className="font-mono mb-2">
            Frontend va backend ajratilgan (decoupled) arxitektura: React + Vite
            asosidagi SPA Vercel CDN&apos;ida joylashgan, ma&apos;lumotlar Django REST
            Framework API orqali JSON ko&apos;rinishida olinadi. SEO uchun Open Graph,
            Twitter Card va geo meta-teglar sozlangan.
          </p>
          <Architecture
            diagram={`Foydalanuvchi (brauzer)
        │
        ▼
Vercel Edge / CDN ──► React SPA (Vite build, Tailwind CSS)
        │                    │  REST / JSON (JWT)
        │                    ▼
        │            Django REST Framework API
        │              ├─ auth & rollar
        │              ├─ kurslar / darslar
        │              ├─ topshiriqlar / baholar
        │              └─ jadval
        ▼
itc-academy.uz (login / ariza)`}
          />
        </div>
      );
    },
  },
  { // 03. ITC Academy Telegram bot
    id: "itc-academy-bot",
    kinds: ["bot", "ai"],
    description: "ITC Academy platformasining Telegram'dagi AI yordamchisi — kurslar va yangiliklar bir joyda.",
    category: "Telegram bot, AI yordamchi",
    title: "ITC Academy Telegram bot",
    src: "/assets/projects-screenshots/itc-bot/itc-academy-bot-cover.png",
    screenshots: ["1.png"],
    live: "https://t.me/itc_academybot",
    skills: {
      frontend: [PROJECT_SKILLS.telegram],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.django, PROJECT_SKILLS.openai],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            @itc_academybot — ITC Academy platformasining Telegram&apos;dagi
            yordamchisi. O&apos;quvchilar saytga kirmasdan ham AI yordamchidan savol
            so&apos;rashi, kurslar va yangiliklar haqida ma&apos;lumot olishi mumkin.
          </TypographyP>
          <ProjectsLinks live={this.live} />
          <SlideShow
            images={[
              `${BASE_PATH}/itc-bot/itc-academy-bot-cover.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">🏗️ Arxitektura</TypographyH3>
          <p className="font-mono mb-2">
            Bot Telegram Bot API orqali ishlaydi va ITC Academy (Django)
            backend&apos;i bilan bitta ma&apos;lumotlar bazasi/API&apos;dan foydalanadi —
            shuning uchun foydalanuvchi, kurs va coin ma&apos;lumotlari sayt bilan
            sinxron.
          </p>
          <Architecture
            diagram={`Telegram foydalanuvchi
        │
        ▼
Telegram Bot API
        │  update'lar
        ▼
Bot servisi (Python)
   ├─ buyruqlar va menyular
   ├─ AI yordamchi ──► LLM API
   └─ platforma bilan integratsiya
        │
        ▼
itc-academy.uz (Django backend + DB)`}
          />
        </div>
      );
    },
  },
  { // 02. FinanceMe project
    id: "goodever",
    kinds: ["web"],
    description: "HORECA, qurilish va ofis mahsulotlari uchun online do'kon: katalog, savatcha, buyurtma va admin panel.",
    category: "Onlayn do'kon, CRM",
    title: "Goodever.uz — onlayn do'kon va CRM",
    src: "/assets/projects-screenshots/goodever/goodever-cover.png",
    screenshots: ["/assets/projects-screenshots/goodever/goodever-cover.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.html,
        PROJECT_SKILLS.css,
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.bootstrap,
      ],
      backend: [
        PROJECT_SKILLS.java,
        PROJECT_SKILLS.maven,
        PROJECT_SKILLS.postgres,
      ],
    },
    live: "https://goodever.uz",
    github: "https://github.com/Xusanbek0039/goodever.uz",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Goodever.uz | Online do&apos;kon
          </TypographyP>
          <TypographyP className="font-mono ">
          Goodever.uz — bu O&apos;zbekistondagi HORECA (mehmonxona, restoran, kafe), qurilish mollari, uy va ofis uchun zarur tovarlarni onlayn xarid qilish imkonini beruvchi zamonaviy internet-do&apos;kon.

          Asosiy imkoniyatlar
Tovarlar bo&apos;yicha to&apos;liq katalog
Qidiruv va filtr orqali saralash
Xarid savatchasi va buyurtma qilish tizimi
Foydalanuvchi ro&apos;yxatdan o&apos;tishi va kirishi
Mahsulotlarga sharh qoldirish (review)
Admin panel orqali tovarlar va buyurtmalarni boshqarish
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Texnologiyalar </TypographyH3>
          <p className="font-mono mb-2">
          Loyiha Full Stack texnologiyalar yordamida ishlab chiqilgan:

Frontend: React.js / Next.js
Backend: Node.js + Express
Ma&apos;lumotlar bazasi: MongoDB / PostgreSQL
Autentifikatsiya: JWT
Admin panel: mahsulotlarni boshqarish, buyurtmalarni ko&apos;rish
Responsive dizayn: barcha qurilmalar uchun moslashuvchan
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/goodever/goodever-cover.png`,
              `${BASE_PATH}/goodever/goodever-screenshot-1.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">🔑 Asosiy imkoniyatlar
          </TypographyH3>
          <p className="font-mono mb-2">
          Tovarlar bo&apos;yicha to&apos;liq katalog
Qidiruv va filtr orqali saralash
Xarid savatchasi va buyurtma qilish tizimi
Foydalanuvchi ro&apos;yxatdan o&apos;tishi va kirishi
Mahsulotlarga sharh qoldirish (review)
Admin panel orqali tovarlar va buyurtmalarni boshqarish
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/goodever/goodever-screenshot-2.webp`,
              `${BASE_PATH}/goodever/goodever-screenshot-3.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">📦 Maqsad
          </TypographyH3>

          <p className="font-mono mb-2">
          Goodever.uz — HORECA va qurilish sohasidagi mahsulotlarni tez va qulay tarzda xaridorlarga yetkazib berishni maqsad qilgan. Sayt foydalanuvchilarga qulay interfeys, tezkor xizmat va ishonchli onlayn savdo tajribasini taqdim etadi.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/goodever/goodever-screenshot-4.png`,
              `${BASE_PATH}/goodever/goodever-screenshot-5.webp`,
              `${BASE_PATH}/goodever/goodever-screenshot-6.webp`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Kuzatuv hamda statistika </TypographyH3>
          <p className="font-mono mb-2">
Mijoz Google Console Claud hizmat ko&apos;rsatish markaziga ulangan shu panel orqali saytdagi nazoratni ko&apos;rishlari mumkin!
          </p>
          <SlideShow images={[
                `${BASE_PATH}/goodever/goodever-screenshot-7.webp`,

            ]} />
        </div>
      );
    },
  },
  { // 03. Portfolio project
    id: "portfolio",
    kinds: ["web"],
    description: "Three.js/Spline 3D interfeysli, animatsiyalarga boy shaxsiy portfolio sayt (Next.js, TypeScript).",
    category: "Portfolio",
    title: "Mening portfolio saytim",
    src: "/assets/projects-screenshots/portfolio/portfolio-cover.webp",
    screenshots: ["assets/projects-screenshots/portfolio/portfolio-cover.webp"],
    live: "https://husanbek-coder.uz/",
    github:"https://github.com/Xusanbek0039/husanbek-coder.uz-3d-web-app",
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.shadcn,
        PROJECT_SKILLS.aceternity,
        PROJECT_SKILLS.framerMotion,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.spline,
      ],
      backend: [],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
Mening portfolio web saytimga xush kelibsiz
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">
            Loyihada 3D modeldan foydalanilgan{" "}
          </TypographyH3>
          <p className="font-mono mb-2">
          🔑 Asosiy xususiyatlar: 🎮 3D Interfeys — foydalanuvchini o&apos;ziga tortadigan WebGL/Three.js asosidagi sahifalar. 💼 Portfolio bo&apos;limi — bajarilgan ishlar, loyihalar va texnik ko&apos;nikmalarni ko&apos;rsatish. 🌙 Dark/Light rejimi — foydalanuvchi qulayligi uchun vizual rejimlarni almashtirish. 🌍 Ko&apos;p tilli qo&apos;llab-quvvatlash — o&apos;zbek va rus tillarida int


          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/portfolio/portfolio-cover.webp`,
              `${BASE_PATH}/portfolio/portfolio-skills.webp`,
            ]}
          />
          <TypographyH3 className="my-4 ">2- xil rejimda tuzilgan</TypographyH3>
          <p className="font-mono mb-2">
            Sayt tungi hamda ertalabgi rejimlarda yaratilgan!
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/portfolio/portfolio-about.webp`,
              `${BASE_PATH}/portfolio/portfolio-contact.webp`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Loyihalarim</TypographyH3>

          <p className="font-mono mb-2">
Saytda siz men haqimda barcha ma&apos;lumotlarni olishingiz mumkin!          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/portfolio/portfolio-projects.webp`,
              `${BASE_PATH}/portfolio/portfolio-blog.webp`,
            ]}
          />
          <p className="font-mono mb-2 mt-8 text-center">
Barcha huquqlar himoyalangan!          </p>
        </div>
      );
    },
  },
  { // 04. Smart parking assitant
    id: "shoira-blog",
    kinds: ["web"],
    isClient: true,
    description: "Uch tilli, dark/light rejimli zamonaviy blog platformasi — maqolalar yozish va ulashish.",
    category: "Portfolio",
    title: "Shoira portfolio web sayt",
    src: "/assets/projects-screenshots/shoira/shoira-blog-cover.png",
    screenshots: ["01.jpeg", "03.png"],
    live: "https://shoira-blog.uz",
    github: "https://github.com/Xusanbek0039/shoira-blog.uz",
    skills: {
      frontend: [PROJECT_SKILLS.python,PROJECT_SKILLS.js],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.html, PROJECT_SKILLS.js, PROJECT_SKILLS.mongo],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
          shoira-blog.uz — bu zamonaviy, xavfsiz va interaktiv blog platformasi bo&apos;lib, foydalanuvchilarga o&apos;z maqolalarini yozish, ularni tahrirlash va boshqalar bilan bo&apos;lishish imkonini beradi. Sayt to&apos;liq mobilga mos, 3 tilda ishlaydi (O&apos;zbek, Rus, Ingliz), va foydalanuvchi qulayligi uchun Dark / Light rejim bilan jihozlangan.


          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow
            images={[
              `${BASE_PATH}/shoira/shoira-blog-cover.png`,
              `${BASE_PATH}/shoira/shoira-blog-screenshot-2.webp`,
              `${BASE_PATH}/shoira/shoira-blog-screenshot-3.png`,
            ]}
          />
        </div>
      );
    },
  },
  { // 05. Smart Job Tracker project
    id: "chatgpt-telegram-bot",
    kinds: ["bot", "ai"],
    description: "OpenAI API asosidagi ochiq kodli ChatGPT Telegram bot.",
    category: "OpenAI API",
    title: "ChatGPT Telegram bot",
    src: "/assets/projects-screenshots/telegram-bot/chatgpt-telegram-bot-cover.png",
    screenshots: ["01.png", "02.png", "03.png","04.png","05.png","06.png","07.png"],
    live: "https://t.me/chatgpt_avtobot",
    github: "https://github.com/Xusanbek0039/openai_api_telegram_bot",
    skills: {
      frontend: [],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.html, PROJECT_SKILLS.js, PROJECT_SKILLS.mongo],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
Ushbu loyiha shunchaki portfolio uchun ochiq kodli etib tuzib chiqilgan. Agarda OpenAI dan API mavjud bo&apos;lsa loyihadan foydalanishingiz mumkin. Biz uchun shunchaki minnatdorchilik bilrishingizni o&apos;zi yetarli!
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow
            images={[
              `${BASE_PATH}/telegram-bot/chatgpt-telegram-bot-screenshot-1.png`,
              `${BASE_PATH}/telegram-bot/chatgpt-telegram-bot-cover.png`,
              `${BASE_PATH}/telegram-bot/chatgpt-telegram-bot-screenshot-2.png`,
              `${BASE_PATH}/telegram-bot/chatgpt-telegram-bot-screenshot-3.webp`,
              `${BASE_PATH}/telegram-bot/chatgpt-telegram-bot-screenshot-4.png`,
              `${BASE_PATH}/telegram-bot/chatgpt-telegram-bot-screenshot-5.png`,
              `${BASE_PATH}/telegram-bot/chatgpt-telegram-bot-screenshot-6.webp`,
            ]}
          />
        </div>
      );
    },
  },
  { // 06. Savinder Puri portfolio project
    id: "instagram-video-bot",
    kinds: ["bot"],
    description: "Instagram videolarini Telegram orqali yuklab beruvchi ochiq kodli bot.",
    category: "Instagram API",
    title: "Instagram Video Upload",
    src: "/assets/projects-screenshots/instagram-bot/instagram-video-bot-cover.png",
    screenshots: ["01.png", "02.png", "03.png","04.png","05.png"],
    live: "https://t.me/insta_videobot",
    github:"https://github.com/Xusanbek0039/instagram-video-bot",
    skills: {
      frontend: [],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.html, PROJECT_SKILLS.js, PROJECT_SKILLS.mongo],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
Ushbu loyiha portfolio uchun tuzib chiqilgan ochiq kodli API bilan ishlaydigan loyiha. Shu sabablama kodlardan siz ham foydalanishingiz mumkin!
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow
            images={[
              `${BASE_PATH}/instagram-bot/instagram-video-bot-cover.png`,
              `${BASE_PATH}/instagram-bot/instagram-video-bot-screenshot-1.png`,
              `${BASE_PATH}/instagram-bot/instagram-video-bot-screenshot-2.png`,
              `${BASE_PATH}/instagram-bot/instagram-video-bot-screenshot-3.png`,
              `${BASE_PATH}/instagram-bot/instagram-video-bot-screenshot-4.png`,
            ]}
          />
        </div>
      );
    },
  },
];
export default projects;
