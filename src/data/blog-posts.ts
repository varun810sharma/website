export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    readTime: string;
    summary: string;
    tags: string[];
    published: boolean; // must be true for a post to appear anywhere on the site
    // Optional per-post social preview image. Point at a 1200x630 image in
    // /public using a root-relative path (e.g. "/og/rented-restraint-glp1.png").
    // When omitted, the site-wide fallback (/og/default.png) is used so the
    // link preview never breaks.
    image?: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: "the-safe-bet-music-discovery",
        title: "The Safe Bet: How Music Stopped Paying to Find Great New Art",
        date: "Aug 2026",
        readTime: "10 min read",
        summary: "Labels spent a record $8.1 billion finding new artists in 2024, and America listened to less of what that money produced. On Spotify's Discovery Mode as an undisclosed ad business, why 253 million tracks broke the economics of being heard, and why I think Netflix merges with Spotify within five years.",
        tags: ["Music Industry", "Spotify", "M&A", "Strategy"],
        published: true,
    },
    {
        slug: "rented-restraint-glp1",
        title: "Rented Restraint: GLP-1 and the Businesses Built on Wanting More",
        date: "Jul 2026",
        readTime: "16 min read",
        summary: "Milk was a demand-creation campaign before it was a habit. GLP-1 is the first tool that runs the machine backward, and a fifth of American households are already on it. On rented versus owned restraint, why the profit hit runs far ahead of the sales hit for snacks and restaurants, the contrarian case that it makes insurance cheaper, and why India is the cheaper, faster lab.",
        tags: ["GLP-1", "Consumer Trends", "Healthcare", "Strategy"],
        published: true,
        image: "/og/rented-restraint-glp1.png",
    },
    {
        slug: "after-running-on-premium-athletic",
        title: "After Running: On and the Premium Athletic Position",
        date: "Jun 2026",
        readTime: "8 min read",
        summary: "On runs a 62.8% gross margin against 41% at Nike. You don't open a 22-point gap by building a marginally better running shoe. On the business On is actually in, why nobody else can take the premium athletic position, and what the Jordan Brand comparison reveals about the decade ahead.",
        tags: ["Strategy", "Consumer Brands", "Finance"],
        published: true,
        image: "/og/after-running-on-premium-athletic.png",
    },
    {
        slug: "first-90-days-product-manager",
        title: "How to Thrive in Your First 90 Days as a Product Manager",
        date: "May 2026",
        readTime: "5 min read",
        summary: "Not a generic 90-day playbook. A set of things I wish someone had told me before I started my B2B2C product role at PMI: finding the people who tell you the truth, studying the graveyard, and why the PMs who land well are the ones who listened longest.",
        tags: ["Product Management", "Career"],
        published: true,
        image: "/og/first-90-days-product-manager.png",
    },
    {
        slug: "after-the-category-quiet-reorganization-cpg",
        title: "After the Category: The Quiet Reorganization of CPG",
        date: "May 2026",
        readTime: "14 min read",
        summary: "The categories that defined CPG for a century are dissolving into each other, and the org charts haven't caught up. On transformers, acquirers, the distribution paradox that destroys what it buys, why non-alcoholic beverages crystallize everything, and the next acquisitions worth watching.",
        tags: ["CPG", "Consumer Trends", "M&A", "Strategy"],
        published: true,
        image: "/og/after-the-category-quiet-reorganization-cpg.png",
    },
    {
        slug: "six-consumer-trends-india",
        title: "Six Consumer Trends I Noticed in India That I Can't Stop Thinking About",
        date: "Apr 2026",
        readTime: "10 min read",
        summary: "A consumer class that wants the real thing, and is increasingly able to afford it. Six observations on protein, wellness, grooming, pet care, coffee, and fitness — and why I'm bullish on India.",
        tags: ["Consumer Trends", "Market Analysis"],
        published: true,
        image: "/og/six-consumer-trends-india.png",
    },
    {
        slug: "take-risks-to-write-a-better-brand-story",
        title: "Take Risks to Write a Better Brand Story",
        date: "Mar 2024",
        readTime: "5 min read",
        summary: "A brand is the end result of the choices it makes — not its tagline or banner. On why the best brands, from Nike to early-stage startups, take calculated risks to build stories that actually resonate.",
        tags: ["Branding", "Marketing", "Entrepreneurship"],
        published: false,
    },
];
