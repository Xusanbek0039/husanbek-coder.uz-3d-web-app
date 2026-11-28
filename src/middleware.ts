import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Bitta URL varianti: slashsiz (/about). Netlify /about/ ni ham 200 bilan berardi —
  // ikki nusxa bo'lmasligi uchun doimiy (308) redirect.
  const { pathname } = request.nextUrl;
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/+$/, "");
    return NextResponse.redirect(url, 308);
  }
  return intlMiddleware(request);
}

export const config = {
  // api, OG rasm, Next ichki fayllari va kengaytmali statik fayllar (rasm, robots.txt, sitemap.xml) bundan mustasno
  matcher: ["/((?!api|_next|_vercel|opengraph-image|.*\\..*).*)"],
};
