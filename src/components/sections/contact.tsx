"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiGithub, SiTelegram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import ContactForm from "../ContactForm";
import SectionHeading from "../ui/section-heading";
import { config } from "@/data/config";
import { Link as LocaleLink } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const SOCIALS = [
  { href: config.social.telegram, label: "Telegram", handle: "@husanbek_coder", icon: SiTelegram },
  { href: config.social.github, label: "GitHub", handle: "Xusanbek0039", icon: SiGithub },
  { href: config.social.linkedin, label: "LinkedIn", handle: "xusanbek0039", icon: FaLinkedin },
];

const ContactSection = () => {
  const t = useTranslations("contactSection");
  return (
    <section id="contact" aria-labelledby="contact-title" className="min-h-screen max-w-7xl mx-auto px-4">
      <SectionHeading id="contact-title" className="pt-16">
        {t("title")}
      </SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 z-[9999]">
        <Card className="min-w-7xl bg-white/85 dark:bg-black/75 backdrop-blur-sm rounded-xl mt-10 md:mt-20">
          <CardHeader>
            <CardTitle className="text-4xl">{t("card")}</CardTitle>
            <CardDescription className="text-neutral-700 dark:text-neutral-300">
              {t("desc1")}{" "}
              <a
                href={`mailto:${config.email}`}
                className="underline underline-offset-4 text-neutral-900 dark:text-neutral-100"
              >
                {config.email}
              </a>{" "}
              {t("desc2")}
              <LocaleLink
                href="/services#buyurtma"
                className="mt-3 block w-fit underline underline-offset-4 text-neutral-900 hover:text-black dark:text-zinc-100 dark:hover:text-white"
              >
                {t("order")}
              </LocaleLink>
            </CardDescription>
            <ul className="flex flex-wrap gap-2 pt-2" aria-label={t("socials")}>
              {SOCIALS.map(({ href, label, handle, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-sm text-neutral-800 dark:text-neutral-200 hover:border-neutral-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <Icon aria-hidden="true" />
                    <span className="sr-only">{label}: </span>
                    {handle}
                  </a>
                </li>
              ))}
            </ul>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
export default ContactSection;
