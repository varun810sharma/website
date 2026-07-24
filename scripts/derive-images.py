#!/usr/bin/env python3
"""Generate on-page WebP derivatives from the 1200x630 OG PNGs.

The OG PNGs are for social previews only. This produces the sizes the site
actually renders, so pages ship kilobytes instead of megabytes:

    public/og/<slug>.png  ->  public/img/<slug>-thumb.webp   (360x189)
                              public/img/<slug>-hero.webp    (1472w)

Also refreshes public/img/avatar.webp from public/avatar.jpg.

Run from the repo root after adding a new OG image:

    python3 scripts/derive-images.py
"""

import glob
import os

from PIL import Image

OG_DIR = "public/og"
OUT_DIR = "public/img"

THUMB = (360, 189)   # 2x the 180px list slot
HERO_W = 1472        # 2x the 736px article column


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)

    for path in sorted(glob.glob(f"{OG_DIR}/*.png")):
        name = os.path.splitext(os.path.basename(path))[0]
        if name == "default":
            continue  # site-wide social fallback, never rendered on-page

        im = Image.open(path).convert("RGB")

        im.resize(THUMB, Image.LANCZOS).save(
            f"{OUT_DIR}/{name}-thumb.webp", "WEBP", quality=82, method=6
        )

        width = min(HERO_W, im.width)
        height = round(width * im.height / im.width)
        im.resize((width, height), Image.LANCZOS).save(
            f"{OUT_DIR}/{name}-hero.webp", "WEBP", quality=80, method=6
        )

        print(f"{name}: thumb + hero written")

    if os.path.exists("public/avatar.jpg"):
        av = Image.open("public/avatar.jpg").convert("RGB")
        av.resize((520, 520), Image.LANCZOS).save(
            f"{OUT_DIR}/avatar.webp", "WEBP", quality=82, method=6
        )
        print("avatar: written")


if __name__ == "__main__":
    main()
