# SEO — husanbek-coder.uz

## Kodda nima qilingan

| Qism | Fayl | Izoh |
|---|---|---|
| Search Console tasdiqlash | `public/google61bf653d910ca37d.html`, `src/app/[locale]/layout.tsx` (`verification`) | HTML fayl va meta-teg |
| Sitemap | `src/app/sitemap.ts` | Faqat canonical sahifalar, 3 til + hreflang |
| robots.txt | `src/app/robots.ts` | `/api/` yopiq |
| Web manifest | `src/app/manifest.ts` | `/manifest.webmanifest` |
| Canonical + hreflang | `src/i18n/helpers.ts` (`alternatesFor`) | uz / ru / en / x-default |
| Sahifa metadata | `src/lib/seo.ts` (`pageMetadata`) | Har bir sahifaning o'z title, description va Open Graph'i |
| JSON-LD | `src/lib/seo.ts`, `src/components/seo/json-ld.tsx` | Pastdagi jadval |

### Strukturalangan ma'lumot (schema.org)

| Sahifa | Turlar |
|---|---|
| Barcha sahifalar | `Person` (`/#person`), `WebSite` (`/#website`) — bir-biriga `@id` orqali bog'langan |
| `/about`, `/resume` | `ProfilePage` (asosiy obyekt — Person) + `BreadcrumbList` |
| `/projects` | `CollectionPage` + loyihalar `ItemList` + `BreadcrumbList` |
| `/projects/<id>` | `CreativeWork` + `BreadcrumbList` |
| `/services` | `ProfessionalService`, `OfferCatalog`, `FAQPage`, `BreadcrumbList` |
| `/blog` | `CollectionPage` + `BreadcrumbList` |
| `/blog/<id>` | `BlogPosting` + `BreadcrumbList` |
| `/contact` | `ContactPage` + `BreadcrumbList` |

Tekshirish: <https://search.google.com/test/rich-results> va <https://validator.schema.org/>.

### Blog postlari va canonical

`/blog/<id>` sahifalari itc-academy.uz dagi maqolalarning nusxasi. Takroriy kontent
saytning umumiy sifat bahosini pasaytirmasligi uchun:

- post sahifasining `canonical` manzili — itc-academy.uz dagi asl maqola;
- postlar sitemap'ga kiritilmaydi;
- `/ru/blog/<id>` va `/en/blog/<id>` uchun hreflang berilmaydi (matn faqat o'zbekcha).

`/blog` ro'yxat sahifasi husanbek-coder.uz da indekslanadi. Post bo'yicha qidiruv
trafigi itc-academy.uz ga (sizning ikkinchi saytingizga) boradi.

## Deploy'dan keyin (Search Console)

1. **Sitemaps** → `https://husanbek-coder.uz/sitemap.xml` ni yuboring.
2. **URL Inspection** → `https://husanbek-coder.uz/` → **Request indexing**. Xuddi shuni
   `/about`, `/projects`, `/services`, `/resume` uchun ham qiling.
3. Bir necha kundan keyin **Pages** hisobotida "Duplicate, Google chose different canonical"
   va "Crawled – currently not indexed" sahifalarini ko'rib chiqing.
4. **Enhancements** bo'limida Breadcrumbs va FAQ xatosiz chiqishini tekshiring.

Bing uchun ham: <https://www.bing.com/webmasters> → Google Search Console'dan import.

## Kod bilan hal bo'lmaydigan, lekin eng ko'p ta'sir qiladigan ishlar

Hech kim Google'da 1-o'rinni kafolatlay olmaydi. Ism bo'yicha qidiruvlarda ("Husan Suyunov",
"Husanbek Suyunov", "husanbek coder") 1-o'rin real maqsad. Umumiy so'zlarda ("python dasturchi",
"telegram bot yaratish") esa kontent va havolalar hal qiladi.

1. **Havolalar (backlink).** GitHub, GitLab, LinkedIn, Telegram, YouTube, Instagram profillarining
   "website" maydoniga `https://husanbek-coder.uz` ni yozing. Har bir GitHub repo README'siga
   portfolio havolasini qo'shing. itc-academy.uz, itclms.uz va marosimgo.uz footer'iga
   "Dasturchi: Husan Suyunov" + havola qo'ying.
2. **Google Business Profile.** Xizmat ko'rsatuvchi sifatida (Jizzax / Zomin) ro'yxatdan
   o'ting — mahalliy qidiruvda ("dasturchi Jizzax") chiqish uchun eng kuchli signal.
3. **O'z kontenti.** Portfolio'ning o'zida original maqolalar (case study): masalan,
   "MarosimGo arxitekturasi", "Django'da Click/Payme integratsiyasi", "Uz-Sentiment:
   o'zbekcha sentiment tahlili". Har biri 800+ so'z, o'z sarlavhasi va canonical'i bilan.
4. **Tezlik (Core Web Vitals).** Bosh sahifadagi Spline 3D va animatsiyalar mobil qurilmada
   og'ir. <https://pagespeed.web.dev/> natijasini kuzating; LCP 2.5 s dan oshsa, 3D'ni
   foydalanuvchi aralashgandan keyin yuklashni ko'rib chiqing.
5. **Katalog va ro'yxatlar.** committers.top, dev.to, Habr Career, hh.uz profillarida
   saytga havola.
