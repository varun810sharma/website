import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";

export default function Home() {
  const posts = blogPosts.filter((post) => post.published);

  return (
    <>
      {/* Hero: display line, bio, photo */}
      <section className="hero">
        <div className="hero__body">
          <h1 className="hero__display">
            Builder. Operator.<br />Endurance Athlete.
          </h1>

          <p style={{ marginBottom: "1.3em" }}>
            I&apos;ve spent my career building companies, breaking categories, and picking up hard lessons at every scale.
          </p>
          <p style={{ marginBottom: "1.3em" }}>
            Right now I&apos;m at <strong>Philip Morris International</strong>, at the intersection of technology, consumer goods, and go-to-market strategy. Before that, I co-founded <strong>Laumière Gourmet Fruits</strong> in California, scaling a D2C brand from zero to $5M in revenue and owning sales, marketing, partnerships, and GTM end to end. Earlier, at <strong>PwC</strong>, I ran large-scale digital transformation programmes across the GCC, a fast education in how large organisations actually make decisions. It all started at <strong>Red Bull</strong>, my first real taste of consumer goods, endurance culture, and what it means to build a brand people actually believe in.
          </p>
          <p style={{ marginBottom: "1.3em" }}>
            An <strong>MBA from INSEAD</strong> and a <strong>Computer Engineering degree from BITS Pilani</strong>{" "}sit somewhere in all of this, experiences that quietly rewired how I think. I&apos;m still working out in what ways.
          </p>
          <p style={{ marginBottom: "1.3em" }}>
            Outside of work, I&apos;m an endurance athlete who was a DJ for over a decade. The disciplines look nothing alike, but the instinct is the same: find something that demands everything, and keep showing up.
          </p>
          <p style={{ marginBottom: "1.5em" }}>
            I plan to write more here. Articles on global and regional brands, commercial strategy, and what building across geographies and industries actually looks like up close. And probably a few things that don&apos;t fit neatly into any category, which is usually where the most interesting thinking happens. Follow along or get in touch.
          </p>

          <p
            style={{
              fontFamily: "var(--font-hanken), sans-serif",
              fontSize: "var(--text-ui)",
              fontWeight: 500,
              display: "flex",
              gap: "var(--s5)",
              marginBottom: 0,
            }}
          >
            <a
              href="https://www.linkedin.com/in/varun810sharma/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href="mailto:varun_sharma@live.com">Email</a>
            <Link href="/newsletter">Newsletter</Link>
          </p>
        </div>

        <div className="hero__photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/avatar.webp"
            alt="Varun Sharma"
            width={520}
            height={520}
            fetchPriority="high"
          />
        </div>
      </section>

      <hr className="rule rule--signal" />

      {/* Articles */}
      <section className="section" aria-labelledby="articles-heading">
        <div>
          <h2 id="articles-heading" className="section-label" style={{ margin: 0 }}>
            Articles
          </h2>
        </div>

        <ul className="toc">
          {posts.map((post) => (
            <li key={post.slug} className="toc__item">
              <Link href={`/blog/${post.slug}`} className="toc__link">
                <span className="caps-signal toc__date">{post.date}</span>
                <div style={{ minWidth: 0 }}>
                  <h3 className="toc__title">{post.title}</h3>
                  <p className="toc__dek">{post.summary}</p>
                  <div className="toc__tags">
                    <span className="meta-line">{post.readTime}</span>
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
