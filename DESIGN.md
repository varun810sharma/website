# Design system — varunsharma.online

System name: Signal. One vermilion accent carrying the whole identity on a white ground, sans display over serif body, generous air. Reference point: ben-evans.com, translated into free, self-hosted type. This document is the single source of truth; a new article should require zero design decisions.

## The rationale

The site is a small independent publication with one writer. The writing is the product; the design's job is to make a serious reader trust the author within thirty seconds and start reading. Visual interest comes from typography, one signature color, rule lines, photography on articles, and generous spacing.

### Why this palette

White ground, soft charcoal text (#414141) rather than pure black, and a single signature vermilion. The red is the brand: it owns the wordmark, the display headline, dates, section labels, and the structural rules. Everything else stays neutral, so every appearance of the red reads as signal.

Two reds, one color: `--signal` (#e84a45) for large elements where vibrancy matters (display type, rules, wordmark, buttons), `--signal-deep` (#c0392b) for small text (dates, labels, links) where contrast has to hold up (4.6:1, AA). They read as one color at their respective sizes.

### Why this type system

Hanken Grotesk carries display, titles, nav, and UI: a warm grotesque in the Messina Sans register, free (OFL) and variable. Newsreader carries the reading body, deks, and quotes: drawn for screen reading with real editorial character. Sans headline over serif body is the classic editorial pairing; the contrast does the visual work that decoration would otherwise do. Both self-hosted and subset at build time via next/font. No third family.

## Color tokens

| Token | Value | Role |
|---|---|---|
| `--paper` | `#ffffff` | Page background |
| `--surface` | `#f7f6f4` | Data callouts, kbd, code |
| `--ink` | `#414141` | Body text |
| `--ink-strong` | `#2b2b2b` | Titles |
| `--ink-soft` | `#5c5c5c` | Deks, secondary prose |
| `--meta` | `#767676` | Muted UI, read time, tags |
| `--hairline` | `#dedede` | Item separators |
| `--signal` | `#e84a45` | Display type, rules, wordmark, buttons, blockquote bar |
| `--signal-deep` | `#c0392b` | Dates, labels, links, small red text |
| `--signal-hover` | `#a33021` | Hover states |

Rules: the red never becomes a background wash or a decorative shape. It lives on type, rules, and the subscribe button. Tags stay gray so dates stay loud. Legacy names (`--foreground`, `--muted`, `--accent`) alias into the system.

## Type scale

| Token | Size | Face | Use |
|---|---|---|---|
| `--text-meta` | 12px | Hanken 600 caps | Dates (red), tags (gray) |
| `--text-label` | 13px | Hanken | Footer, captions, read time |
| `--text-ui` | 15px | Hanken 500 | Nav, buttons, forms |
| `--text-body` | 17px | Newsreader | Prose, 1.65 line height |
| `--text-h3` | 22px | Hanken 600 | Article-row titles |
| `--text-h2` | 24px | Hanken 600 | Article h2 |
| Display | clamp 32–60px | Hanken 600, -0.02em | Home hero (red), article titles (charcoal) |

Reading measure: `--measure: 40rem`. Site container: `--container: 68rem` — wide, with the article-row grid (date column / content / thumbnail) filling it.

## Layout devices

- **Red rules** separate major sections; gray hairlines separate items within a section.
- **Section grid**: red section label in a left column (11rem), content right. Collapses to single column under 860px.
- **Article rows**: red date caps left, sans title + serif dek center, OG thumbnail right (180px). Mobile: image on top, then date, title, dek.
- **Article page**: centered sans display title + serif dek, red rule, full-width hero image, then a left meta column (date, read time, tags, right-aligned) beside the prose.
- **Hero (home)**: red display line "Builder. Operator. Endurance Athlete.", serif bio at measure, portrait photo right (300px, radius 4px).

## Spacing

Scale `--s1`–`--s9` (4px to 96px). Sections breathe: hero padding `--s8`, section padding `--s6`/`--s7`, article rows `--s6` vertical. The old dense rhythm was retired deliberately; air is part of the reference language.

## Components

- **Masthead**: red wordmark left, sans nav right, red hairline below. Not sticky.
- **Subscribe**: lives in the footer only (plus the dedicated /newsletter page). One field, one button (red), "No spam, just signal." Never duplicated mid-page.
- **Data callout**: surface background, 2px red top rule, red Hanken figure + caption. `<div class="data-callout"><span class="data-callout__figure">62.8%</span><span class="data-callout__caption">On's gross margin, FY2024</span></div>`
- **Search (⌘K)**: white panel, red top rule, red type badges.
- **Prev/next**: hairline rule, red Newer/Older caps, sans titles.

## Motion

Essentially none. Hover color transitions (120ms) and focus states only. `prefers-reduced-motion` kills everything.

## Publishing a new article

Write the HTML (`<h2>` sections, `<p>` body, optional `.data-callout`, `<ul>` sources), register in `blog-posts.ts` with a 1200×630 OG image (it doubles as the row thumbnail and article hero), done.
