import "server-only";
import { htmlToText, decodeEntities } from "./html";

export type TelegramPost = {
  id: string;
  url: string;
  text: string;
  image: string | null;
  date: string | null;
  views: string | null;
  forwardedFrom: string | null;
};

export const TELEGRAM_CHANNEL = "IT_Creative";

/**
 * t.me/s/<kanal> ochiq ko'rinishidan so'nggi postlarni oladi (API kalitsiz).
 * Matn oddiy matn sifatida qaytariladi — HTML render qilinmaydi.
 */
export async function getTelegramPosts(limit = 12): Promise<TelegramPost[]> {
  try {
    const res = await fetch(`https://t.me/s/${TELEGRAM_CHANNEL}`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; husanbek-coder.uz)" },
      next: { revalidate: 1800, tags: ["telegram"] },
    });
    if (!res.ok) return [];
    const html = await res.text();

    const chunks = html.split('<div class="tgme_widget_message_wrap').slice(1);
    const posts = chunks
      .map<TelegramPost | null>((chunk) => {
        const post = chunk.match(/data-post="([^"]+)"/)?.[1];
        if (!post) return null;
        const textHtml =
          chunk.match(/<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? "";
        const image =
          chunk.match(/tgme_widget_message_photo_wrap[^>]*background-image:url\('([^']+)'\)/)?.[1] ??
          chunk.match(/tgme_widget_message_video_thumb"[^>]*background-image:url\('([^']+)'\)/)?.[1] ??
          null;
        const forwarded = chunk.match(
          /tgme_widget_message_forwarded_from_name"[^>]*>(?:<span[^>]*>)?([^<]+)/
        )?.[1];
        return {
          id: post,
          url: `https://t.me/${post}`,
          text: htmlToText(textHtml),
          image: image && image.startsWith("https://") ? image : null,
          date: chunk.match(/<time datetime="([^"]+)"/)?.[1] ?? null,
          views: chunk.match(/tgme_widget_message_views">([^<]+)</)?.[1] ?? null,
          forwardedFrom: forwarded ? decodeEntities(forwarded).trim() : null,
        };
      })
      .filter((p): p is TelegramPost => !!p && (!!p.text || !!p.image));

    return posts.reverse().slice(0, limit);
  } catch (e) {
    console.error("[telegram] kanal postlarini olib bo'lmadi:", e);
    return [];
  }
}
