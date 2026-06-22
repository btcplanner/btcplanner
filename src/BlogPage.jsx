import { useState, useEffect } from "react";
import { marked } from "marked";
import { blogPosts } from "./blogPosts.js";
import { getAbTitle } from "./abtest.js";

const COLORS = {
  bg: "#FFFFFF",
  card: "#F9FAFB",
  cardBorder: "#E5E7EB",
  orange: "#F7931A",
  orangeLight: "#FFF7ED",
  textPrimary: "#1D1D1B",
  textMuted: "#6B7280",
  textSub: "#4B5563",
};

marked.setOptions({
  breaks: true,
  gfm: true,
});

function CanadaFlag({ size = 20 }) {
  return <span style={{ fontSize: size, lineHeight: 1, display: "inline-block", verticalAlign: "middle" }} role="img" aria-label="Canada">🇨🇦</span>;
}

export default function BlogPage({ slug, onNavigate }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("btcplanner_lang") || "en"; } catch { return "en"; }
  });

  const toggleLang = () => {
    const next = lang === "en" ? "fr" : "en";
    setLang(next);
    try { localStorage.setItem("btcplanner_lang", next); } catch {}
  };

  const post = slug ? blogPosts.find(p => p.slug === slug) : null;

  useEffect(() => {
    const cleanupFns = [];

    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const [key, val] = selector.match(/\[([^=]+)="([^"]+)"\]/).slice(1, 3) || [];
        if (key && val) el.setAttribute(key, val);
        document.head.appendChild(el);
        cleanupFns.push(() => el.remove());
      }
      el.setAttribute(attr, value);
    };

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
        cleanupFns.push(() => el.remove());
      }
      el.setAttribute("href", href);
    };

    if (post) {
      const abTitle = getAbTitle(post.slug, lang) || post.title[lang];
      const title = `${abTitle} | BTC Planner`;
      const url = `https://btcplanner.ca/blog/${post.slug}`;
      document.title = title;
      setMeta('meta[name="description"]', "content", post.description[lang]);
      setLink("canonical", url);

      setMeta('meta[property="og:type"]', "content", "article");
      setMeta('meta[property="og:title"]', "content", abTitle);
      setMeta('meta[property="og:description"]', "content", post.description[lang]);
      setMeta('meta[property="og:url"]', "content", url);
      if (post.image) setMeta('meta[property="og:image"]', "content", post.image);
      setMeta('meta[property="og:site_name"]', "content", "BTC Planner");
      setMeta('meta[property="og:locale"]', "content", lang === "en" ? "en_CA" : "fr_CA");

      setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
      setMeta('meta[name="twitter:title"]', "content", post.title[lang]);
      setMeta('meta[name="twitter:description"]', "content", post.description[lang]);
      if (post.image) setMeta('meta[name="twitter:image"]', "content", post.image);

      let ldScript = document.querySelector('script[data-blog-ld]');
      if (!ldScript) {
        ldScript = document.createElement("script");
        ldScript.type = "application/ld+json";
        ldScript.setAttribute("data-blog-ld", "true");
        document.head.appendChild(ldScript);
        cleanupFns.push(() => ldScript.remove());
      }
      ldScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title[lang],
        "description": post.description[lang],
        "image": post.image || "",
        "datePublished": post.date,
        "dateModified": post.date,
        "author": { "@type": "Organization", "name": "BTC Planner", "url": "https://btcplanner.ca" },
        "publisher": { "@type": "Organization", "name": "BTC Planner", "url": "https://btcplanner.ca" },
        "mainEntityOfPage": { "@type": "WebPage", "@id": url },
        "inLanguage": lang === "en" ? "en-CA" : "fr-CA",
      });
    } else {
      const blogTitle = lang === "en"
        ? "Bitcoin Blog for Canadians | BTC Planner"
        : "Blog Bitcoin pour les Canadiens | BTC Planner";
      document.title = blogTitle;
      setMeta('meta[name="description"]', "content", lang === "en"
        ? "Educational articles about buying, storing, and understanding Bitcoin in Canada."
        : "Articles éducatifs sur l'achat, le stockage et la compréhension du Bitcoin au Canada.");
      setLink("canonical", "https://btcplanner.ca/blog");

      setMeta('meta[property="og:type"]', "content", "website");
      setMeta('meta[property="og:title"]', "content", blogTitle);
      setMeta('meta[property="og:url"]', "content", "https://btcplanner.ca/blog");
    }

    return () => {
      document.title = "BTC Planner — Canada's Bitcoin Guide";
      cleanupFns.forEach(fn => fn());
    };
  }, [post, lang]);

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.textPrimary, fontFamily: "'Inter', sans-serif" }} lang={lang}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a:hover { opacity: 0.85; }
        :focus-visible { outline: 2px solid ${COLORS.orange}; outline-offset: 2px; }
        .blog-content h2 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 22px; color: ${COLORS.textPrimary}; margin: 28px 0 12px; padding-bottom: 8px; border-bottom: 2px solid ${COLORS.orange}; }
        .blog-content h3 { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 17px; color: ${COLORS.textPrimary}; margin: 24px 0 10px; }
        .blog-content p { font-size: 15px; color: ${COLORS.textSub}; line-height: 1.8; margin-bottom: 14px; }
        .blog-content ul, .blog-content ol { padding-left: 24px; margin-bottom: 14px; }
        .blog-content li { font-size: 15px; color: ${COLORS.textSub}; line-height: 1.8; margin-bottom: 6px; }
        .blog-content strong { color: ${COLORS.textPrimary}; }
        .blog-content a { color: ${COLORS.orange}; text-decoration: underline; }
        .blog-content table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px; }
        .blog-content th { background: ${COLORS.orangeLight}; color: ${COLORS.textPrimary}; font-weight: 600; padding: 10px 12px; text-align: left; border: 1px solid ${COLORS.cardBorder}; }
        .blog-content td { padding: 10px 12px; border: 1px solid ${COLORS.cardBorder}; color: ${COLORS.textSub}; }
        .blog-content tr:nth-child(even) td { background: ${COLORS.card}; }
      `}</style>

      <header style={{ borderBottom: `1px solid ${COLORS.cardBorder}`, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => onNavigate("home")} style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: COLORS.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0 }} aria-hidden="true">₿</div>
            <div style={{ textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: COLORS.textPrimary, letterSpacing: "-0.3px" }}>BTCPLANNER.CA</span>
                <CanadaFlag size={18} />
              </div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, letterSpacing: "0.04em" }}>
                {lang === "en" ? "Canada's Bitcoin guide" : "Le guide Bitcoin du Canada"}
              </div>
            </div>
          </button>
        </div>
      </header>

      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10, padding: "6px 24px", background: "#fff", borderBottom: `1px solid ${COLORS.cardBorder}` }}>
        <button onClick={() => onNavigate("home")} style={{ background: COLORS.orange, border: "none", borderRadius: 6, padding: "4px 12px", fontSize: 12, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
          ← {lang === "en" ? "Home" : "Accueil"}
        </button>
        <button onClick={toggleLang} aria-label={lang === "en" ? "Passer au français" : "Switch to English"} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 500, color: COLORS.textSub, cursor: "pointer", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: COLORS.textMuted }}>Language:</span> {lang === "en" ? "Français" : "English"}
        </button>
      </div>

      <main style={{ maxWidth: 780, margin: "0 auto", padding: "32px 16px" }}>
        {post ? (
          <article>
            <nav aria-label="Breadcrumb" style={{ marginBottom: 20 }}>
              <button onClick={() => onNavigate("home")} style={{ background: "none", border: "none", color: COLORS.orange, cursor: "pointer", fontSize: 13, fontFamily: "'Inter', sans-serif", padding: 0 }}>
                {lang === "en" ? "Home" : "Accueil"}
              </button>
              <span style={{ color: COLORS.textMuted, margin: "0 8px", fontSize: 13 }}>/</span>
              <button onClick={() => onNavigate("blog")} style={{ background: "none", border: "none", color: COLORS.orange, cursor: "pointer", fontSize: 13, fontFamily: "'Inter', sans-serif", padding: 0 }}>
                Blog
              </button>
              <span style={{ color: COLORS.textMuted, margin: "0 8px", fontSize: 13 }}>/</span>
              <span style={{ color: COLORS.textMuted, fontSize: 13 }}>{post.title[lang]}</span>
            </nav>

            <header style={{ marginBottom: 28 }}>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 28, color: COLORS.textPrimary, lineHeight: 1.3, marginBottom: 10 }}>
                {post.title[lang]}
              </h1>
              <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 20 }}>
                {new Date(post.date + "T00:00:00").toLocaleDateString(lang === "en" ? "en-CA" : "fr-CA", { year: "numeric", month: "long", day: "numeric" })}
              </div>
              {post.image && (
                <img src={post.image} alt={post.imageAlt?.[lang] || ""} style={{ width: "100%", height: 320, objectFit: "cover", borderRadius: 12, display: "block" }} />
              )}
            </header>

            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: marked(post.content[lang]) }}
            />

            <div style={{ marginTop: 40, paddingTop: 24, borderTop: `1px solid ${COLORS.cardBorder}` }}>
              <button onClick={() => onNavigate("blog")} style={{ background: COLORS.orange, border: "none", borderRadius: 8, padding: "12px 24px", color: "#fff", fontWeight: 600, fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", cursor: "pointer" }}>
                ← {lang === "en" ? "All Articles" : "Tous les articles"}
              </button>
            </div>
          </article>
        ) : (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 700 }}>
                  {lang === "en" ? "Bitcoin Blog for Canadians" : "Blog Bitcoin pour les Canadiens"}
                </h1>
                <CanadaFlag size={24} />
              </div>
              <p style={{ color: COLORS.textSub, fontSize: 14 }}>
                {lang === "en"
                  ? "Educational articles about buying, storing, and understanding Bitcoin in Canada."
                  : "Articles éducatifs sur l'achat, le stockage et la compréhension du Bitcoin au Canada."}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {blogPosts.map(p => (
                <article key={p.slug} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, overflow: "hidden", transition: "border-color 0.2s" }}>
                  {p.image && (
                    <button onClick={() => onNavigate(`blog/${p.slug}`)} style={{ display: "block", width: "100%", background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                      <img src={p.image} alt={p.imageAlt?.[lang] || ""} loading="lazy" style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
                    </button>
                  )}
                  <div style={{ padding: "20px 28px 24px" }}>
                    <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>
                      {new Date(p.date + "T00:00:00").toLocaleDateString(lang === "en" ? "en-CA" : "fr-CA", { year: "numeric", month: "long", day: "numeric" })}
                    </div>
                    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 18, color: COLORS.textPrimary, marginBottom: 8, lineHeight: 1.3 }}>
                      <button onClick={() => onNavigate(`blog/${p.slug}`)} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontFamily: "inherit", fontWeight: "inherit", fontSize: "inherit", padding: 0, textAlign: "left", lineHeight: "inherit" }}>
                        {p.title[lang]}
                      </button>
                    </h2>
                    <p style={{ fontSize: 14, color: COLORS.textSub, lineHeight: 1.6, marginBottom: 12 }}>
                      {p.description[lang]}
                    </p>
                    <button onClick={() => onNavigate(`blog/${p.slug}`)} style={{ background: "none", border: "none", color: COLORS.orange, cursor: "pointer", fontSize: 13, fontWeight: 500, fontFamily: "'Inter', sans-serif", padding: 0, textDecoration: "underline" }}>
                      {lang === "en" ? "Read article" : "Lire l'article"} →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer style={{ borderTop: `1px solid ${COLORS.cardBorder}`, padding: "28px 24px", background: COLORS.card, marginTop: 40 }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: COLORS.textMuted, fontSize: 14 }}>BTCPLANNER.CA</span>
            <CanadaFlag size={14} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 12, flexWrap: "wrap" }}>
            {[
              { label: lang === "en" ? "Terms of Use" : "Conditions d'utilisation", page: "terms" },
              { label: lang === "en" ? "Privacy Policy" : "Politique de confidentialité", page: "privacy" },
            ].map(link => (
              <button key={link.label} onClick={() => onNavigate(link.page)} style={{ background: "none", border: "none", color: COLORS.textMuted, fontSize: 12, cursor: "pointer", textDecoration: "underline", textDecorationColor: COLORS.cardBorder, fontFamily: "'Inter', sans-serif", padding: 0 }}>
                {link.label}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: COLORS.textMuted, textAlign: "center", lineHeight: 1.6 }}>
            {lang === "en"
              ? "btcplanner.ca is for educational purposes only — not financial advice."
              : "btcplanner.ca est à des fins éducatives uniquement — pas un conseil financier."}
          </div>
        </div>
      </footer>
    </div>
  );
}
