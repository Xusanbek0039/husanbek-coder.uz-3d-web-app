"use client";
import React from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/ace-input";
import { Textarea } from "./ui/ace-textarea";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type Props = {
  services: { id: string; title: string }[];
  budgets: string[];
  defaultService?: string;
};

const selectClass = cn(
  "flex h-10 w-full rounded-md px-3 text-sm",
  "bg-gray-50 dark:bg-zinc-800 text-black dark:text-white",
  "border-none shadow-input focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
);

const OrderForm = ({ services, budgets, defaultService }: Props) => {
  const initialService =
    services.find((s) => s.id === defaultService)?.title ?? services[0]?.title ?? "";
  const [form, setForm] = React.useState({
    fullName: "",
    contact: "",
    service: initialService,
    budget: budgets[0] ?? "",
    message: "",
    website: "",
  });
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const t = useTranslations("orderForm");
  const tc = useTranslations("contactForm");

  React.useEffect(() => {
    const title = services.find((s) => s.id === defaultService)?.title;
    if (title) setForm((f) => ({ ...f, service: title }));
  }, [defaultService, services]);

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "order", ...form }),
      });
      if (res.status === 429) throw new Error(tc("rateLimited"));
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.error) throw new Error(tc("errorDesc"));
      toast({
        title: t("successTitle"),
        description: t("successDesc"),
        className: cn("top-0 mx-auto flex fixed md:top-4 md:right-4"),
      });
      setForm((f) => ({ ...f, fullName: "", contact: "", message: "" }));
    } catch (err) {
      toast({
        title: tc("errorTitle"),
        description: err instanceof Error ? err.message : tc("errorDesc"),
        className: cn("top-0 w-full flex justify-center fixed md:max-w-7xl md:top-4 md:right-4"),
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="order-name">{t("name")}</Label>
          <Input
            id="order-name"
            placeholder={t("namePh")}
            required
            value={form.fullName}
            onChange={set("fullName")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="order-contact">{t("contact")}</Label>
          <Input
            id="order-contact"
            placeholder={t("contactPh")}
            required
            value={form.contact}
            onChange={set("contact")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="order-service">{t("service")}</Label>
          <select
            id="order-service"
            className={selectClass}
            value={form.service}
            onChange={set("service")}
          >
            {services.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value={t("other")}>{t("other")}</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="order-budget">{t("budget")}</Label>
          <select
            id="order-budget"
            className={selectClass}
            value={form.budget}
            onChange={set("budget")}
          >
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        value={form.website}
        onChange={set("website")}
      />
      <div className="flex flex-col gap-2">
        <Label htmlFor="order-message">{t("message")}</Label>
        <Textarea
          id="order-message"
          placeholder={t("messagePh")}
          required
          rows={5}
          value={form.message}
          onChange={set("message")}
        />
      </div>
      <Button
        disabled={loading}
        type="submit"
        className="w-full h-11 bg-zinc-200 text-black hover:bg-white"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> {t("sending")}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            {t("send")} <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </form>
  );
};

export default OrderForm;
