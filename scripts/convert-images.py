"""
Katta PNG/JPG skrinshotlarni WebP'ga o'tkazadi va src/ dagi havolalarni yangilaydi.

Ishlatish (loyiha ildizidan):
    python scripts/convert-images.py            # nima o'zgarishini ko'rsatadi (dry-run)
    python scripts/convert-images.py --apply    # o'tkazadi, havolalarni yangilaydi, eski fayllarni o'chiradi

Talab: Pillow (pip install pillow)
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "public" / "assets"
SRC = ROOT / "src"
FOLDERS = ["projects-screenshots", "nav-link-previews"]
MIN_BYTES = 150 * 1024
QUALITY = 82
MAX_WIDTH = 1920
EXTS = {".png", ".jpg", ".jpeg"}


def convert(path: Path) -> Path:
    out = path.with_suffix(".webp")
    with Image.open(path) as im:
        im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
        if im.width > MAX_WIDTH:
            im = im.resize((MAX_WIDTH, round(im.height * MAX_WIDTH / im.width)), Image.LANCZOS)
        im.save(out, "WEBP", quality=QUALITY, method=6)
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true")
    args = ap.parse_args()

    candidates = [
        p
        for folder in FOLDERS
        for p in (ASSETS / folder).rglob("*")
        if p.suffix.lower() in EXTS and p.stat().st_size >= MIN_BYTES
    ]
    if not candidates:
        print("O'tkaziladigan rasm yo'q.")
        return 0

    src_files = [p for p in SRC.rglob("*") if p.suffix in {".ts", ".tsx"}]
    sources = {p: p.read_text(encoding="utf-8") for p in src_files}

    before = after = 0
    for img in sorted(candidates):
        rel = img.relative_to(ASSETS).as_posix()          # projects-screenshots/goodever/1.png
        tail = "/".join(rel.split("/")[-2:])               # goodever/1.png
        new_tail = re.sub(r"\.(png|jpe?g)$", ".webp", tail, flags=re.I)
        size = img.stat().st_size
        if not args.apply:
            print(f"{size // 1024:>6} KB  {rel}")
            continue
        out = convert(img)
        before += size
        after += out.stat().st_size
        # "goodever/1.png" ko'rinishidagi havolalarni yangilash (BASE_PATH bilan yozilganlar ham)
        pattern = re.compile(r"(?<![\w-])" + re.escape(tail) + r"(?![\w])")
        for p, text in sources.items():
            sources[p] = pattern.sub(new_tail, text)
        img.unlink()
        print(f"{size // 1024:>6} KB -> {out.stat().st_size // 1024:>4} KB  {rel}")

    if args.apply:
        for p, text in sources.items():
            if text != p.read_text(encoding="utf-8"):
                p.write_text(text, encoding="utf-8", newline="")
                print("yangilandi:", p.relative_to(ROOT).as_posix())
        print(f"\nJami: {before // 1024} KB -> {after // 1024} KB")
    else:
        print("\nO'tkazish uchun: python scripts/convert-images.py --apply")
    return 0


if __name__ == "__main__":
    sys.exit(main())
