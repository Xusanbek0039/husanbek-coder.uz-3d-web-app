import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaPhone, FaTelegram } from "react-icons/fa6";
import { ArrowUpRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { config } from "@/data/config";

export const metadata: Metadata = {
  title: "Bog'lanish | Husan Suyunov",
  description:
    "Husan Suyunov bilan bog'laning: web sayt, LMS/CRM tizim, Telegram bot yoki AI loyihasi bo'yicha xabar qoldiring.",
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  { name: "Telegram", value: "@husanbek_coder", href: config.social.telegram, icon: <FaTelegram /> },
  { name: "Telefon", value: "+998 97 521 66 86", href: "tel:+998975216686", icon: <FaPhone /> },
  { name: "Email", value: config.email, href: `mailto:${config.email}`, icon: <FaEnvelope /> },
  { name: "GitHub", value: "Xusanbek0039", href: config.social.github, icon: <FaGithub /> },
];

function Page() {
  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[150px] text-zinc-300 pt-[100px] pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div
          className="lg:col-span-2 p-6 md:p-10 border-[.5px] rounded-md border-zinc-600"
          style={{ backdropFilter: "blur(2px)" }}
        >
          <h1 className="text-4xl">Bog&apos;lanish</h1>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            Loyiha g&apos;oyangiz, hamkorlik taklifi yoki savolingiz bormi?
            Xabar qoldiring — odatda 24 soat ichida javob beraman.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {CHANNELS.map((c) => (
              <li key={c.name}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 h-12 rounded-md border-[.5px] border-zinc-700 bg-zinc-800 hover:border-zinc-500 transition-colors"
                >
                  <span className="w-6 text-lg">{c.icon}</span>
                  <span className="flex flex-col min-w-0">
                    <span className="text-sm">{c.name}</span>
                    <span className="text-xs text-zinc-500 truncate">{c.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <Link
            href="/services"
            className="mt-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Loyiha buyurtma qilmoqchimisiz? Xizmatlar sahifasi
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <div
          className="lg:col-span-3 p-6 md:p-10 border-[.5px] rounded-md border-zinc-600 bg-black/40"
          style={{ backdropFilter: "blur(2px)" }}
        >
          <h2 className="text-2xl mb-6">Xabar yuborish</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default Page;
