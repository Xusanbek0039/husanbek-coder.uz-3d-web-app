# itc-academy.uz — portfolio uchun blog API

Portfolio (`/blog` sahifasi) postlarni server tomonda oladi:

1. `ITC_ACADEMY_API_URL` va `ITC_ACADEMY_API_KEY` sozlangan bo'lsa — shu API'dan (`X-API-Key` sarlavhasi bilan).
2. Aks holda yoki API xato bersa — `https://itc-academy.uz/sitemap.xml` va har bir postning meta-teglaridan.

Natija 30 daqiqa keshlanadi (`revalidate = 1800`).

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
