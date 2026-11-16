"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { config } from "@/data/config";
import { Link as LocaleLink } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
const ContactSection = () => {
  const t = useTranslations("contactSection");
  return (
    <section id="contact" className="min-h-screen max-w-7xl mx-auto ">
      <Link href={"#contact"}>
        <h2
          className={cn(
            "bg-clip-text text-4xl text-center text-transparent md:text-7xl pt-16",
            "bg-gradient-to-b from-black/80 to-black/50",
            "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50"
          )}
        >
          {t("title1")} <br />
          {t("title2")}
        </h2>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 z-[9999]">
        <Card className="min-w-7xl bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-xl mt-10 md:mt-20">
          <CardHeader>
            <CardTitle className="text-4xl">{t("card")}</CardTitle>
            <CardDescription>
            {t("desc1")}{" "}
              <a
                target="_blank"
                href={`mailto:${config.email}`}
                className="text-gray-200 cursor-can-hover rounded-lg"
              >
                {config.email.replace(/@/g, "(at)")}
              </a>{" "}
              {t("desc2")}
              <LocaleLink
                href="/services"
                className="mt-3 block w-fit underline underline-offset-4 text-zinc-200 hover:text-white"
              >
                {t("order")}
              </LocaleLink>
            </CardDescription>
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
