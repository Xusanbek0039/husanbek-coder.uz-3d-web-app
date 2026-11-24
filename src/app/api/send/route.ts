import { EmailTemplate } from "@/components/email-template";
import { config } from "@/data/config";
import { Resend } from "resend";
import { z } from "zod";
import { NextResponse } from "next/server";
import { CONTACT_LIMITS } from "@/lib/contact-limits";

export const runtime = "nodejs";

// ---------- Validatsiya ----------
const ContactSchema = z.object({
  type: z.literal("contact").default("contact"),
  fullName: z.string().trim().min(CONTACT_LIMITS.name.min).max(CONTACT_LIMITS.name.max),
  email: z.string().trim().email().max(CONTACT_LIMITS.emailMax),
  message: z.string().trim().min(CONTACT_LIMITS.message.min).max(CONTACT_LIMITS.message.max),
  website: z.string().optional(), // honeypot
});

const OrderSchema = z.object({
  type: z.literal("order"),
  fullName: z.string().trim().min(2, "To'liq ism noto'g'ri!").max(100),
  contact: z.string().trim().min(5, "Aloqa ma'lumoti juda qisqa!").max(200),
  service: z.string().trim().min(2, "Xizmat turini tanlang!").max(100),
  budget: z.string().trim().max(100).optional().default(""),
  message: z.string().trim().min(10, "Loyiha tavsifi juda qisqa!").max(4000),
  website: z.string().optional(), // honeypot
});

type PayloadT = z.infer<typeof ContactSchema> | z.infer<typeof OrderSchema>;

// ---------- Oddiy rate limit (bitta server instansiyasi doirasida) ----------
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
};

// ---------- Yuborish kanallari ----------
const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const telegramText = (p: PayloadT) => {
  const e = escapeHtml;
  if (p.type === "order") {
    return [
      "🧾 <b>Yangi buyurtma</b> — husanbek-coder.uz",
      "",
      `👤 <b>Ism:</b> ${e(p.fullName)}`,
      `📞 <b>Aloqa:</b> ${e(p.contact)}`,
      `🛠 <b>Xizmat:</b> ${e(p.service)}`,
      p.budget ? `💰 <b>Byudjet:</b> ${e(p.budget)}` : null,
      "",
      `📝 ${e(p.message)}`,
    ]
      .filter((l) => l !== null)
      .join("\n");
  }
  return [
    "✉️ <b>Yangi xabar</b> — husanbek-coder.uz",
    "",
    `👤 <b>Ism:</b> ${e(p.fullName)}`,
    `📧 <b>Email:</b> ${e(p.email)}`,
    "",
    `💬 ${e(p.message)}`,
  ].join("\n");
};

async function sendTelegram(p: PayloadT) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: telegramText(p).slice(0, 4096),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Telegram ${res.status}`);
  return true;
}

async function sendEmail(p: PayloadT) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const resend = new Resend(key);
  const isOrder = p.type === "order";
  const message = isOrder
    ? `Xizmat: ${p.service}\nByudjet: ${p.budget || "—"}\n\n${p.message}`
    : p.message;
  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: [config.email],
    subject: isOrder
      ? `Yangi buyurtma: ${p.service}`
      : "Portfeldan men bilan bog'lanishdi",
    react: EmailTemplate({
      fullName: p.fullName,
      email: isOrder ? p.contact : p.email,
      message,
    }),
  });
  if (error) throw new Error(`Resend: ${error.message}`);
  return true;
}

// ---------- Handler ----------
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed =
      body?.type === "order" ? OrderSchema.safeParse(body) : ContactSchema.safeParse(body);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((issue) => issue.message);
      // fields — klient xatoni foydalanuvchi tilida ko'rsatishi uchun (fullName, email, message, ...)
      const fields = Array.from(new Set(parsed.error.issues.map((issue) => String(issue.path[0]))));
      return NextResponse.json({ error: issues, fields }, { status: 400 });
    }
    const data = parsed.data;

    // Bot to'ldirgan yashirin maydon — jim "muvaffaqiyat" qaytaramiz
    if (data.website) return NextResponse.json({ success: true }, { status: 200 });

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Juda ko'p so'rov. Birozdan keyin qayta urinib ko'ring." },
        { status: 429 }
      );
    }

    const results = await Promise.allSettled([sendTelegram(data), sendEmail(data)]);
    const delivered = results.some((r) => r.status === "fulfilled" && r.value === true);
    results.forEach((r) => {
      if (r.status === "rejected") console.error("[send] kanal xatosi:", r.reason);
    });

    if (!delivered) {
      return NextResponse.json({ error: "Xabarni yuborib bo'lmadi!" }, { status: 500 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[send] server xatosi:", err);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
