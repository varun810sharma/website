"use client";

import PageTransition from "@/components/PageTransition";
import Link from "next/link";

export default function BlogPostPage() {
    return (
        <PageTransition>
            <div style={{ paddingTop: "3rem", paddingBottom: "4rem", maxWidth: "720px" }}>
                {/* Back link */}
                <Link
                    href="/blog"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        fontSize: "0.85rem",
                        color: "var(--muted)",
                        marginBottom: "2rem",
                        textDecoration: "none",
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15,18 9,12 15,6" />
                    </svg>
                    Back to Blog
                </Link>

                {/* Post Header */}
                <div style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", fontSize: "0.8rem", color: "var(--muted)" }}>
                        <span>Apr 2026</span>
                        <span>·</span>
                        <span>10 min read</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "1rem" }}>
                        Six Consumer Trends I Noticed in India That I Can&apos;t Stop Thinking About
                    </h1>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        <span className="tech-tag">Consumer Trends</span>
                        <span className="tech-tag">India</span>
                        <span className="tech-tag">D2C</span>
                        <span className="tech-tag">Market Analysis</span>
                    </div>
                </div>

                {/* Post Body */}
                <div style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--foreground)" }}>

                    <p style={{ marginBottom: "1.5rem" }}>
                        The cliché about India is that it&apos;s a price-sensitive market where global brands have to cut corners to win. That framing is dead.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        Over the last few months, I read on startups, moved between cities, visited stores, and talked to founders - spending time as a consumer in one of the world&apos;s most interesting markets. What I came back with is a set of observations I can&apos;t stop thinking about. A consumer class that wants the real thing, and is increasingly able to afford it. Indian brands building that real thing faster, and with sharper cultural fluency, than most foreign entrants can match. And a broader market moment - consumer class expanding, digital infrastructure finally caught up with aspirations, demand emerging that simply didn&apos;t exist five years ago - that I think is still underappreciated.
                    </p>
                    <p style={{ marginBottom: "2rem" }}>
                        Six categories prove it. I&apos;m writing them down because I think they matter.
                    </p>

                    {/* Section 1 */}
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem", marginTop: "2rem" }}>
                        1. Protein Is India&apos;s New Food Religion
                    </h2>
                    <p style={{ marginBottom: "1.5rem" }}>
                        Something has shifted in how Indians think about what they eat. Protein, once associated with bodybuilders and gym culture, has gone fully mainstream. <strong>Amul</strong> is leading the charge from the establishment side, leveraging its unmatched distribution and brand trust to own the protein narrative in traditional FMCG. When <strong>Haldiram&apos;s</strong>, a legacy snacking institution, launches a protein namkeen line, it means a category has officially arrived, at least in the early stages.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        The more interesting story is in D2C. <strong>Whole Truth</strong> and <strong>Cosmix</strong> have built something rare in any market: brand credibility that rivals international players on quality perception. Their advantage isn&apos;t just the product - it&apos;s the story. Clean labels, India-specific formulations, no-nonsense positioning. They&apos;ve demonstrated that the Indian consumer is sophisticated enough to choose a local brand over a global one when the narrative is tight, and the product actually delivers.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        Yoga Bar&apos;s acquisition by ITC in 2022 validated the category for institutional capital. <strong>Epigamia</strong> continues to push the frontier on protein density per calorie in dairy formats. And QCommerce has been a quiet enabler, making it possible to get a high-protein Greek yogurt or a clean-label bar in 10 minutes, unlocking impulse health purchases that simply didn&apos;t exist before. Watch for global protein brands to struggle to hold share as Indian alternatives improve and QCom shelf placement becomes the new battleground.
                    </p>

                    {/* Section 2 */}
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem", marginTop: "2rem" }}>
                        2. From Energy to Wellness: A Category Evolution
                    </h2>
                    <p style={{ marginBottom: "1.5rem" }}>
                        The energy drink wave that <strong>Sting</strong> surfed and <strong>Red Bull</strong> established has crested. What&apos;s rising in its place is more nuanced: ashwagandha gummies, sleep supplements, adaptogen drinks, gut shots. A particular consumer class has moved from &ldquo;I need instant energy&rdquo; to &ldquo;I want to feel good across the whole day.&rdquo; That&apos;s a more complex and significantly higher-margin need. There is still a large category for instant energy where Sting is well-placed, though.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        This is the &ldquo;functional beverage&rdquo; shift, and the white space in India is enormous. Calming and recovery as product occasions are dramatically underdeveloped relative to the demand that already exists. The category is expected to grow significantly, and the brands that frame themselves around system-level wellbeing rather than just peak energy are the ones to watch.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        There&apos;s a broader thesis here: India may have partially skipped the junk-energy phase that defined the West in the 2000s and is landing more directly into the functional wellness era. Whether that holds across income segments or is just true in urban, upper-middle-class households is worth watching - but the early signals are omnipresent.
                    </p>

                    {/* Section 3 */}
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem", marginTop: "2rem" }}>
                        3. Men&apos;s Grooming Has Earned Its Place
                    </h2>
                    <p style={{ marginBottom: "1.5rem" }}>
                        <strong>Bombay Shaving Company</strong> was a pioneer in making men&apos;s skincare feel intentional rather than accidental in India, and the category has matured considerably since those early days. What&apos;s notable now is the front-and-center placement of men&apos;s grooming on e-commerce and QCommerce homepages. That prime digital real estate is a strong proxy for purchase frequency and basket size. The category has earned its shelf.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        On the M&amp;A side, the story is already well underway. <strong>Marico</strong> acquired <strong>Beardo</strong> in a two-stage deal, scaling the brand to ₹214 crore in revenue in FY25 - up 24% year-on-year with profit growing 3.6x. That outcome is a proof point that Indian men will build long-term brand loyalty when the product and positioning are right. Marico&apos;s broader D2C acquisition strategy (Plix, Beardo, Just Herbs, True Elements) signals that FMCG majors have fully accepted that D2C brands are building consumer trust faster than traditional channels can.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        The open question: are there still strong, independent, male-focused Indian D2C brands that haven&apos;t yet been acquired as the category grows?
                    </p>

                    {/* Section 4 */}
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem", marginTop: "2rem" }}>
                        4. Pet Care Has Gone Mainstream
                    </h2>
                    <p style={{ marginBottom: "1.5rem" }}>
                        Walk into any QCommerce app in a major Indian city, and you&apos;ll find a dedicated pet care section stocked with premium kibble, supplements, grooming products, and treats. That wasn&apos;t true a few years ago. <strong>Drools</strong>, a homegrown Indian brand, has earned real consumer trust and is performing exceptionally well. The category isn&apos;t a niche anymore - it&apos;s becoming a core part of how urban Indians spend.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        Two layers building on top of this: pet insurance and pet-friendly travel. The pet insurance market in India hit roughly USD 294 million in 2024 and is projected to grow at ~13% CAGR through 2033. But here&apos;s the striking part: fewer than 1% of Indian pets are currently insured. Awareness and infrastructure are being built in real time, with brands such as Digit and Bajaj Allianz introducing tailored policies. The headroom is enormous.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        The structural driver underneath all of this is a shift in household formation. DINK (Dual-Income, No Kids) households are growing in Indian metros. Fertility rates are declining. Middle-class incomes are rising. In that context, pets move from peripheral to central in the emotional and financial lives of consumers. The Indian pet care market overall is growing at over 20% CAGR. This feels like the early innings, not the peak.
                    </p>

                    {/* Section 5 */}
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem", marginTop: "2rem" }}>
                        5. The Coffee Wave Has Arrived - What Comes Next?
                    </h2>
                    <p style={{ marginBottom: "1.5rem" }}>
                        <strong>Blue Tokai</strong> cracked the premium specialty coffee segment with genuine product quality and a community-first approach. <strong>Rage Coffee</strong> built brand cachet and youth credibility. <strong>Sleepy Owl</strong> pioneered ready-to-drink cold brew and grew fast. Together, these brands did something real: they normalized paying a premium for origin-forward, well-roasted coffee in India. That wasn&apos;t a given a few years ago.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        The open category now is <strong>instant coffee</strong>. Nescafé and BRU still dominate a format that the vast majority of Indians use every single day. No one has seriously challenged them on quality, and the other western brands haven&apos;t been able to position themselves well - and that feels like an opportunity. There&apos;s a real opening for a brand to do to instant what Blue Tokai did to filter: bring specialty credibility and clean ingredients to a format built for convenience. Soluble single-origin, mushroom coffee, and adaptogen-infused instant formats all exist elsewhere. India hasn&apos;t fully seen them yet.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        Another factor to keep in mind: India is also a tea-drinking nation, as &ldquo;chai&rdquo; has been part of the culture. Coffee, though, is starting to be more relevant. It will be exciting to see how tea and coffee position themselves - which is different from other cultures. An example is the Turkish culture, where Turkish Tea and Turkish Coffee both balance out. India is still figuring this out, and I want to see this.
                    </p>

                    {/* Section 6 */}
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem", marginTop: "2rem" }}>
                        6. Fitness Culture Is Real, But Pricing Will Decide Who Wins
                    </h2>
                    <p style={{ marginBottom: "1.5rem" }}>
                        Run clubs are now a genuine social institution in Bangalore, Mumbai, and Delhi. They function simultaneously as fitness communities and professional and dating networks for young, urban Indians. <strong>WHOOP</strong> only recently launched in India. <strong>Hyrox</strong> made its India debut in Mumbai in May 2025, drawing 1,650 participants from 24 countries for its inaugural race - a strong signal for a format that didn&apos;t exist in India before. Bangalore Hyrox 2026 just happened last weekend, and Delhi tickets were out the same week. It&apos;s a cult following and growing in the country.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        The structural tension in this category, though, is price vs. purchasing power parity. A WHOOP membership or Hyrox entry fee priced at global rates is accessible to only a narrow slice of Indian consumers. The instructive analogy is <strong>Spotify and YouTube in India</strong>: both introduced India-specific pricing and saw adoption explode. Fitness brands that localize on price - not just on language or marketing, but structurally on what the product costs - will unlock a far larger addressable market.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        The opportunity is an Indian fitness tracker or wearable built for the ₹3,000–8,000 price point that delivers 70% of what Garmin or WHOOP offers. <strong>GOQii and UltraHuman</strong> have played in this space, but haven&apos;t fully captured it. The space feels genuinely open. Alternatively, watch for fitness platforms to follow the Spotify playbook and introduce PPP-adjusted pricing - and watch what happens to adoption when they do.
                    </p>

                    {/* Closing */}
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem", marginTop: "2rem" }}>
                        Why I&apos;m Bullish
                    </h2>
                    <p style={{ marginBottom: "1.5rem" }}>
                        Each of these six observations is interesting on its own. What makes me genuinely excited is what they have in common: they are all being driven by an Indian consumer who is more sophisticated, more brand-aware, more health-conscious, and more willing to pay for quality than the conventional narrative gives credit for.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        The cliché about India is that it&apos;s a price-sensitive market where global brands have to cut corners to compete. That framing is increasingly obsolete. What I saw was a consumer class that wants the real thing - and is increasingly able to afford it. More importantly, Indian brands are building the real thing, often faster and with better cultural fluency than foreign entrants.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        The structural tailwinds are real: rising middle-class incomes, declining fertility and the attendant shift in how discretionary income is spent, QCommerce as a distribution unlock, and a D2C infrastructure that lets good brands reach consumers without the legacy friction of traditional retail. These aren&apos;t temporary tailwinds. They compound.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        I came away from this with a clear conviction: the brands and founders building for the Indian consumer right now - across multiple verticals - are doing some of the most interesting work in consumer anywhere in the world. And the market is still early enough that the best outcomes haven&apos;t been written yet.
                    </p>
                    <p style={{ marginBottom: "1.5rem", fontStyle: "italic", color: "var(--muted)" }}>
                        That&apos;s a combination worth paying attention to.
                    </p>
                </div>
            </div>
        </PageTransition>
    );
}
