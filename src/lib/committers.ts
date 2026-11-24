import "server-only";
import { GITHUB_USER } from "./github";

export const COMMITTERS_URL = "https://committers.top/uzbekistan.html";

export type CommittersRank = {
  rank: number;
  contribs: number;
  total: number;
  updatedAt: string | null;
  url: string;
};

// Sahifa ochilmasa ko'rsatiladigan oxirgi ma'lum qiymat (2026-11-15)
const FALLBACK: CommittersRank = {
  rank: 34,
  contribs: 1144,
  total: 256,
  updatedAt: "2026-11-15",
  url: `${COMMITTERS_URL}#${GITHUB_USER}`,
};

/** committers.top O'zbekiston reytingidagi o'rnim (kuniga 1 marta yangilanadi) */
export async function getCommittersRank(): Promise<CommittersRank> {
  try {
    const res = await fetch(COMMITTERS_URL, { next: { revalidate: 86400 } });
    if (!res.ok) return FALLBACK;
    const html = await res.text();

    const row = new RegExp(
      `<tr id="${GITHUB_USER}">\\s*<td>(\\d+)\\.</td>[\\s\\S]*?</td>\\s*<td>(\\d+)</td>`,
      "i"
    ).exec(html);
    if (!row) return FALLBACK;

    const ranks = Array.from(html.matchAll(/<tr id="[^"]+">\s*<td>(\d+)\.<\/td>/g), (m) => Number(m[1]));
    const updated = /generated at <code>(\d{4}-\d{2}-\d{2})/.exec(html);

    return {
      rank: Number(row[1]),
      contribs: Number(row[2]),
      total: ranks.length ? Math.max(...ranks) : FALLBACK.total,
      updatedAt: updated?.[1] ?? null,
      url: FALLBACK.url,
    };
  } catch {
    return FALLBACK;
  }
}
