/**
 * Spotify oEmbed helpers.
 *
 * We use Spotify's public oEmbed endpoint (no auth required) to resolve a
 * track or episode URL into its album/show artwork.  The endpoint returns
 * 300x300 artwork hosted on Spotify's CDN — fine for the 64x64 thumbnails
 * we render in the newsletter.
 *
 * Reference: https://developer.spotify.com/documentation/embeds/reference/oembed
 */

const OEMBED_ENDPOINT = "https://open.spotify.com/oembed";
/** Bound how long we wait per lookup so a slow oEmbed can't stall a send. */
const FETCH_TIMEOUT_MS = 4000;

interface OEmbedResponse {
    thumbnail_url?: string;
    title?: string;
}

/**
 * Resolve the album/show artwork URL for a Spotify track or episode URL.
 * Returns `undefined` on any failure (invalid URL, network error, malformed
 * response, timeout) — callers should treat the artwork as optional and fall
 * back to a no-image layout.
 */
export async function fetchSpotifyArtwork(spotifyUrl: string): Promise<string | undefined> {
    if (!spotifyUrl || typeof spotifyUrl !== "string") return undefined;
    if (!/^https?:\/\/(open\.)?spotify\.com\//i.test(spotifyUrl)) return undefined;

    const url = `${OEMBED_ENDPOINT}?url=${encodeURIComponent(spotifyUrl)}`;

    // AbortController gives us a clean timeout in the Workers runtime.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: { Accept: "application/json" },
            signal: controller.signal,
        });
        if (!res.ok) return undefined;
        const json = (await res.json()) as OEmbedResponse;
        const thumb = json.thumbnail_url?.trim();
        return thumb && thumb.startsWith("https://") ? thumb : undefined;
    } catch {
        return undefined;
    } finally {
        clearTimeout(timer);
    }
}

/**
 * Run multiple Spotify URL lookups in parallel.  Each entry's result is
 * keyed by its position in the input array so callers can map results back
 * to picks unambiguously.
 */
export async function fetchManyArtwork(urls: string[]): Promise<Array<string | undefined>> {
    return Promise.all(urls.map((u) => fetchSpotifyArtwork(u)));
}
