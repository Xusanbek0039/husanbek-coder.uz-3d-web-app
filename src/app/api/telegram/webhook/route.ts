import { config } from "@/data/config";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Telegram bot webhook.
 *
 * - Foydalanuvchi /start bossa — salomlashish xabari.
 * - Foydalanuvchi istalgan xabar yozsa — admin (TELEGRAM_CHAT_ID) ga yuboriladi.
 * - Admin o'sha xabarga Reply qilsa — javob foydalanuvchiga qaytariladi.
 *
 * Webhookni ulash: docs/telegram-bot.md
 */

type TgUser = { id: number; first_name?: string; last_name?: string; username?: string };
type TgMessage = {
  message_id: number;
  from?: TgUser;
  chat: { id: number; type: string };
  text?: string;
  caption?: string;
  reply_to_message?: TgMessage;
};
type TgUpdate = { update_id: number; message?: TgMessage };

const ID_TAG = /#id(\d+)/;

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function tg(method: string, body: Record<string, unknown>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(`Telegram ${method}: ${data.description ?? res.status}`);
  }
  return data.result;
}

const sendText = (chatId: number | string, text: string) =>
  tg("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });

const userHeader = (u: TgUser) => {
  const name = escapeHtml([u.first_name, u.last_name].filter(Boolean).join(" ") || "Nomsiz");
  const username = u.username ? ` (@${escapeHtml(u.username)})` : "";
  return `👤 <b>${name}</b>${username}\n#id${u.id}`;
};

const isStart = (m: TgMessage) => /^\/start(\s|@|$)/.test(m.text ?? "");

// ---------- Foydalanuvchi tomoni ----------
async function handleVisitor(m: TgMessage, adminId: string) {
  const user = m.from!;

  if (isStart(m)) {
    const name = escapeHtml(user.first_name ?? "");
    await sendText(
      m.chat.id,
      [
        `Assalomu alaykum${name ? `, <b>${name}</b>` : ""}! 👋`,
        "",
        `Bu <b>${escapeHtml(config.title)}</b> ning rasmiy boti.`,
        "Savol, taklif yoki buyurtmangizni shu yerga yozing — xabaringiz to'g'ridan-to'g'ri menga yetib boradi va imkon qadar tez javob beraman.",
        "",
        `🌐 ${config.site}`,
      ].join("\n")
    );
    await sendText(adminId, `🆕 <b>Botga yangi foydalanuvchi qo'shildi</b>\n\n${userHeader(user)}`);
    return;
  }

  const header = `✉️ <b>Botga yangi xabar</b>\n\n${userHeader(user)}`;

  if (m.text) {
    await sendText(adminId, `${header}\n\n💬 ${escapeHtml(m.text)}`.slice(0, 4096));
  } else {
    // Rasm, video, fayl, ovozli xabar va h.k. — nusxasini caption bilan yuboramiz.
    const caption = m.caption ? `${header}\n\n${escapeHtml(m.caption)}` : header;
    try {
      await tg("copyMessage", {
        chat_id: adminId,
        from_chat_id: m.chat.id,
        message_id: m.message_id,
        caption: caption.slice(0, 1024),
        parse_mode: "HTML",
      });
    } catch {
      // Caption qo'yib bo'lmaydigan turlar (stiker, video-xabar): avval sarlavha, keyin nusxa.
      await sendText(adminId, header);
      await tg("copyMessage", { chat_id: adminId, from_chat_id: m.chat.id, message_id: m.message_id });
    }
  }

  await sendText(m.chat.id, "✅ Xabaringiz yuborildi. Tez orada javob beraman!");
}

// ---------- Admin tomoni ----------
async function handleAdmin(m: TgMessage, adminId: string) {
  const replied = m.reply_to_message;
  const tagSource = replied ? `${replied.text ?? ""} ${replied.caption ?? ""}` : "";
  const target = tagSource.match(ID_TAG)?.[1];

  if (!target) {
    await sendText(
      adminId,
      "ℹ️ Foydalanuvchilar xabarlari shu yerga keladi.\n\nJavob berish uchun <b>#id</b> yozilgan xabarga <b>Reply</b> qilib yozing."
    );
    return;
  }

  try {
    await tg("copyMessage", { chat_id: target, from_chat_id: m.chat.id, message_id: m.message_id });
    await tg("setMessageReaction", {
      chat_id: adminId,
      message_id: m.message_id,
      reaction: [{ type: "emoji", emoji: "👍" }],
    }).catch(() => sendText(adminId, "✅ Yuborildi"));
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    await sendText(
      adminId,
      `❌ Yuborilmadi (foydalanuvchi botni bloklagan bo'lishi mumkin).\n<code>${escapeHtml(reason)}</code>`
    );
  }
}

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const adminId = process.env.TELEGRAM_CHAT_ID;
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;

  // So'rov haqiqatan Telegram'dan kelganini tekshiramiz (setWebhook dagi secret_token).
  if (!token || !adminId || !secret) {
    // Faqat yo'q o'zgaruvchilarning NOMLARI qaytariladi, qiymatlar hech qachon ko'rsatilmaydi.
    const missing = [
      !token && "TELEGRAM_BOT_TOKEN",
      !adminId && "TELEGRAM_CHAT_ID",
      !secret && "TELEGRAM_WEBHOOK_SECRET",
    ].filter(Boolean);
    return NextResponse.json({ error: "Bot sozlanmagan", missing }, { status: 503 });
  }
  if (req.headers.get("x-telegram-bot-api-secret-token") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const update = (await req.json().catch(() => null)) as TgUpdate | null;
  const m = update?.message;

  // Faqat shaxsiy chatdagi xabarlar bilan ishlaymiz. Har doim 200 qaytaramiz,
  // aks holda Telegram bitta update'ni qayta-qayta yuboraveradi.
  if (m?.from && m.chat.type === "private") {
    try {
      if (String(m.chat.id) === adminId) await handleAdmin(m, adminId);
      else await handleVisitor(m, adminId);
    } catch (err) {
      console.error("[telegram-webhook]", err);
    }
  }

  return NextResponse.json({ ok: true });
}
