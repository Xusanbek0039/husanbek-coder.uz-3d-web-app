import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // api, Next ichki fayllari va kengaytmali statik fayllar (rasm, robots.txt, sitemap.xml) bundan mustasno
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
