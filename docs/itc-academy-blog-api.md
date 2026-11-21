# itc-academy.uz — portfolio uchun blog API

Portfolio (`/blog` sahifasi) postlarni server tomonda oladi:

1. `ITC_ACADEMY_API_URL` va `ITC_ACADEMY_API_KEY` sozlangan bo'lsa — shu API'dan (`X-API-Key` sarlavhasi bilan).
2. Aks holda yoki API xato bersa — `https://itc-academy.uz/sitemap.xml` va har bir postning meta-teglaridan.

Keshlash: postlar, like va izohlar — 5 daqiqa. Darhol yangilash — itc-academy.uz
post saqlanganda `POST /api/revalidate/blog` ni chaqiradi (pastda).

## Like va izohlar (post tagida)

`getEngagement()` — `src/lib/itc-blog.ts`, ko'rinishi — `src/components/blog/post-engagement.tsx`.

1. `ITC_ACADEMY_API_KEY` bo'lsa — Django API'dan: like soni, **kim like bosgani** (ism + rasm),
   izohlar va har bir izohning like soni.
2. Kalit yo'q yoki API xato bersa — post sahifasidan: like soni va izohlar (kim like bosgani
   public sahifada yo'q, shuning uchun ko'rinmaydi).

Django tomoni allaqachon yozilgan (`learning-managment-sistem-django`):

- `blog/api.py` — `GET /api/public/blog/posts/<token>/engagement/`, sarlavha `X-API-Key`.
- `config/settings.py` — `PORTFOLIO_API_KEY` (`.env` dan). Bo'sh bo'lsa API yopiq (401).
- Faqat ism-familiya va profil rasmi qaytadi (telefon, username yo'q). Testlar: `blog/tests.py`.

Ulash:

```bash
# 1. Kalit yaratish
python -c "import secrets; print(secrets.token_urlsafe(40))"
# 2. itc-academy.uz serverida .env:   PORTFOLIO_API_KEY=<kalit>   (keyin restart)
# 3. Netlify env:                     ITC_ACADEMY_API_KEY=<o'sha kalit>   (keyin redeploy)
# 4. Tekshirish:
curl -H "X-API-Key: <kalit>" https://itc-academy.uz/api/public/blog/posts/oQ3OFvNjSvwE/engagement/
```

`ITC_ACADEMY_API_URL` ni bo'sh qoldiring — postlar ro'yxati API'si Django'da hali yo'q
(pastdagi namuna kod qo'shilmaguncha).

## Yangi postni darhol ko'rsatish (revalidate webhook)

Portfolio hosting (Netlify) env'iga:

```
BLOG_REVALIDATE_SECRET=<uzun tasodifiy qiymat>
```

Qo'lda tekshirish:

```bash
curl -X POST https://husanbek-coder.uz/api/revalidate/blog \
  -H "X-Revalidate-Secret: <o'sha qiymat>"
# {"ok":true,...}
```

Django tomonida (`blog/signals.py`) — post saqlanganda/o'chirilganda chaqiriladi:

```python
import threading

import requests
from django.conf import settings
from django.db import transaction
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from .models import Post


def _ping_portfolio():
    url = getattr(settings, "PORTFOLIO_REVALIDATE_URL", "")
    secret = getattr(settings, "PORTFOLIO_REVALIDATE_SECRET", "")
    if not (url and secret):
        return
    try:
        requests.post(url, headers={"X-Revalidate-Secret": secret}, timeout=5)
    except requests.RequestException:
        pass  # portfolio ishlamasa ham admin panel to'xtamasin


@receiver([post_save, post_delete], sender=Post)
def revalidate_portfolio_blog(sender, **kwargs):
    # tranzaksiya tugagach, fon oqimida — saqlash sekinlashmaydi
    transaction.on_commit(lambda: threading.Thread(target=_ping_portfolio, daemon=True).start())
```

`blog/apps.py` da signallarni ulash:

```python
class BlogConfig(AppConfig):
    name = "blog"

    def ready(self):
        from . import signals  # noqa: F401
```

`settings.py` / `.env`:

```python
PORTFOLIO_REVALIDATE_URL = "https://husanbek-coder.uz/api/revalidate/blog"
PORTFOLIO_REVALIDATE_SECRET = env("PORTFOLIO_REVALIDATE_SECRET")  # = BLOG_REVALIDATE_SECRET
```

## Django tomoniga qo'shish (itc-academy.uz)

Quyidagi kodda `Post` modeli va maydon nomlari taxminiy — o'zingizning `blog` app'ingizdagi nomlarga moslang.

`blog/api.py`:

```python
import hmac
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.cache import cache_page
from django.views.decorators.http import require_GET

from .models import Post


def _authorized(request) -> bool:
    expected = getattr(settings, "PORTFOLIO_API_KEY", "")
    given = request.headers.get("X-API-Key", "")
    return bool(expected) and hmac.compare_digest(given, expected)


@require_GET
@cache_page(60 * 10)
def public_posts(request):
    if not _authorized(request):
        return JsonResponse({"detail": "Unauthorized"}, status=401)

    posts = (
        Post.objects.filter(is_published=True)       # <- maydon nomini moslang
        .select_related("author", "category")
        .order_by("-created_at")[:24]
    )
    results = [
        {
            "slug": p.slug,                          # URL: /blog/<slug>/
            "title": p.title,
            "excerpt": (p.short_description or "")[:300],
            "image": request.build_absolute_uri(p.image.url) if p.image else None,
            "url": request.build_absolute_uri(p.get_absolute_url()),
            "published_at": p.created_at.isoformat(),
            "category": p.category.name if p.category_id else None,
            "author": p.author.get_full_name() if p.author_id else None,
        }
        for p in posts
    ]
    return JsonResponse({"results": results})
```

`urls.py`:

```python
from blog.api import public_posts

urlpatterns += [
    path("api/public/blog/posts/", public_posts),
]
```

`settings.py` / `.env`:

```python
PORTFOLIO_API_KEY = env("PORTFOLIO_API_KEY")   # uzun tasodifiy qiymat
```

Kalit yaratish: `python -c "import secrets; print(secrets.token_urlsafe(40))"`

## Portfolio tomonida (Vercel / hosting env)

```
ITC_ACADEMY_API_URL=https://itc-academy.uz/api/public/blog/posts/
ITC_ACADEMY_API_KEY=<o'sha kalit>
```

Kalit faqat serverda ishlatiladi (`src/lib/itc-blog.ts` — `server-only`), brauzerga hech qachon chiqmaydi.
