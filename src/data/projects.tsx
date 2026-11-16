import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowDownUpIcon, ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import next from "next";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
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
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import css from "styled-jsx/css";
const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      <Link
        className="font-mono underline flex gap-2"
        rel="noopener"
        target="_new"
        href={live}
      >
        <Button variant={"default"} size={"sm"}>
          Tashrif buyurish
          <ArrowUpRight className="ml-3 w-5 h-5" />
        </Button>
      </Link>
      {repo && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
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
    icon: <img src="assets/icons/openai-svgrepo-com_white.svg" alt="OpenAI"/>,
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
    icon: <img src="assets/icons/icons8-java.svg" alt="Java"/>,
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
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  description: string;
  github?: string;
  live: string;
};
const projects: Project[] = [
  { // 00. MarosimGo — marosim xizmatlari platformasi
    id: "marosimgo",
    description: "Oila, video studiya va to'yxonani bitta platformada bog'laydigan tizim: Django DRF API + 5 ta Next.js panel.",
    category: "Django DRF + Next.js, 5 ta panel",
    title: "MarosimGo — marosimlar uchun raqamli platforma",
    src: "/assets/projects-screenshots/marosimgo/1.png",
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
            MarosimGo — oila, video studiya va to‘yxonani bitta platformada
            bog‘laydigan tizim: to‘yxonani tanlash va bron qilishdan tortib,
            marosim videolarini xavfsiz saqlash va yaqinlar bilan ruxsat
            asosida ulashishgacha.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow
            images={[
              `${BASE_PATH}/marosimgo/1.png`,
              `${BASE_PATH}/marosimgo/2.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">👥 Uch tomon — bitta platforma</TypographyH3>
          <p className="font-mono mb-2">
            👰 Oilalar — marosim arxivi, galereya, mehmonlarni taklif qilish ·
            🎬 Studiyalar — video va rasmlarni yuklash, portfolio, reels, chat ·
            🏛️ To‘yxonalar — zallar, bo‘sh kunlar kalendari, bron so‘rovlari ·
            🛡️ Super Admin va Admin paneli — granular ruxsatlar, monitoring,
            audit va obunalar.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/marosimgo/3.png`,
              `${BASE_PATH}/marosimgo/4.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">🏗️ Arxitektura</TypographyH3>
          <p className="font-mono mb-2">
            API-first arxitektura: barcha biznes logika va REST API faqat
            Django’da (/api/v1/), Next.js ilovalari esa faqat interfeys.
            Har bir rol uchun alohida Next.js panel statik build qilinib,
            bitta Django (Passenger) ilovasi orqali 7 ta domenga xizmat
            ko‘rsatadi — domen nomiga qarab kerakli panel ochiladi. Panellar
            API’ni o‘z domenida chaqiradi, shuning uchun cookie’lar
            first-party, CORS kerak emas. Kelajakdagi mobil ilovalar ham
            xuddi shu API’dan Bearer token bilan foydalanadi.
          </p>
          <Architecture
            diagram={`marosimgo.uz ............ Landing (HTML/CSS + Three.js)
superadmin. / admin. .... Next.js 16 panel (Super Admin, Admin)
studio. ................. Next.js panel (Studiya)
userlogin. .............. Next.js panel (Oila, mehmonlar)
toyxona. ................ Next.js panel (To‘yxona)
api. .................... Mobil ilovalar uchun REST API
        │  HTTPS, /api/v1/ (same-origin cookie yoki Bearer)
        ▼
Passenger ──► Django 5.2 + DRF (bitta ilova)
               ├─ accounts      — JWT, rollar, RBAC, JSHSHIR shifrlash
               ├─ ceremonies    — marosim arxivi, taklifnomalar
               ├─ studios / venues — studiya va to‘yxonalar, bron
               ├─ media         — yuklash, watermark, ko‘rish
               ├─ subscriptions — obuna rejalari va limitlar
               ├─ audit / monitoring — o‘zgarmas jurnal, API statistikasi
               └─ storage       ──► Google Drive (OAuth 2.0)
        │
        ▼
SQLite → PostgreSQL (DATABASE_URL) · Redis kesh (ixtiyoriy)`}
          />
          <TypographyH3 className="my-4 mt-8">🔒 Xavfsizlik</TypographyH3>
          <p className="font-mono mb-2">
            JWT (access 10 daqiqa, refresh 7 kun, rotation + blacklist, qayta
            ishlatilgan refresh’da barcha sessiyalar bekor qilinadi) · tokenlar
            faqat HttpOnly cookie’da · CSRF tekshiruvi · brute-force himoyasi va
            throttling · JSHSHIR Fernet bilan shifrlanadi, HMAC orqali qidiriladi ·
            rasmlardan EXIF o‘chiriladi va WEBP’ga qayta kodlanadi · CSP va
            xavfsizlik sarlavhalari · har bir amal audit jurnaliga yoziladi.
            Backend pytest testlari va GitHub Actions CI bilan tekshiriladi.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/marosimgo/5.png`,
            ]}
          />
        </div>
      );
    },
  },
  { // 01. ITC Academy — o'quv platformasi
    id: "itc-academy",
    description: "Video darslar, testlar, AI yordamchi, coin tizimi va onlayn to'lovlarga ega IT ta'lim platformasi (Django, PWA).",
    category: "Django LMS, PWA, To'lov tizimi",
    title: "ITC Academy — onlayn IT ta'lim platformasi",
    src: "/assets/projects-screenshots/itc-academy/1.png",
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
            itc-academy.uz — IT kasblarini noldan o‘rganish uchun to‘liq onlayn
            platforma: video darslar, testlar, uy vazifalari, AI yordamchi,
            o‘yinlar, coin tizimi va sertifikatlar — hammasi bitta joyda.
          </TypographyP>
          <ProjectsLinks live={this.live} />
          <SlideShow
            images={[
              `${BASE_PATH}/itc-academy/1.png`,
              `${BASE_PATH}/itc-academy/2.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">🔑 Asosiy imkoniyatlar</TypographyH3>
          <p className="font-mono mb-2">
            🎬 Video darslar va amaliy topshiriqlar · 📝 Testlar va uy vazifalari
            (ustoz tekshiradi) · 🤖 24/7 AI yordamchi (sayt va Telegram bot
            orqali) · 🪙 Coin tizimi — test, vazifa, kunlik savol va o‘yinlar
            uchun coin, do‘kon va kurs chegirmalari · 🎓 Sertifikatlar · 👨‍👩‍👧
            Ota-ona paneli (davomat va baholar) · 📚 Kutubxona va startaplar
            bo‘limi.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/itc-academy/4.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">💳 Pullik kurslar va to‘lovlar</TypographyH3>
          <p className="font-mono mb-2">
            Kurslar bir martalik to‘lov bilan umrbod ochiladi — to‘lovdan keyin
            kurs avtomatik faollashadi. Click, Payme, Paynet, Uzum, Humo kabi
            mahalliy to‘lov tizimlari qo‘llab-quvvatlanadi.
          </p>
          <TypographyH3 className="my-4 mt-8">📰 Blog va yangiliklar</TypographyH3>
          <p className="font-mono mb-2">
            IT dunyosi yangiliklari, darsliklar va maslahatlar — kategoriyalar,
            qidiruv, layk va izohlar bilan.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/itc-academy/3.png`,
              `${BASE_PATH}/itc-academy/5.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">🏗️ Arxitektura</TypographyH3>
          <p className="font-mono mb-2">
            Server-side rendering asosidagi monolit Django ilova. Sahifalar
            Django shablonlari orqali serverda yig‘iladi, interaktivlik va 3D
            effektlar esa vanilla JS + GSAP/ScrollTrigger, Lenis va Three.js
            yordamida qo‘shilgan. Sayt PWA sifatida o‘rnatiladi (service worker),
            Android (TWA) va desktop ilova ko‘rinishida ham ishlaydi.
          </p>
          <Architecture
            diagram={`Brauzer / PWA / Android (TWA) / Desktop ilova
        │  HTTPS
        ▼
Nginx (reverse proxy + kesh)
        │
        ▼
Phusion Passenger ──► Django (monolit, MVT)
                       ├─ accounts   — ro‘yxat, login, rollar (o‘quvchi/ustoz/ota-ona)
                       ├─ kurslar    — darslar, video, test, vazifa
                       ├─ coin       — mukofot, do‘kon, chegirmalar
                       ├─ blog       — postlar, layk, izohlar
                       ├─ payments   — Click / Payme / Paynet / Uzum
                       └─ AI yordamchi API
        │                         ▲
        ▼                         │
  Ma’lumotlar bazasi       Telegram bot (@itc_academybot)`}
          />
          <p className="font-mono mb-2">
            Xavfsizlik: CSRF himoyasi, X-Frame-Options: DENY, nosniff va XSS
            sarlavhalari, faqat HTTPS orqali ishlovchi cookie’lar.
          </p>
        </div>
      );
    },
  },
  { // 02. ITC LMS — IT Park Zomin
    id: "itc-lms",
    description: "IT Park Zomin tuman filiali uchun sayt va o'quv boshqaruv tizimi: React + Vite frontend, Django REST API.",
    category: "React + Vite, Django DRF API",
    title: "IT Park Zomin tuman filiali LMS",
    src: "/assets/projects-screenshots/itclms/landing.png",
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
            o‘quv boshqaruv tizimi: kurslar, afzalliklar, statistika va aloqa
            bo‘limlari. Ro‘yxatdan o‘tish va kirish ITC Academy platformasi
            bilan bog‘langan.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow
            images={[
              `${BASE_PATH}/itclms/landing.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">🔧 API imkoniyatlari</TypographyH3>
          <p className="font-mono mb-2">
            👥 Foydalanuvchilarni ro‘yxatdan o‘tkazish va avtorizatsiya · 📚 Kurslar
            va darslar · 📝 Testlar va topshiriqlar · 📊 Baholash tizimi (grades,
            progress) · 🔒 JWT/Token orqali xavfsiz autentifikatsiya · 🧑‍🏫
            O‘qituvchi va talaba rollari · 📆 Kalendar va dars jadvali.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/itclms/1.png`,
              `${BASE_PATH}/itclms/2.png`,
              `${BASE_PATH}/itclms/3.png`,
              `${BASE_PATH}/itclms/4.png`,
              `${BASE_PATH}/itclms/5.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">🏗️ Arxitektura</TypographyH3>
          <p className="font-mono mb-2">
            Frontend va backend ajratilgan (decoupled) arxitektura: React + Vite
            asosidagi SPA Vercel CDN’ida joylashgan, ma’lumotlar Django REST
            Framework API orqali JSON ko‘rinishida olinadi. SEO uchun Open Graph,
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
    description: "ITC Academy platformasining Telegram'dagi AI yordamchisi — kurslar va yangiliklar bir joyda.",
    category: "Telegram Bot, AI yordamchi",
    title: "ITC Academy Telegram BOT",
    src: "/assets/projects-screenshots/itc-bot/1.png",
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
            @itc_academybot — ITC Academy platformasining Telegram’dagi
            yordamchisi. O‘quvchilar saytga kirmasdan ham AI yordamchidan savol
            so‘rashi, kurslar va yangiliklar haqida ma’lumot olishi mumkin.
          </TypographyP>
          <ProjectsLinks live={this.live} />
          <SlideShow
            images={[
              `${BASE_PATH}/itc-bot/1.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">🏗️ Arxitektura</TypographyH3>
          <p className="font-mono mb-2">
            Bot Telegram Bot API orqali ishlaydi va ITC Academy (Django)
            backend’i bilan bitta ma’lumotlar bazasi/API’dan foydalanadi —
            shuning uchun foydalanuvchi, kurs va coin ma’lumotlari sayt bilan
            sinxron.
          </p>
          <Architecture
            diagram={`Telegram foydalanuvchi
        │
        ▼
Telegram Bot API
        │  update’lar
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
    description: "HORECA, qurilish va ofis mahsulotlari uchun online do'kon: katalog, savatcha, buyurtma va admin panel.",
    category: "Online magazin CRM",
    title: "Sotuv bo`limini online qilish",
    src: "/assets/projects-screenshots/goodever/1.png",
    screenshots: ["/assets/projects-screenshots/goodever/1.png"],
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
            Goodever.uz | Online do`kon
          </TypographyP>
          <TypographyP className="font-mono ">
          Goodever.uz — bu O‘zbekistondagi HORECA (mehmonxona, restoran, kafe), qurilish mollari, uy va ofis uchun zarur tovarlarni onlayn xarid qilish imkonini beruvchi zamonaviy internet-do‘kon.

          Asosiy imkoniyatlar
Tovarlar bo‘yicha to‘liq katalog
Qidiruv va filtr orqali saralash
Xarid savatchasi va buyurtma qilish tizimi
Foydalanuvchi ro‘yxatdan o‘tishi va kirishi
Mahsulotlarga sharh qoldirish (review)
Admin panel orqali tovarlar va buyurtmalarni boshqarish
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Texnologiyalar </TypographyH3>
          <p className="font-mono mb-2">
          Loyiha Full Stack texnologiyalar yordamida ishlab chiqilgan:

Frontend: React.js / Next.js
Backend: Node.js + Express
Ma`lumotlar bazasi: MongoDB / PostgreSQL
Autentifikatsiya: JWT
Admin panel: mahsulotlarni boshqarish, buyurtmalarni ko‘rish
Responsive dizayn: barcha qurilmalar uchun moslashuvchan
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/goodever/1.png`,
              `${BASE_PATH}/goodever/2.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">🔑 Asosiy imkoniyatlar
          </TypographyH3>
          <p className="font-mono mb-2">
          Tovarlar bo‘yicha to‘liq katalog
Qidiruv va filtr orqali saralash
Xarid savatchasi va buyurtma qilish tizimi
Foydalanuvchi ro‘yxatdan o‘tishi va kirishi
Mahsulotlarga sharh qoldirish (review)
Admin panel orqali tovarlar va buyurtmalarni boshqarish
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/goodever/3.png`,
              `${BASE_PATH}/goodever/4.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">📦 Maqsad
          </TypographyH3>

          <p className="font-mono mb-2">
          Goodever.uz — HORECA va qurilish sohasidagi mahsulotlarni tez va qulay tarzda xaridorlarga yetkazib berishni maqsad qilgan. Sayt foydalanuvchilarga qulay interfeys, tezkor xizmat va ishonchli onlayn savdo tajribasini taqdim etadi.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/goodever/5.png`,
              `${BASE_PATH}/goodever/6.png`,
              `${BASE_PATH}/goodever/7.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Kuzatuv hamda statistika </TypographyH3>
          <p className="font-mono mb-2">
Mijoz Google Console Claud hizmat ko`rsatish markaziga ulangan shu panel orqali saytdagi nazoratni ko`rishlari mumkin!
          </p>
          <SlideShow images={[
                `${BASE_PATH}/goodever/8.png`,

            ]} />
        </div>
      );
    },
  },
  { // 03. Portfolio project
    id: "portfolio",
    description: "Three.js/Spline 3D interfeysli, animatsiyalarga boy shaxsiy portfolio sayt (Next.js, TypeScript).",
    category: "Portfolio",
    title: "Mening portfolio saytim",
    src: "/assets/projects-screenshots/portfolio/landing.png",
    screenshots: ["assets/projects-screenshots/portfolio/landing.png"],
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
          🔑 Asosiy xususiyatlar: 🎮 3D Interfeys — foydalanuvchini o‘ziga tortadigan WebGL/Three.js asosidagi sahifalar. 💼 Portfolio bo‘limi — bajarilgan ishlar, loyihalar va texnik ko‘nikmalarni ko‘rsatish. 🌙 Dark/Light rejimi — foydalanuvchi qulayligi uchun vizual rejimlarni almashtirish. 🌍 Ko‘p tilli qo‘llab-quvvatlash — o‘zbek va rus tillarida int


          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/portfolio/landing.png`,
              `${BASE_PATH}/portfolio/skills.png`,
            ]}
          />
          <TypographyH3 className="my-4 ">2- xil rejimda tuzilgan</TypographyH3>
          <p className="font-mono mb-2">
            Sayt tungi hamda ertalabgi rejimlarda yaratilgan!
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/portfolio/about.png`,
              `${BASE_PATH}/portfolio/contact.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Loyihalarim</TypographyH3>

          <p className="font-mono mb-2">
Saytda siz men haqimda barcha ma`lumotlarni olishingiz mumkin!          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/portfolio/projects.png`,
              `${BASE_PATH}/portfolio/blog.png`,
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
    description: "Uch tilli, dark/light rejimli zamonaviy blog platformasi — maqolalar yozish va ulashish.",
    category: "Portfolio",
    title: "Shoira portfolio web sayt",
    src: "/assets/projects-screenshots/shoira/1.png",
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
          shoira-blog.uz — bu zamonaviy, xavfsiz va interaktiv blog platformasi bo‘lib, foydalanuvchilarga o‘z maqolalarini yozish, ularni tahrirlash va boshqalar bilan bo‘lishish imkonini beradi. Sayt to‘liq mobilga mos, 3 tilda ishlaydi (O‘zbek, Rus, Ingliz), va foydalanuvchi qulayligi uchun Dark / Light rejim bilan jihozlangan.


          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow
            images={[
              `${BASE_PATH}/shoira/1.png`,
              `${BASE_PATH}/shoira/3.png`,
              `${BASE_PATH}/shoira/4.png`,
            ]}
          />
        </div>
      );
    },
  },
  { // 05. Smart Job Tracker project
    id: "chatgpt-telegram-bot",
    description: "OpenAI API asosidagi ochiq kodli ChatGPT Telegram bot.",
    category: "OpenAI API",
    title: "ChatGPT Telegram BOT",
    src: "/assets/projects-screenshots/telegram-bot/02.png",
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
Ushbu loyiha shunchaki portfolio uchun ochiq kodli etib tuzib chiqilgan. Agarda OpenAI dan API mavjud bo`lsa loyihadan foydalanishingiz mumkin. Biz uchun shunchaki minnatdorchilik bilrishingizni o`zi yetarli!
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow
            images={[
              `${BASE_PATH}/telegram-bot/01.png`,
              `${BASE_PATH}/telegram-bot/02.png`,
              `${BASE_PATH}/telegram-bot/03.png`,
              `${BASE_PATH}/telegram-bot/04.png`,
              `${BASE_PATH}/telegram-bot/05.png`,
              `${BASE_PATH}/telegram-bot/06.png`,
              `${BASE_PATH}/telegram-bot/07.png`,
            ]}
          />
        </div>
      );
    },
  },
  { // 06. Savinder Puri portfolio project
    id: "instagram-video-bot",
    description: "Instagram videolarini Telegram orqali yuklab beruvchi ochiq kodli bot.",
    category: "Instagram API",
    title: "Instagram Video Upload",
    src: "/assets/projects-screenshots/instagram-bot/01.png",
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
              `${BASE_PATH}/instagram-bot/01.png`,
              `${BASE_PATH}/instagram-bot/02.png`,
              `${BASE_PATH}/instagram-bot/03.png`,
              `${BASE_PATH}/instagram-bot/04.png`,
              `${BASE_PATH}/instagram-bot/05.png`,
            ]}
          />
        </div>
      );
    },
  },
];
export default projects;
