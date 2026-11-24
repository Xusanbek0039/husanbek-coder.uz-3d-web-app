"use client";
import React, { useEffect, useState } from "react";
import { DiMongodb, DiNginx, DiNpm, DiPostgresql, DiVim } from "react-icons/di";
import {
  FaAws,
  FaCss3,
  FaDocker,
  FaGit,
  FaGithub,
  FaHtml5,
  FaLinux,
  FaNodeJs,
  FaReact,
  FaVuejs,
  FaYarn,
} from "react-icons/fa6";
import { RiFirebaseFill, RiTailwindCssFill } from "react-icons/ri";
import {
  SiDjango,
  SiExpress,
  SiFastapi,
  SiJavascript,
  SiKubuntu,
  SiPrettier,
  SiPython,
  SiTypescript,
  SiVercel,
  SiVisualstudiocode,
} from "react-icons/si";
import { TbTerminal2 } from "react-icons/tb";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const TOOLS = [
  {
    name: "Python",
    content: "Python — asosiy tilim: backend, AI va Telegram botlar",
    icon: <SiPython size={"50px"} color={"#3776ab"} />,
    color: "#3776ab",
  },
  {
    name: "Django",
    content: "Django — LMS, CRM va REST API'lar uchun asosiy freymvork",
    icon: <SiDjango size={"50px"} color={"#fff"} />,
    color: "#092e20",
  },
  {
    name: "FastAPI",
    content: "FastAPI — tezkor asinxron API'lar uchun",
    icon: <SiFastapi size={"50px"} color={"#009688"} />,
    color: "#009688",
  },
  {
    name: "JavaScript",
    content: "JavaScript — yuqori darajadagi, interpretatsiya qilinadigan dasturlash tili",
    icon: <SiJavascript size={"50px"} color={"#f0db4f"} />,
    color: "#f0db4f",
  },
  {
    name: "TypeScript",
    content: "TypeScript — JavaScript asosidagi, lekin statik tiplarga ega dasturlash tili",
    icon: <SiTypescript size={"50px"} color={"#007acc"} />,
    color: "#007acc",
  },
  {
    name: "HTML",
    content: "HTML — veb-sahifalarning tuzilmasini yaratish uchun ishlatiladi",
    icon: <FaHtml5 size={"50px"} color="#e34c26" />,
    color: "#e34c26",
  },
  {
    name: "CSS",
    content: "CSS — veb-sahifalarning ko'rinishi va dizaynini yaratadi",
    icon: <FaCss3 size={"50px"} color="#563d7c" />,
    color: "#563d7c",
  },
  {
    name: "Nodejs",
    content: "Node.js — JavaScript-ni serverda ishga tushirish imkonini beruvchi platforma",
    icon: <FaNodeJs size={"50px"} color="#6cc24a" />,
    color: "#6cc24a",
  },
  {
    name: "React.js",
    content: "React — foydalanuvchi interfeyslarini yaratish uchun JavaScript kutubxonasi",
    icon: <FaReact size={"50px"} color="#61dafb" />,
    color: "#61dafb",
  },
  {
    name: "Docker",
    content: "Docker — ilovalarni konteynerlarda joylash va boshqarish vositasi",
    icon: <FaDocker size={"50px"} color="#2496ed" />,
    color: "#2496ed",
  },
  {
    name: "NginX",
    content: "Nginx — yuqori unumdorlikka ega veb-server va teskari proksi",
    icon: <DiNginx size={"50px"} color="#008000" />,
    color: "#008000",
  },
  {
    name: "Vue.js",
    content: "Vue.js — progressiv JavaScript framework, foydalanuvchi interfeyslari uchun",
    icon: <FaVuejs size={"50px"} color="#41b883" />,
    color: "#41b883",
  },
  {
    name: "Express.js",
    content: "Express.js — Node.js uchun engil va moslashuvchan veb-framework",
    icon: <SiExpress size={"50px"} color="#fff" />,
    color: "#000000",
  },
  {
    name: "PostgreSQL",
    content: "PostgreSQL — kuchli va kengaytiriladigan ochiq kodli ma'lumotlar bazasi",
    icon: <DiPostgresql size={"50px"} color="#336791" />,
    color: "#336791",
  },
  {
    name: "MongoDB",
    content: "MongoDB — hujjatlar asosidagi NoSQL ma'lumotlar bazasi",
    icon: <DiMongodb size={"50px"} color="#4db33d" />,
    color: "#4db33d",
  },
  {
    name: "Tailwind CSS",
    content: "Tailwind — tez va moslashtirilgan veb-dizayn uchun CSS framework",
    icon: <RiTailwindCssFill size={"50px"} color="#06b6d4" />,
    color: "#06b6d4",
  },
  {
    name: "Firebase",
    content: "Firebase — Google'ning backend xizmatlari platformasi",
    icon: <RiFirebaseFill size={"50px"} color="#FFCA28" />,
    color: "#FFCA28",
  },
  {
    name: "Git",
    content: "Git — versiyalarni boshqarish tizimi, kod o'zgarishlarini nazorat qilish uchun",
    icon: <FaGit size={"50px"} color="#f05032" />,
    color: "#f05032",
  },
  {
    name: "GitHub",
    content: "GitHub — Git repozitoriylarini saqlash va boshqarish uchun platforma",
    icon: <FaGithub size={"50px"} color="#fff" />,
    color: "#000000",
  },
  {
    name: "VS Code",
    content: "Visual Studio Code — eng mashhur kod muharriri, kengaytmalarga boy",
    icon: <SiVisualstudiocode size={"50px"} color="#007acc" />,
    color: "#007acc",
  },
  {
    name: "VIM",
    content: "Vim — kuchli klaviatura asosidagi matn muharriri",
    icon: <DiVim size={"50px"} color="#fff" />,
    color: "#000000",
  },
  {
    name: "Prettier",
    content: "Prettier — kodni avtomatik ravishda formatlovchi vosita",
    icon: <SiPrettier size={"50px"} color="#f7b93c" />,
    color: "#f7b93c",
  },
  {
    name: "NPM",
    content: "NPM — JavaScript kutubxonalarini o'rnatish va boshqarish uchun paket menejeri",
    icon: <DiNpm size={"50px"} color="#CB3837" />,
    color: "#CB3837",
  },
  {
    name: "Yarn",
    content: "Yarn — JavaScript paketlarini boshqarish uchun NPM alternativasi",
    icon: <FaYarn size={"50px"} color="#2C8EBB" />,
    color: "#2C8EBB",
  },
  {
    name: "Vercel",
    content: "Vercel — Next.js va boshqa frontend loyihalarini joylash uchun platforma",
    icon: <SiVercel size={"50px"} color="#fff" />,
    color: "#000000",
  },
  {
    name: "Linux",
    content: "Linux — ochiq kodli operatsion tizim yadrosi, ko'p serverlarda ishlatiladi",
    icon: <FaLinux size={"50px"} color="#fff" />,
    color: "#000000",
  },
  {
    name: "Kubuntu",
    content: "Kubuntu — KDE muhitida ishlaydigan Ubuntu distributivi",
    icon: <SiKubuntu size={"50px"} color="#0077C4" />,
    color: "#000000",
  },
  {
    name: "Terminal",
    content: "Terminal — buyruqlar orqali tizim bilan muloqot qilish interfeysi",
    icon: <TbTerminal2 size={"50px"} color="#fff" />,
    color: "#000000",
  },
  {
    name: "AWS",
    content: "AWS — Amazon tomonidan taqdim etilgan keng qamrovli bulutli xizmatlar",
    icon: <FaAws size={"50px"} color="#3f51b5" />,
    color: "#000000",
  },
];

export default function ToolsCarousel() {
  const [toolsLoaded, setToolsLoaded] = useState(false);

  useEffect(() => {
    setToolsLoaded(true);
  }, []);

  if (!toolsLoaded) return <p className="h-[100px]"></p>;

  return (
    <Splide
      options={{
        type: "loop",
        interval: 2000,
        autoplay: true,
        pagination: false,
        speed: 2000,
        perPage: 5,
        perMove: 1,
        rewind: true,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        arrows: false,
        breakpoints: { 640: { perPage: 3 } },
      }}
      aria-label="Men foydalanadigan texnologiyalar"
    >
      {TOOLS.map((tool) => (
        <SplideSlide key={tool.name}>
          <div
            title={tool.content}
            className="w-fit p-2 border-[.5px] border-zinc-600 rounded-md"
          >
            {tool.icon}
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
}
