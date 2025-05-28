"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image"; // ✅ next/image import qilindi
import {
  DiMongodb,
  DiNginx,
  DiNpm,
  DiPostgresql,
  DiVim,
} from "react-icons/di";
import {
  FaAws,
  FaCss3,
  FaDocker,
  FaEnvelope,
  FaGit,
  FaGithub,
  FaHtml5,
  FaLinkedin,
  FaLinux,
  FaNodeJs,
  FaPhone,
  FaReact,
  FaVuejs,
  FaYarn,
} from "react-icons/fa6";
import {
  RiFirebaseFill,
  RiJavascriptFill,
  RiNextjsFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import {
  SiExpress,
  SiJavascript,
  SiKubuntu,
  SiPm2,
  SiPrettier,
  SiTypescript,
  SiVercel,
  SiVisualstudiocode,
} from "react-icons/si";
import { TbTerminal2 } from "react-icons/tb";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const CONTACT_LINKS = [
  {
    name: "Email",
    content: "itpark0071@gmail",
    href: "mailto:itpark0071@gmail.com",
    icon: <FaEnvelope height={"50px"} />,
  },
  {
    name: "Phone",
    content: "975216686",
    href: "tel:+998975216686",
    icon: <FaPhone height={"50px"} />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/xusanbek0039/ ",
    content: "/zende-abhijit",
    icon: <FaLinkedin height={"50px"} />,
  },
  {
    name: "GitHub",
    href: "https://github.com/xusanbek0039 ",
    content: "/naresh-khatri",
    icon: <FaGithub height={"50px"} />,
  },
];

const TOOLS = [
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
    content: "CSS — veb-sahifalarning ko‘rinishi va dizaynini yaratadi",
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
    content: "PostgreSQL — kuchli va kengaytiriladigan ochiq kodli ma’lumotlar bazasi",
    icon: <DiPostgresql size={"50px"} color="#336791" />,
    color: "#336791",
  },
  {
    name: "MongoDB",
    content: "MongoDB — hujjatlar asosidagi NoSQL ma’lumotlar bazasi",
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
    content: "Firebase — Google’ning backend xizmatlari platformasi",
    icon: <RiFirebaseFill size={"50px"} color="#FFCA28" />,
    color: "#FFCA28",
  },
  {
    name: "Git",
    content: "Git — versiyalarni boshqarish tizimi, kod o‘zgarishlarini nazorat qilish uchun",
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
    content: "NPM — JavaScript kutubxonalarini o‘rnatish va boshqarish uchun paket menejeri",
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
    content: "Linux — ochiq kodli operatsion tizim yadrosi, ko‘p serverlarda ishlatiladi",
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


function Page() {
  const [toolsLoaded, setToolsLoaded] = useState(false);

  useEffect(() => {
    setToolsLoaded(true);
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[200px] text-zinc-300 pt-20 pb-20">
      <div className="flex flex-col lg:flex-row gap-5">
        <aside className="w-full md:basis-1/4">
          <div
            className="p-4 md:p-8 lg:p-10 rounded-2xl border-[.5px] border-zinc-600"
            style={{
              backdropFilter: "blur(2px)",
            }}
          >
            <div className="flex flex-row lg:flex-col items-center">
              <div className="flex justify-center items-center lg:w-full lg:aspect-square bg-zinc-800 rounded-xl lg:mb-5">
                {/* ✅ img o'rniga next/image */}
                <Image
                  className="rounded-full p-4 lg:p-10 w-[100px] md:w-[150px] lg:w-[200px] aspect-square bg-zinc-800"
                  alt="me"
                  src="/assets/me.jpg"
                  width={200}
                  height={200}
                />
              </div>
              <div className="flex flex-col gap-3 lg:items-center ml-10 md:ml-20 lg:ml-0">
                <p className="text-center text-xl">Husan Suyunov</p>
                <div className="text-xs bg-zinc-700 w-fit px-3 py-1 rounded-full">
                  Full-Stack Developer
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <hr className="my-10 border-zinc-600" />
              <ul className="flex flex-col gap-3">
                {CONTACT_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      className="flex items-center px-3 gap-3 w-full h-12 border-zinc-700 bg-zinc-800 hover:border-zinc-600 border-[.5px] rounded-md "
                      href={link.href}
                    >
                      <div className="w-8">{link.icon}</div>
                      <div className="flex flex-col">
                        <div className="text-sm">{link.name}</div>
                        <div className="text-xs text-zinc-500">
                          {link.content}
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
        <main className="basis-3/4 w-[500px]">
          <div
            className="p-10 border-[.5px] rounded-md border-zinc-600"
            style={{ backdropFilter: "blur(2px)" }}
          >
                <h1 className="text-3xl mb-10 lg:md-20">Men haqimda</h1>
                <p className="mb-10 text-roboto">
                  Assalomu alaykum! Men Suyunov Husan, Toshkent shahridagi Kimyo Universitetining 
                  “Tarmoqlarda biznesni boshqarish” yo‘nalishi bo‘yicha 4-kurs talabasi va Full Stack dasturchiman. 
                  Web texnologiyalar, foydalanuvchi interfeyslari (frontend) va server qismini (backend) ishlab chiqishda 
                  chuqur bilim va tajribaga egaman. Men zamonaviy veb-ilovalarni yaratishda React, Next.js, Node.js, 
                  MongoDB, PostgreSQL kabi texnologiyalardan faol foydalanaman. 
                </p>
                <p className="mb-10">
                  Avtomatlashtirilgan tizimlar yaratish, foydalanuvchi tajribasini yaxshilash, hamkorlikda ishlash va 
                  natijaga yo‘naltirilgan yondashuv – mening asosiy ustuvorliklarimdan. 
                  Bo‘sh vaqtlarimda yangi texnologiyalarni o‘rganaman, kod yozaman, 
                  va ilhom olish uchun kofe ichib, yangi loyihalar ustida fikr yuritaman.
                </p>

            <h1 className="text-3xl mb-10 lg:md-20">Men foydalanadigan narsalar</h1>
            <div className="mb-5">
              {!toolsLoaded ? (
                <p className="h-[100px]"></p>
              ) : (
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
                  }}
                  aria-label="Mening sevimli rasmlarim"
                >
                  {TOOLS.reverse().map((tool) => (
                    <SplideSlide key={tool.name}>
                      <div
                        key={tool.name}
                        className="w-fit p-2 border-[.5px] border-zinc-600 rounded-md"
                      >
                        {tool.icon}
                      </div>
                    </SplideSlide>
                  ))}
                </Splide>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;