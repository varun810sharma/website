// On-page image derivatives.
//
// The 1200x630 PNGs in /public/og exist for social link previews, where
// platforms want a real PNG/JPEG at exact dimensions. They are 1-1.5 MB each,
// so they must never be used as on-page <img> sources: the home page would
// ship ~6 MB to render five 180px thumbnails.
//
// /public/img holds WebP derivatives sized to their actual slots:
//   <slug>-thumb.webp  360x189  (2x of the 180px list thumbnail)
//   <slug>-hero.webp   1472w    (2x of the 736px article column)
//
// Regenerate with scripts/derive-images.py after adding a new OG image.

/** Derive an on-page source from a post's OG image path. */
function derive(ogPath: string | undefined, suffix: string): string | undefined {
    if (!ogPath) return undefined;
    const name = ogPath.split("/").pop()?.replace(/\.(png|jpe?g)$/i, "");
    // The site-wide fallback has no derivative; skip rather than 404.
    if (!name || name === "default") return undefined;
    return `/img/${name}-${suffix}.webp`;
}

export function thumbSrc(ogPath: string | undefined): string | undefined {
    return derive(ogPath, "thumb");
}

export function heroSrc(ogPath: string | undefined): string | undefined {
    return derive(ogPath, "hero");
}
