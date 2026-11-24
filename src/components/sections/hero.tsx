import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { File, FolderKanban, Trophy } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiTelegram, SiYoutube } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { config } from "@/data/config";
import { useTranslations } from "next-intl";

const AVATAR = "https://avatars.githubusercontent.com/u/109731657?v=4";

const HeroSection = ({ rank, rankUrl }: { rank: number; rankUrl: string }) => {
  const t = useTranslations("hero");
  const { isLoading } = usePreloader();

  return (
    <section id="hero" className={cn("relative w-full h-screen")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-28 sm:pt-0 sm:pb-32 md:p-24 lg:p-40 xl:p-48"
          )}
        >
          {!isLoading && (
            <>
              <div className="">
                <BlurIn delay={0.5}>
                  <div className="flex flex-wrap items-center gap-2 ml-3 mb-2">
                    <span className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 pl-1 pr-3 py-1 text-xs text-emerald-600 dark:text-emerald-300 font-sans">
                      <Image
                        src={AVATAR}
                        alt={config.author}
                        width={24}
                        height={24}
                        priority
                        className="rounded-full w-6 h-6"
                      />
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                      {t("openToWork")}
                    </span>
                    <a
                      href={rankUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs text-amber-700 dark:text-amber-300 font-sans hover:bg-amber-500/20 transition-colors"
                    >
                      <Trophy className="w-3.5 h-3.5" />
                      {t("rankBadge", { rank })}
                    </a>
                  </div>
                </BlurIn>
                <BlurIn delay={0.7}>
                  <p
                    className={cn(
                      "md:self-start mt-4 font-thin text-md text-slate-500 dark:text-zinc-400 ml-3",
                      "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
                    )}
                  >
                    {t("greeting")}
                    <br className="md:hidden" />
                  </p>
                </BlurIn>
                <BlurIn delay={1}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <h1
                        className={cn(
                          "font-thin text-6xl text-transparent text-slate-800 ml-1 text-left",
                          "cursor-default text-edge-outline font-display sm:text-7xl md:text-9xl "
                        )}
                      >
                        {config.author.split(" ")[0]}
                        <br className="md:block hiidden" />
                        {config.author.split(" ")[1]}
                        {/* PLEASE hello??

                        <br className="md:block hiidden" />
                        UNMUTE ME 😢😢 */}
                      </h1>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="dark:bg-white dark:text-black"
                    >
                      {t("motto")}
                    </TooltipContent>

                  </Tooltip>
                </BlurIn>
                {/* <div className="md:block hidden bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 w-screen h-px animate-fade-right animate-glow" /> */}
                <BlurIn delay={1.2}>
                  <p
                    className={cn(
                      "md:self-start md:mt-4 font-thin text-md text-slate-500 dark:text-zinc-400 ml-3",
                      "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
                    )}
                  >
                    {t("role")}
                  </p>
                </BlurIn>
                <BlurIn delay={1.4}>
                  <p className="ml-3 mt-2 max-w-md text-sm text-slate-600 dark:text-zinc-400 font-sans">
                    {t("tagline")}
                  </p>
                </BlurIn>
              </div>
              <div className="mt-8 md:ml-2 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                <Link href={"#projects"} className="flex-1">
                  <BoxReveal delay={1.8} width="100%">
                    <Button variant={"secondary"} className="flex items-center gap-2 w-full">
                      <FolderKanban size={22} />
                      <p>{t("viewProjects")}</p>
                    </Button>
                  </BoxReveal>
                </Link>
                <Link
                  href={
                    "https://drive.google.com/file/d/1CeOgFcAtSVFQ-uLgslayaFbH1eCEwDEM/view?usp=sharing"
                  }
                  target="_blank"
                  className="flex-1"
                >
                  <BoxReveal delay={2} width="100%" >
                    <Button className="flex items-center gap-2 w-full">
                      <File size={24} />
                      <p>{t("cv")}</p>
                    </Button>
                  </BoxReveal>
                </Link>
                </div>
                <div className="md:self-start flex flex-wrap gap-3">
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link href={"#contact"}>
                        <Button
                          variant={"outline"}
                          className="block w-full overflow-hidden"
                        >
                          {t("message")}
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>{t("messageTooltip")}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Link
                    href={config.social.youtube}
                    target="_blank"
                  >
                    <Button variant={"outline"}>
                      <SiYoutube size={24} />
                    </Button>
                  </Link>
                  <Link
                    href={config.social.github}
                    target="_blank"
                  >
                    <Button variant={"outline"}>
                      <SiGithub size={24} />
                    </Button>
                  </Link>
                  <Link
                    href={config.social.linkedin}
                    target="_blank"
                    aria-label="LinkedIn"
                  >
                    <Button variant={"outline"}>
                      <FaLinkedin size={24} />
                    </Button>
                  </Link>
                  <Link
                    href={config.social.telegram}
                    target="_blank"
                  >
                    <Button variant={"outline"}>
                      <SiTelegram size={24} />
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="grid col-span-1"></div>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </section>
  );
};

export default HeroSection;
