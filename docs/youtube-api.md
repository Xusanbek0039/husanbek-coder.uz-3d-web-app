# YouTube Data API kalitini olish

Blog sahifasidagi **Videolar** tabi IT_Creative kanalining (`UCNFR-A5OboPWPyRNaqb9UYg`) so'nggi
videolarini YouTube Data API v3 orqali oladi. Kalit sozlanmaguncha bu tab ko'rinmaydi.

1. https://console.cloud.google.com/ ga kiring va yangi loyiha yarating (masalan `husanbek-portfolio`).
2. **APIs & Services → Library** → "YouTube Data API v3" → **Enable**.
3. **APIs & Services → Credentials → Create credentials → API key**.
4. Kalitni xavfsiz qiling: kalit ustiga bosing → **API restrictions → Restrict key → YouTube Data API v3**.
   Kalit faqat serverda ishlatiladi, shuning uchun "Application restrictions" bo'limini **None** qoldiring.
5. Kalitni yozing:
   - lokal: `.env.local` → `YOUTUBE_API_KEY=...`
   - production: hosting env sozlamalari → `YOUTUBE_API_KEY`

Bepul kvota kuniga 10 000 birlik. Bitta so'rov 1 birlik, natija esa 1 soat keshlanadi, shuning uchun
kvota yetarli.
