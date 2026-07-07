/**
 * Generate 1200x630 social/hero images for blog posts.
 *
 * Drop each source image (any size) into  blog-image-sources/<slug>.<ext>
 * then run:  npx tsx scripts/gen-og-images.mjs
 *
 * Sources live OUTSIDE public/ so the large originals are never deployed;
 * only the optimized crops in public/og/ ship to production.
 *
 * Output: public/og/<slug>.png  (1200x630, cover-cropped, centered)
 * These are used as the article hero, the blog-listing thumbnail, and the
 * Open Graph / Twitter preview image (see src/data/blog-posts.ts -> image).
 *
 * Any slug in blogPosts without a matching source file is skipped, so this is
 * safe to run whenever you add a new post: add the post, drop its source
 * image in blog-image-sources/, rerun.
 */
import { readdirSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { blogPosts } from "../src/data/blog-posts.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = join(root, "blog-image-sources");
const OUT_DIR = join(root, "public", "og");

mkdirSync(OUT_DIR, { recursive: true });

const sources = existsSync(SRC_DIR) ? readdirSync(SRC_DIR) : [];
const bySlug = new Map(
    sources
        .filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f))
        .map((f) => [f.replace(/\.[^.]+$/, ""), f]),
);

let made = 0;
for (const post of blogPosts) {
    const file = bySlug.get(post.slug);
    if (!file) {
        console.warn(`skip  ${post.slug} — no source in blog-image-sources/`);
        continue;
    }
    const out = join(OUT_DIR, `${post.slug}.png`);
    await sharp(join(SRC_DIR, file))
        .resize(1200, 630, { fit: "cover", position: "centre" })
        .png()
        .toFile(out);
    console.log(`ok    ${post.slug}.png`);
    made++;
}
console.log(`\nDone. ${made} image(s) written to public/og/`);
