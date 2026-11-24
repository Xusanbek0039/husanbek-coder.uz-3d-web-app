"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import SkillsSection from "@/components/sections/skills";
import CvSkillsSection from "@/components/sections/cv-skills";
import ProjectsSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";
import StatsSection, { type HomeStats } from "@/components/sections/stats";
import ExperienceSection from "@/components/sections/experience";

function HomePage({ stats, cvAvailable }: { stats: HomeStats; cvAvailable: boolean }) {
  return (
    <>
      <SmoothScroll>
        <main className={cn("bg-slate-100 dark:bg-transparent")}>
          <div className="top-0 z-0 fixed w-full h-screen">
            <AnimatedBackground />
          </div>
          <HeroSection
            rank={stats.committers.rank}
            rankUrl={stats.committers.url}
            metrics={{ years: stats.years, projects: stats.projects, students: stats.students }}
            cvAvailable={cvAvailable}
          />
          <StatsSection stats={stats} />
          <ExperienceSection />
          <SkillsSection />
          <CvSkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </SmoothScroll>
    </>
  );
}

export default HomePage;
