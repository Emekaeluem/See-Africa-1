#!/usr/bin/env python3
"""Optimize ONLY PNG assets referenced by the Calabar page.

Keeps source PNGs, skips larger outputs, retains transparent edges and
updates HTML/CSS/JS references only for files actually generated.
"""
from pathlib import Path
from PIL import Image, ImageOps
import re

ROOT = Path(__file__).resolve().parents[1]
PAGES = [ROOT / "calabar.html", ROOT / "calabar.css", ROOT / "calabar.js"]
ASSETS = ROOT / "images"

# Source assets explicitly referenced by the current page.
refs = set()
for page in PAGES:
    if page.exists():
        refs.update(re.findall(r"images/([A-Za-z0-9_-]+\.png)", page.read_text(encoding="utf-8")))

converted = {}
before = after = 0
for name in sorted(refs):
    src = ASSETS / name
    if not src.is_file():
        print(f"Missing, left unchanged: {src.relative_to(ROOT)}")
        continue

    dst = src.with_suffix(".webp")
    is_photo = bool(re.fullmatch(r"new-calabar\d+\.png", name))
    try:
        with Image.open(src) as original:
            image = ImageOps.exif_transpose(original)
            if is_photo:
                # Responsive full-width quality without huge originals.
                image.thumbnail((1920, 1920), Image.Resampling.LANCZOS)
                if image.mode not in ("RGB", "RGBA"):
                    image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
                image.save(dst, "WEBP", quality=90, method=6)
            else:
                # Preserve sharp brand typography and transparency precisely.
                if image.mode not in ("RGB", "RGBA"):
                    image = image.convert("RGBA")
                image.save(dst, "WEBP", lossless=True, method=6, exact=True)
    except Exception as exc:
        print(f"Skipped {name}: {exc}")
        dst.unlink(missing_ok=True)
        continue

    original_bytes = src.stat().st_size
    webp_bytes = dst.stat().st_size
    if webp_bytes >= original_bytes:
        dst.unlink()
        print(f"Kept original: {name} ({original_bytes:,} bytes <= WebP {webp_bytes:,})")
        continue

    converted[name] = dst.name
    before += original_bytes
    after += webp_bytes
    print(f"{name}: {original_bytes:,} -> {webp_bytes:,} ({100*(1-webp_bytes/original_bytes):.1f}% smaller)")

# Replace paths only if an optimized asset actually exists.
for page in PAGES:
    if not page.exists():
        continue
    content = page.read_text(encoding="utf-8")
    for old, new in converted.items():
        content = content.replace(f"images/{old}", f"images/{new}")
    if page.name == "calabar.js":
        # Preserve the unique-image validation after switching extensions.
        content = content.replace(
            r"new-calabar(\d+)\.png$",
            r"new-calabar(\d+)\.(?:png|webp)$"
        )
    if content != page.read_text(encoding="utf-8"):
        page.write_text(content, encoding="utf-8")

print(f"\nConverted {len(converted)} assets. Total {before/1048576:.2f} MiB -> {after/1048576:.2f} MiB.")
print("Original PNGs and hero video were not altered.")
