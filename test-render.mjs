import { buildNewsletterEmailHtml } from "./src/lib/resend.ts";

const html = buildNewsletterEmailHtml({
    title: "Test",
    bodyHtml: "<p>hello world</p>",
    postUrl: "https://varunsharma.online/blog/something",
    unsubscribeUrl: "https://varunsharma.online/api/newsletter/unsubscribe?token=test",
    musicPicks: [
        { track: "T1", artist: "A1", spotifyUrl: "https://open.spotify.com/track/x", why: "good" },
        { track: "", artist: "", spotifyUrl: "", why: "" },
        { track: "T3", artist: "A3", spotifyUrl: "https://open.spotify.com/track/z", why: "great" },
    ],
    podcastPick: { show: "Acquired", episode: "Ep 1", spotifyUrl: "https://open.spotify.com/episode/x", why: "deep dive" },
});

console.log("CONTAINS_MUSIC_HEADER:", html.includes("What I'm listening to"));
console.log("CONTAINS_PODCAST_HEADER:", html.includes("Podcast pick"));
console.log("CONTAINS_T1:", html.includes(">T1<"));
console.log("CONTAINS_T3:", html.includes(">T3<"));
console.log("CONTAINS_ACQUIRED:", html.includes("Acquired"));
console.log("HTML_LENGTH:", html.length);
