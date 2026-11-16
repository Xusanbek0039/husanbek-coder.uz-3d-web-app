import "server-only";
import { decodeEntities } from "./html";

export type YoutubeVideo = {
  id: string;
  title: string;
  publishedAt: string | null;
  thumbnail: string;
  url: string;
};

export const YOUTUBE_CHANNEL_ID = "UCNFR-A5OboPWPyRNaqb9UYg"; // @IT_Creative

export const hasYoutubeKey = () => !!process.env.YOUTUBE_API_KEY;

/**
 * Kanalning "uploads" pleylistidan so'nggi videolar (YouTube Data API v3).
 * Uploads pleylist ID'si = kanal ID'sidagi "UC" o'rniga "UU" — qo'shimcha so'rov shart emas.
 */
export async function getYoutubeVideos(limit = 12): Promise<YoutubeVideo[]> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return [];
  const playlistId = "UU" + YOUTUBE_CHANNEL_ID.slice(2);
  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("maxResults", String(Math.min(limit, 50)));
  url.searchParams.set("playlistId", playlistId);
  url.searchParams.set("key", key);

  try {
    const res = await fetch(url, { next: { revalidate: 3600, tags: ["youtube"] } });
    if (!res.ok) {
      console.error("[youtube] API xatosi:", res.status);
      return [];
    }
    const data = await res.json();
    return (data.items ?? [])
      .map((item: any): YoutubeVideo | null => {
        const s = item.snippet;
        const id = s?.resourceId?.videoId;
        if (!id || s.title === "Private video" || s.title === "Deleted video") return null;
        const t = s.thumbnails ?? {};
        return {
          id,
          title: decodeEntities(s.title ?? ""),
          publishedAt: s.publishedAt ?? null,
          thumbnail: (t.maxres ?? t.standard ?? t.high ?? t.medium ?? t.default)?.url ??
            `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          url: `https://www.youtube.com/watch?v=${id}`,
        };
      })
      .filter(Boolean) as YoutubeVideo[];
  } catch (e) {
    console.error("[youtube] so'rov xatosi:", e);
    return [];
  }
}
