import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { ITC_BLOG_TAG } from "@/lib/itc-blog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * itc-academy.uz da post qo'shilganda/o'zgarganda/o'chirilganda chaqiriladi —
 * blog keshi darhol tozalanadi va yangi post saytda shu zahoti ko'rinadi.
 *
 *   POST /api/revalidate/blog
 *   X-Revalidate-Secret: <BLOG_REVALIDATE_SECRET>
 *
 * Django tomoni: docs/itc-academy-blog-api.md
 */

const sameSecret = (given: string, expected: string) => {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
};

export async function POST(req: Request) {
  const expected = process.env.BLOG_REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json({ ok: false, error: "Not configured" }, { status: 503 });
  }

  const given = req.headers.get("x-revalidate-secret") ?? "";
  if (!sameSecret(given, expected)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(ITC_BLOG_TAG);
  revalidatePath("/[locale]/blog", "page");
  revalidatePath("/[locale]/blog/[slug]", "page");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true, revalidated: ITC_BLOG_TAG, at: new Date().toISOString() });
}
