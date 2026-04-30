-- Newsletter subscribers table.
-- One row per email address. Status flows: pending -> active -> unsubscribed.
-- `token` is used for BOTH the confirmation link (while pending) and the
-- unsubscribe link (while active). It's regenerated on re-subscribe.

CREATE TABLE IF NOT EXISTS subscribers (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    email           TEXT NOT NULL UNIQUE,
    status          TEXT NOT NULL CHECK (status IN ('pending', 'active', 'unsubscribed')),
    token           TEXT NOT NULL UNIQUE,
    source          TEXT,                              -- e.g. 'footer', 'blog-post', 'newsletter-page'
    subscribed_at   INTEGER NOT NULL,                  -- unix seconds
    confirmed_at    INTEGER,
    unsubscribed_at INTEGER
);

CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
CREATE INDEX IF NOT EXISTS idx_subscribers_token  ON subscribers(token);
