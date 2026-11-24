"use client";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/ace-input";
import { Textarea } from "./ui/ace-textarea";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { sendForm } from "@/lib/send-form";
import { CONTACT_LIMITS, validateContact, type ContactField } from "@/lib/contact-limits";

const ContactForm = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [website, setWebsite] = React.useState(""); // honeypot
  const [loading, setLoading] = React.useState(false);
  const [invalid, setInvalid] = React.useState<ContactField[]>([]);
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");

  const { toast } = useToast();
  const t = useTranslations("contactForm");
  const tErr = useTranslations("contactForm.errors");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateContact({ fullName, email, message });
    setInvalid(errors);
    if (errors.length) {
      setStatus("error");
      document.getElementById(FIELD_IDS[errors[0]])?.focus();
      return;
    }
    setLoading(true);
    try {
      await sendForm(
        { type: "contact", fullName, email, message, website },
        (k) => tErr(k as never),
        t("rateLimited")
      );
      toast({
        title: t("successTitle"),
        description: t("successDesc"),
        variant: "default",
        className: cn("top-0 mx-auto flex fixed md:top-4 md:right-4"),
      });
      setStatus("success");
      setLoading(false);
      setFullName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      toast({
        title: t("errorTitle"),
        description: err instanceof Error ? err.message : t("errorDesc"),
        className: cn(
          "top-0 w-full flex justify-center fixed md:max-w-7xl md:top-4 md:right-4"
        ),
        variant: "destructive",
      });
    }
    setLoading(false);
  };
  return (
    <form className="min-w-7xl mx-auto sm:mt-4" onSubmit={handleSubmit} noValidate aria-busy={loading}>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer>
          <Label htmlFor="fullname">{t("name")}</Label>
          <Input
            id="fullname"
            name="name"
            autoComplete="name"
            placeholder={t("namePh")}
            type="text"
            required
            minLength={CONTACT_LIMITS.name.min}
            maxLength={CONTACT_LIMITS.name.max}
            value={fullName}
            aria-invalid={invalid.includes("fullName")}
            aria-describedby={invalid.includes("fullName") ? "fullname-error" : undefined}
            onChange={(e) => setFullName(e.target.value)}
          />
          <FieldError id="fullname-error" show={invalid.includes("fullName")}>
            {tErr("fullName")}
          </FieldError>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            type="email"
            required
            maxLength={CONTACT_LIMITS.emailMax}
            value={email}
            aria-invalid={invalid.includes("email")}
            aria-describedby={invalid.includes("email") ? "email-error" : undefined}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FieldError id="email-error" show={invalid.includes("email")}>
            {tErr("email")}
          </FieldError>
        </LabelInputContainer>
      </div>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
      <div className="grid w-full gap-1.5 mb-4">
        <Label htmlFor="content">{t("message")}</Label>
        <Textarea
          placeholder={t("messagePh")}
          id="content"
          required
          minLength={CONTACT_LIMITS.message.min}
          maxLength={CONTACT_LIMITS.message.max}
          value={message}
          aria-invalid={invalid.includes("message")}
          aria-describedby={`content-count${invalid.includes("message") ? " content-error" : ""}`}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex justify-between gap-3 text-sm">
          <FieldError id="content-error" show={invalid.includes("message")}>
            {tErr("message")}
          </FieldError>
          <span id="content-count" className="ml-auto text-xs text-muted-foreground tabular-nums">
            {message.trim().length} / {CONTACT_LIMITS.message.max}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("privacy")}
        </p>
      </div>
      <Button
        disabled={loading}
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p>{t("wait")}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            {t("send")} <ChevronRight className="w-4 h-4 ml-4" />
          </div>
        )}
        <BottomGradient />
      </Button>
      <p role="status" aria-live="polite" className="sr-only">
        {loading ? t("wait") : status === "success" ? t("successDesc") : status === "error" ? t("errorDesc") : ""}
      </p>
    </form>
  );
};

export default ContactForm;

const FIELD_IDS: Record<ContactField, string> = {
  fullName: "fullname",
  email: "email",
  message: "content",
};

const FieldError = ({ id, show, children }: { id: string; show: boolean; children: React.ReactNode }) =>
  show ? (
    <p id={id} className="text-sm text-red-700 dark:text-red-400">
      {children}
    </p>
  ) : null;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-brand to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent orange-400 to-transparent" />
    </>
  );
};
