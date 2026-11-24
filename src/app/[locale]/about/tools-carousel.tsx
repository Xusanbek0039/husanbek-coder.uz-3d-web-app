"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { skills } from "@/data/skills";
import { skillIcon } from "@/components/profile/skill-icons";

export default function ToolsCarousel() {
  const t = useTranslations("about");
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
      aria-label={t("tools")}
    >
      {skills.map((skill) => {
        const Icon = skillIcon(skill.name);
        return (
          <SplideSlide key={skill.name}>
            <div
              title={skill.name}
              className="w-fit p-2 border-[.5px] border-zinc-600 rounded-md text-zinc-100"
            >
              <Icon size={50} aria-hidden="true" />
              <span className="sr-only">{skill.name}</span>
            </div>
          </SplideSlide>
        );
      })}
    </Splide>
  );
}
