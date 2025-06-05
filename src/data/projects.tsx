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
    icon: "",
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
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};
const projects: Project[] = [
  { // 01. AI Docker file optimizer project
    id: "LMS",
    category: "DjangoDRF LMS, CRM, API",
    title: "IT Park Zomin tuman filiali LMS",
    src: "/assets/projects-screenshots/itclms/1.png",
    screenshots: ["1.png", "2.png", "3.png"],
    live: "https://itclms.uz/",
    github:"https://github.com/Xusanbek0039/ITC-LMS-API",
    skills: {
      frontend: [PROJECT_SKILLS.js, PROJECT_SKILLS.next, PROJECT_SKILLS.tailwind, PROJECT_SKILLS.vite],
      backend: [PROJECT_SKILLS.openai,PROJECT_SKILLS.netlify,PROJECT_SKILLS.python],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
          🔧 API imkoniyatlari: 👥 Foydalanuvchilarni ro‘yxatdan o‘tkazish va avtorizatsiya qilish 📚 Kurslar va darslar (lessons) bilan ishlash 📝 Testlar va topshiriqlar (assignments)ni boshqarish 📊 Baholash tizimi (grades, progress) 🔒 JWT yoki Token orqali xavfsiz autentifikatsiya 🧑‍🏫 O‘qituvchi va talabalar rollari 📆 Kalendar va jadval integra


          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow
            images={[
              `${BASE_PATH}/itclms/1.png`,
              `${BASE_PATH}/itclms/2.png`,
              `${BASE_PATH}/itclms/3.png`,
              `${BASE_PATH}/itclms/4.png`,
              `${BASE_PATH}/itclms/5.png`,

            ]}
          />
        </div>
      );
    },
  },
  { // 02. FinanceMe project
    id: "Goodever",
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
          <SlideShow images={[`${BASE_PATH}/portfolio/navbar.png`]} />
          <TypographyH3 className="my-4 mt-8">Loyihalarim</TypographyH3>

          <p className="font-mono mb-2">
Saytda siz men haqimda barcha ma`lumotlarni olishingiz mumkin!          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/portfolio/projects.png`,
              `${BASE_PATH}/portfolio/project.png`,
            ]}
          />
          <p className="font-mono mb-2 mt-8 text-center">
Barcha huquqlar himoyalangan!          </p>
        </div>
      );
    },
  },
  { // 04. Smart parking assitant
    id: "portfolio",
    category: "Portfolio",
    title: "Shoira portfolio web sayt",
    src: "/assets/projects-screenshots/shoira/1.png",
    screenshots: ["01.jpeg", "03.png"],
    live: "https://shoira-blog.uz",
    github:"https://github.com/xusanbek0039/shoira-blog,uz",
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
    id: "telegrambot",
    category: "OpenAI API",
    title: "ChatGPT Telegram BOT",
    src: "/assets/projects-screenshots/telegram-bot/02.png",
    screenshots: ["01.png", "02.png", "03.png","04.png","05.png","06.png","07.png"],
    live: "https://t.me/chatgpt_avtobot",
    github:"https://github.com/xusanbek0039/husanbek-coder.uz-3d-web-app",
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
    id: "instavideosave",
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
