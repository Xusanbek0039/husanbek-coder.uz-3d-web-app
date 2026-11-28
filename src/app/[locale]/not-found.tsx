import { useTranslations } from "next-intl";
import { ArrowRight, Terminal } from "lucide-react";
import { Link } from "@/i18n/navigation";

const LINKS = [
  { key: "home", href: "/" },
  { key: "projects", href: "/projects" },
  { key: "services", href: "/services" },
  { key: "blog", href: "/blog" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

/** 404: terminal uslubida, asosiy sahifalarga havolalar bilan (Next.js avtomatik noindex qo'yadi) */
export default function NotFound() {
  const t = useTranslations("notFoundPage");
  const tn = useTranslations("nav");

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-28">
      <div className="w-full max-w-2xl">
        <p className="font-display text-7xl md:text-9xl text-zinc-100" aria-hidden="true">
          404
        </p>
        <h1 className="mt-4 text-2xl md:text-3xl text-zinc-100">{t("title")}</h1>
        <p className="mt-3 text-zinc-400">{t("text")}</p>

        <div className="mt-8 rounded-lg border-[.5px] border-zinc-700 bg-zinc-950/80 font-mono text-sm overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b-[.5px] border-zinc-700 text-zinc-500">
            <Terminal className="w-4 h-4" aria-hidden="true" />
            terminal
          </div>
          <div className="p-4 text-zinc-300">
            <p>$ cd ./{t("path")}</p>
            <p className="text-red-400">bash: {t("error")}</p>
            <p className="mt-2 text-zinc-500"># {t("linksTitle")}</p>
          </div>
        </div>

        <nav aria-label={t("linksTitle")} className="mt-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LINKS.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className="group flex items-center justify-between rounded-md border-[.5px] border-zinc-700 px-4 py-3 text-zinc-200 hover:border-zinc-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  {tn(key)}
                  <ArrowRight
                    className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
