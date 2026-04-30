# Newsletter — Setup Guide (Chunk 1: signup + double opt-in)

This guide walks you through the one-time external setup for the newsletter feature.
Do these **in order**. Total time: ~30 minutes, most of it waiting on DNS.

Nothing in this chunk is committed-and-forgotten config — you'll reference these
values again when we build chunks 2 and 3 (admin pages).

---

## 1. Create a Resend account and verify a sending domain

Resend handles the actual email delivery. Free tier: 3,000 emails/month, 100/day.

1. Sign up at https://resend.com (free, no card).
2. In the Resend dashboard → **Domains** → **Add Domain** → enter `varunsharma.online`.
   (Not a subdomain — use the apex so `newsletter@varunsharma.online` works.)
3. Resend will show you **4 DNS records** to add:
   - 1 × `MX` record (e.g. `send.varunsharma.online` → `feedback-smtp.*.amazonses.com`)
   - 1 × `TXT` SPF record (on `send.varunsharma.online`)
   - 1 × `TXT` DKIM record (on `resend._domainkey.varunsharma.online`)
   - 1 × `TXT` DMARC record (on `_dmarc.varunsharma.online`)
4. Add those records in Cloudflare DNS (Dashboard → your domain → DNS → Records → Add).
   **Important:** set each record to "DNS only" (grey cloud, not orange).
5. Back in Resend, click **Verify Domain**. DNS can take 1–30 min; refresh periodically.
6. Once verified, go to **API Keys** → **Create API Key** → name it `portfolio-newsletter`,
   permission **Sending access**, domain **varunsharma.online**. Copy the key (starts with `re_`).
   **You only see this once** — save it somewhere.

**Decide your sender identity now.** I've assumed `Varun Sharma <hi@varunsharma.online>` in
the code. If you want a different from-address, tell me before deploying and I'll swap it.

---

## 2. Create the Cloudflare D1 database

D1 is Cloudflare's SQLite. It's bound directly to your Worker — no connection strings.

From the project root:

```bash
# Create the database
npx wrangler d1 create portfolio-newsletter
```

That command prints a block like:

```jsonc
[[d1_databases]]
binding = "DB"
database_name = "portfolio-newsletter"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**Copy the `database_id`** — you'll paste it into `wrangler.jsonc` in step 3.

Then run the schema migration:

```bash
# Against your production D1
npx wrangler d1 execute portfolio-newsletter --remote --file=./migrations/0001_init.sql

# And against local D1 (for `npm run dev`)
npx wrangler d1 execute portfolio-newsletter --local --file=./migrations/0001_init.sql
```

Verify it worked:

```bash
npx wrangler d1 execute portfolio-newsletter --remote --command="SELECT name FROM sqlite_master WHERE type='table';"
```

You should see `subscribers`.

---

## 3. Wire the D1 binding into `wrangler.jsonc`

I've already added a placeholder block. Open `wrangler.jsonc` and replace
`REPLACE_WITH_YOUR_DATABASE_ID` with the real id from step 2.

---

## 4. Add the secrets

Three secrets are needed. For **production**, use Wrangler:

```bash
npx wrangler secret put RESEND_API_KEY
# paste the re_... key from step 1 when prompted

npx wrangler secret put ADMIN_PASSWORD
# pick a strong password — you'll use this for /admin in chunk 2

npx wrangler secret put SITE_URL
# e.g. https://varunsharma.online  (no trailing slash)
```

For **local dev** (`npm run dev`), create a file at the project root called
`.dev.vars` (this is the Wrangler convention; Next.js will pick it up via OpenNext):

```bash
# .dev.vars  — DO NOT COMMIT
RESEND_API_KEY=re_your_key_here
ADMIN_PASSWORD=something-long-and-random
SITE_URL=http://localhost:3000
```

Add `.dev.vars` to `.gitignore` if it's not already there.

---

## 5. Install the one new dependency

The code uses `getCloudflareContext()` to access the D1 binding from Next.js route
handlers. This comes from the OpenNext adapter:

```bash
npm install @opennextjs/cloudflare
```

(You're likely already using it since your `wrangler.jsonc` points at `.open-next/worker.js`,
but it may not be listed in `package.json` yet — this installs it explicitly.)

---

## 6. Test locally

```bash
npm run dev
```

Visit the homepage — there's a signup form in the footer. Enter an email.
You should receive a confirmation email within a few seconds (check spam the first
time). Click the link — it should take you to `/newsletter/confirmed`.

If something goes wrong, check the terminal running `npm run dev` for logs.
The most common issues:
- **No email arrives:** the Resend domain isn't fully verified yet, or the from-address
  doesn't match the verified domain.
- **`DB is undefined`:** the D1 binding isn't wired — re-check step 3.
- **`RESEND_API_KEY is not defined`:** `.dev.vars` isn't being picked up; make sure you
  restarted `npm run dev` after creating it.

---

## 7. Deploy

```bash
npm run build
npx wrangler deploy
```

Test the same flow on production.

---

## Quick reference: what gets created in this chunk

**New files**
- `migrations/0001_init.sql` — the `subscribers` table schema
- `src/lib/db.ts` — D1 access helper
- `src/lib/resend.ts` — thin Resend fetch wrapper
- `src/lib/email-templates.ts` — confirmation email HTML
- `src/lib/tokens.ts` — UUID + email validation helpers
- `src/app/api/subscribe/route.ts` — accept signup, send confirmation
- `src/app/api/confirm/route.ts` — flip subscriber to active
- `src/app/api/unsubscribe/route.ts` — one-click unsubscribe
- `src/components/SubscribeForm.tsx` — the form UI
- `src/app/newsletter/confirmed/page.tsx` — "you're in" page
- `src/app/newsletter/unsubscribed/page.tsx` — "you're out" page

**Modified files**
- `wrangler.jsonc` — added D1 binding
- `src/components/Footer.tsx` — added SubscribeForm above the copyright

Chunks 2 (admin list + CSV export) and 3 (compose + send) come next.
