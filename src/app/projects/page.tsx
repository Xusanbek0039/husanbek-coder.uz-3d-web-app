"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";

import "@splidejs/react-splide/css";

const PROJECTS = [
  {
    id: 1,
    name: "IT Park Zomin tuman filiali LMS",
    description: `O'quv bo'limini online qilish uchun LMS loyiha API ma'lumotlari ochiq!`,
    link: "https://itclms.uz",
    images: [
      "/assets/projects-screenshots/itclms/1.png",
      "/assets/projects-screenshots/itclms/2.png",
      "/assets/projects-screenshots/itclms/3.png",
      "/assets/projects-screenshots/itclms/4.png",
      "/assets/projects-screenshots/itclms/5.png"
    ],
  },
  {
    id: 2,
    name: "Online do'kon CRM goodever.uz",
    description: `Online do'kon loyihasi. Zakazga yasab berilgan!`,
    link: "https://github.com/Abhiz2411/FinanceMe-Devops-Project-01",
    images: [
      "/assets/projects-screenshots/goodever/1.png",
      "/assets/projects-screenshots/goodever/2.png",
      "/assets/projects-screenshots/goodever/3.png",
      "/assets/projects-screenshots/goodever/4.png",
      "/assets/projects-screenshots/goodever/5.png",
      "/assets/projects-screenshots/goodever/6.png",
      "/assets/projects-screenshots/goodever/7.png",
      "/assets/projects-screenshots/goodever/8.png"
    ],
  },
  {
    id: 3,
    name: "Husan Suyunov Portfolio Web SiTE",
    description: `Portfolio ko'rsatish uchun ishlab chiqilgan loyiha.`,
    link: "https://www.goodever.uz/",
    images: [
      "/assets/projects-screenshots/portfolio/landing.png",
      "/assets/projects-screenshots/portfolio/blog.png",
      "/assets/projects-screenshots/portfolio/projects.png",
      "/assets/projects-screenshots/portfolio/about.png",
    ],
  },
  {
    id: 4,
    name: "Shoira portfolio",
    description: `Doimiy klent uchun shoira-blog.uz sayt. Backend NodeJS api orqali ishledi.`,
    link: "https://shoira-blog.uz",
    images: [
      "/assets/projects-screenshots/shoira/1.png",
      "/assets/projects-screenshots/shoira/2.png",
      "/assets/projects-screenshots/shoira/3.png",
      "/assets/projects-screenshots/shoira/4.png",
      "/assets/projects-screenshots/shoira/5.png"


    ],
  },
];
function Page() {
  return (
    <>
      <div className="container mx-auto md:px-[50px] xl:px-[150px] text-zinc-300 h-full">
        <h1 className="text-4xl mt-[100px] mb-[50px]">Loyihalar</h1>
        <ul className="grid  md:grid-cols-2 lg:grid-cols-3 gap-10 place-content-around ">
          {PROJECTS.map((project) => (
            <li
              className="w-[300px] h-[400px] border-[.5px] rounded-md border-zinc-600"
              key={project.id}
              style={{ backdropFilter: "blur(2px)" }}
            >
              <div className="h-[200px]">
                <Splide
                  options={{
                    type: "loop",
                    interval: 3000,
                    autoplay: true,
                    speed: 2000,
                    perMove: 1,
                    rewind: true,
                    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
                    arrows: false,
                  }}
                  aria-label="Mening sevimli rasmlarim"
                >
                  {project.images.map((image) => (
                    <SplideSlide key={image}>
                      <Image
                        src={image}
                        alt={`screenshot of "${project.name}`}
                        className="w-[300px] h-[200px] rounded-md bg-zinc-900 "
                        width={300}
                        height={400}
                        style={{ height: "200px" }}
                      />
                    </SplideSlide>
                  ))}
                </Splide>
              </div>
              <div className="p-4 text-zinc-300">
                <h2 className="text-xl">{project.name}</h2>
                <p className="mt-2 text-xs text-zinc-500">
                  {project.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Page;
