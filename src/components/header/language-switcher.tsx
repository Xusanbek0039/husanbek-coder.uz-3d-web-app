"use client";
import React, { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { LocaleFlag } from "./flags";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeNames, type Locale } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const change = (next: Locale) => {
    if (next === locale) return;
    const { search, hash } = window.location;
    startTransition(() => {
      router.replace(`${pathname}${search}${hash}`, { locale: next });
    });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        aria-label={t("language")}
        className={cn(
          "flex items-center gap-1.5 h-8 px-2 mr-4 rounded-md",
          "hover:bg-accent focus:outline-none disabled:opacity-50",
          className
        )}
        disabled={isPending}
      >
        <LocaleFlag locale={locale} />
        <span className="sr-only">{localeNames[locale]}</span>
        <ChevronDown className="w-3 h-3 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[99999]">
        {routing.locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onSelect={() => change(l)}
            className={cn("cursor-pointer", l === locale && "font-bold")}
          >
            <LocaleFlag locale={l} className="mr-2" />
            {localeNames[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
