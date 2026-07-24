# CLAUDE.md — varunsharma.online conventions

## Publishing pipeline (do not re-derive)
1. Article HTML lives at `src/content/blogs/<slug>.html` (`<h2>` sections, `<p>` body, `<ul>` sources).
2. CRITICAL QUIRK: content is served INLINE from `lib/blog-content.ts` — the HTML file alone does nothing. Always inject the content into the `blog-content.ts` map.
3. Register metadata in `src/data/blog-posts.ts`: slug, date "Mon YYYY", `published` flag (default FALSE unless the user says "post this"), tags, read time.
4. Verify: `tsc --noEmit` must pass before calling it done.
5. Deploy: push to `main` triggers the GitHub Action (`.github/workflows/deploy.yml`). Never hand the user a manual `npm run deploy` — that loop was retired 2026-07-08.
6. After deploy: draft the LinkedIn post (direct opener stating what the article is; close with the standard subscribe line), and remind the user to re-scrape the article URL in LinkedIn Post Inspector.

## Style rules (enforced, not suggestions)
- No em-dashes. AP-style numbers. Never "genuinely".
- No triads / rule-of-three closers, no "not X, it's Y" antithesis, no punchy-fragment closers. One metaphor gets one hit.
- Direct openers: say what the piece is immediately.
- Voice gate: run `blue-flame-standard` before publishing. 45/60 or revise.
- Fact gate: verify every number, date, and valuation against sources before publish (drafts reliably carry factual drift — check valuations and multiples especially).

## Site facts
- Next.js → OpenNext → Cloudflare Workers (wrangler). Repo root is this folder.
- Homepage says "Articles", not "Essays".
- Audience: operators, VCs, potential co-founders. The site is a credibility asset — precision over reach.
