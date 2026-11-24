import { ArrowUpRight } from "lucide-react";
import { SiGithub, SiTelegram } from "react-icons/si";
import { cn } from "@/lib/utils";

/** https://www.itclms.uz/ → itclms.uz, https://t.me/itc_academybot → @itc_academybot */
export const displayHost = (url: string) => {
  try {
    const u = new URL(url);
    if (u.hostname === "t.me") return "@" + u.pathname.replace(/^\/|\/$/g, "");
    return u.hostname.replace(/^www\./, "") + u.pathname.replace(/\/$/, "");
  } catch {
    return url;
  }
};

/** Loyihaning jonli sayti va GitHub kodi — doim ko'rinadigan havolalar */
const ProjectLinks = ({
  live,
  github,
  className,
}: {
  live: string;
  github?: string;
  className?: string;
}) => {
  const isBot = live.includes("t.me/");
  const chip =
    "inline-flex items-center gap-1.5 rounded-md border-[.5px] px-2.5 py-1 text-xs font-mono transition-colors";
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <a
        href={live}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(chip, "border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20")}
      >
        {isBot && <SiTelegram className="w-3 h-3" />}
        {displayHost(live)}
        <ArrowUpRight className="w-3 h-3" />
      </a>
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(chip, "border-zinc-400 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:border-zinc-500 dark:hover:border-zinc-400")}
        >
          <SiGithub className="w-3 h-3" />
          GitHub
          <ArrowUpRight className="w-3 h-3" />
        </a>
      )}
    </div>
  );
};

export default ProjectLinks;
