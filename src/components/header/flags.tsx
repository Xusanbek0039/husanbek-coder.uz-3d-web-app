import React, { useId } from "react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

// Windows emoji bayroqlarni ko'rsatmaydi ("🇺🇿" o'rniga "UZ" chiqadi), shuning uchun SVG.
type FlagProps = { className?: string };

const base = "inline-block h-4 w-6 shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/10";

// 5 qirrali yulduz (markazi 0,0; radiusi 1)
const STAR = "M0,-1 L0.2245,-0.309 L0.951,-0.309 L0.3633,0.118 L0.5878,0.809 L0,0.382 L-0.5878,0.809 L-0.3633,0.118 L-0.951,-0.309 L-0.2245,-0.309 Z";

export const FlagUZ = ({ className }: FlagProps) => {
  const id = useId().replace(/:/g, "");
  // 12 yulduz: 3 qator — 3, 4, 5 (o'ngdan tekislangan)
  const stars: [number, number][] = [];
  [3, 4, 5].forEach((count, row) => {
    for (let i = 0; i < count; i++) stars.push([205 - i * 24, 20 + row * 22]);
  });
  return (
    <svg viewBox="0 0 500 250" className={cn(base, className)} aria-hidden="true">
      <defs>
        <mask id={`m${id}`}>
          <rect width="500" height="250" fill="#fff" />
          <circle cx="68" cy="42" r="26" fill="#000" />
        </mask>
      </defs>
      <rect width="500" height="250" fill="#fff" />
      <rect width="500" height="80" fill="#0099B5" />
      <rect y="80" width="500" height="5" fill="#CE1126" />
      <rect y="165" width="500" height="5" fill="#CE1126" />
      <rect y="170" width="500" height="80" fill="#1EB53A" />
      <circle cx="58" cy="42" r="30" fill="#fff" mask={`url(#m${id})`} />
      {stars.map(([x, y]) => (
        <path key={`${x}-${y}`} d={STAR} transform={`translate(${x} ${y}) scale(8)`} fill="#fff" />
      ))}
    </svg>
  );
};

export const FlagRU = ({ className }: FlagProps) => (
  <svg viewBox="0 0 9 6" className={cn(base, className)} aria-hidden="true">
    <rect width="9" height="2" y="0" fill="#fff" />
    <rect width="9" height="2" y="2" fill="#0039A6" />
    <rect width="9" height="2" y="4" fill="#D52B1E" />
  </svg>
);

export const FlagGB = ({ className }: FlagProps) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 60 30" className={cn(base, className)} aria-hidden="true">
      <defs>
        <clipPath id={`s${id}`}>
          <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <clipPath id={`t${id}`}>
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#s${id})`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#t${id})`} stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
};

export const LocaleFlag = ({ locale, className }: { locale: Locale } & FlagProps) => {
  if (locale === "ru") return <FlagRU className={className} />;
  if (locale === "en") return <FlagGB className={className} />;
  return <FlagUZ className={className} />;
};
