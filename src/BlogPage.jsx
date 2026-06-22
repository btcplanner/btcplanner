import { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import { blogPosts } from "./blogPosts.js";
import { getAbTitle } from "./abtest.js";

function estimateReadingTime(markdown, lang) {
  const text = markdown.replace(/[#*\[\]()_`>|\\-]/g, "").replace(/\s+/g, " ");
  const words = text.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return lang === "fr" ? `${mins} min de lecture` : `${mins} min read`;
}

function ShareButtons({ url, title, lang }) {
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <a href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#1DA1F2", color: "#fff", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>X / Twitter</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#1877F2", color: "#fff", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>Facebook</a>
      <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#0A66C2", color: "#fff", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>LinkedIn</a>
      <button onClick={() => { navigator.clipboard.writeText(url); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#6B7280", color: "#fff", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer" }}>{lang === "fr" ? "Copier le lien" : "Copy link"}</button>
    </div>
  );
}

function NewsletterSignup({ lang, colors }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      try { const subs = JSON.parse(localStorage.getItem("btcplanner_newsletter") || "[]"); subs.push({ email, ts: Date.now() }); localStorage.setItem("btcplanner_newsletter", JSON.stringify(subs)); } catch {}
      setSubmitted(true);
    }
  };
  if (submitted) return (
    <div style={{ background: colors.orangeLight, border: `1px solid ${colors.orange}44`, borderRadius: 14, padding: "24px 28px", textAlign: "center" }}>
      <div style={{ fontSize: 20, marginBottom: 8 }}>&#10003;</div>
      <div style={{ fontWeight: 600, fontSize: 15, color: colors.textPrimary }}>{lang === "fr" ? "Merci ! Vous êtes inscrit." : "Thanks! You're subscribed."}</div>
    </div>
  );
  return (
    <div style={{ background: `linear-gradient(135deg, ${colors.orangeLight} 0%, #fff 100%)`, border: `1px solid ${colors.orange}33`, borderRadius: 14, padding: "24px 28px" }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, color: colors.textPrimary, marginBottom: 6 }}>
        {lang === "fr" ? "Restez informé sur le Bitcoin au Canada" : "Stay Updated on Bitcoin in Canada"}
      </div>
      <p style={{ fontSize: 13, color: colors.textSub, marginBottom: 14, lineHeight: 1.5 }}>
        {lang === "fr" ? "Recevez les derniers articles et alertes de prix directement." : "Get the latest articles and price alerts delivered to you."}
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={lang === "fr" ? "Votre courriel" : "Your email"} required
          style={{ flex: 1, background: "#fff", border: `1px solid ${colors.cardBorder}`, borderRadius: 10, padding: "10px 14px", color: colors.textPrimary, fontSize: 14, fontFamily: "'Inter', sans-serif" }} />
        <button type="submit" style={{ background: colors.gradient, border: "none", borderRadius: 10, padding: "10px 20px", color: "#fff", fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif", cursor: "pointer", boxShadow: "0 2px 6px rgba(247,147,26,0.25)", whiteSpace: "nowrap" }}>
          {lang === "fr" ? "S'abonner" : "Subscribe"}
        </button>
      </form>
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" style={{ position: "fixed", bottom: 24, right: 24, width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #F7931A 0%, #FFC107 100%)", color: "#fff", border: "none", fontSize: 20, cursor: "pointer", boxShadow: "0 4px 12px rgba(247,147,26,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
      ↑
    </button>
  );
}

const COLORS = {
  bg: "#FAFAFA",
  card: "#FFFFFF",
  cardBorder: "#E5E7EB",
  orange: "#F7931A",
  orangeHover: "#E8850F",
  orangeLight: "#FFF7ED",
  textPrimary: "#111111",
  textMuted: "#6B7280",
  textSub: "#4B5563",
  shadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
  shadowHover: "0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
  gradient: "linear-gradient(135deg, #F7931A 0%, #FFC107 100%)",
  headerBg: "linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)",
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

  const [searchQuery, setSearchQuery] = useState("");
  const post = slug ? blogPosts.find(p => p.slug === slug) : null;
  const filteredPosts = searchQuery.trim()
    ? blogPosts.filter(p => {
        const q = searchQuery.toLowerCase();
        return p.title[lang].toLowerCase().includes(q) || p.description[lang].toLowerCase().includes(q);
      })
    : blogPosts;

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
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        a { transition: color 0.2s, opacity 0.2s; }
        a:hover { opacity: 0.85; }
        button { transition: all 0.2s ease; cursor: pointer; }
        button:hover { transform: translateY(-1px); }
        button:active { transform: translateY(0); }
        :focus-visible { outline: 2px solid ${COLORS.orange}; outline-offset: 2px; }
        .card-hover { transition: box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease; }
        .card-hover:hover { box-shadow: ${COLORS.shadowHover}; transform: translateY(-2px); border-color: ${COLORS.orange}33; }
        .blog-content h2 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 22px; color: ${COLORS.textPrimary}; margin: 32px 0 14px; padding-bottom: 10px; border-bottom: 3px solid ${COLORS.orange}; }
        .blog-content h3 { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 17px; color: ${COLORS.textPrimary}; margin: 28px 0 12px; }
        .blog-content p { font-size: 15px; color: ${COLORS.textSub}; line-height: 1.85; margin-bottom: 16px; }
        .blog-content ul, .blog-content ol { padding-left: 24px; margin-bottom: 16px; }
        .blog-content li { font-size: 15px; color: ${COLORS.textSub}; line-height: 1.85; margin-bottom: 8px; }
        .blog-content strong { color: ${COLORS.textPrimary}; }
        .blog-content a { color: ${COLORS.orange}; text-decoration: underline; text-underline-offset: 2px; }
        .blog-content a:hover { color: ${COLORS.orangeHover}; }
        .blog-content table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; border-radius: 10px; overflow: hidden; box-shadow: ${COLORS.shadow}; }
        .blog-content th { background: ${COLORS.orangeLight}; color: ${COLORS.textPrimary}; font-weight: 600; padding: 12px 14px; text-align: left; border: 1px solid ${COLORS.cardBorder}; }
        .blog-content td { padding: 12px 14px; border: 1px solid ${COLORS.cardBorder}; color: ${COLORS.textSub}; }
        .blog-content tr:nth-child(even) td { background: ${COLORS.card}; }
        .blog-content blockquote { border-left: 4px solid ${COLORS.orange}; padding: 12px 20px; margin: 16px 0; background: ${COLORS.orangeLight}; border-radius: 0 10px 10px 0; }
        @media (max-width: 640px) {
          .mobile-stack { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <header style={{ borderBottom: `1px solid ${COLORS.cardBorder}`, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: COLORS.headerBg, backdropFilter: "blur(8px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => onNavigate("home")} style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: COLORS.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0, boxShadow: "0 2px 8px rgba(247,147,26,0.3)" }} aria-hidden="true">₿</div>
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

      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10, padding: "8px 24px", background: "#fff", borderBottom: `1px solid ${COLORS.cardBorder}` }}>
        <button onClick={() => onNavigate("home")} style={{ background: COLORS.gradient, border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: "'Inter', sans-serif", boxShadow: "0 2px 6px rgba(247,147,26,0.25)" }}>
          ← {lang === "en" ? "Home" : "Accueil"}
        </button>
        <button onClick={toggleLang} aria-label={lang === "en" ? "Passer au français" : "Switch to English"} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 500, color: COLORS.textSub, cursor: "pointer", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
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

            <header style={{ marginBottom: 32, animation: "fadeIn 0.5s ease" }}>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 30, color: COLORS.textPrimary, lineHeight: 1.3, marginBottom: 12 }}>
                {post.title[lang]}
              </h1>
              <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 22, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.orange, display: "inline-block" }} aria-hidden="true" />
                  {new Date(post.date + "T00:00:00").toLocaleDateString(lang === "en" ? "en-CA" : "fr-CA", { year: "numeric", month: "long", day: "numeric" })}
                </span>
                <span style={{ color: COLORS.cardBorder }}>|</span>
                <span>{estimateReadingTime(post.content[lang], lang)}</span>
              </div>
              {post.image && (
                <img src={post.image} alt={post.imageAlt?.[lang] || ""} style={{ width: "100%", height: 340, objectFit: "cover", borderRadius: 14, display: "block", boxShadow: COLORS.shadow }} />
              )}
            </header>

            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: marked(post.content[lang]) }}
            />

            <div style={{ marginTop: 36, paddingTop: 24, borderTop: `1px solid ${COLORS.cardBorder}` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textSub, marginBottom: 10 }}>{lang === "fr" ? "Partager cet article" : "Share this article"}</div>
              <ShareButtons url={`https://btcplanner.ca/blog/${post.slug}`} title={post.title[lang]} lang={lang} />
            </div>

            <div style={{ marginTop: 32 }}>
              <NewsletterSignup lang={lang} colors={COLORS} />
            </div>

            {(() => {
              const related = blogPosts.filter(p => p.slug !== post.slug).slice(0, 3);
              return related.length > 0 && (
                <div style={{ marginTop: 36 }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 17, marginBottom: 16, color: COLORS.textPrimary }}>{lang === "fr" ? "Articles connexes" : "Related Articles"}</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
                    {related.map(r => (
                      <article key={r.slug} className="card-hover" style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, overflow: "hidden", boxShadow: COLORS.shadow }}>
                        {r.image && (
                          <button onClick={() => onNavigate(`blog/${r.slug}`)} style={{ display: "block", width: "100%", background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                            <img src={r.image} alt={r.imageAlt?.[lang] || ""} loading="lazy" style={{ width: "100%", height: 110, objectFit: "cover", display: "block" }} />
                          </button>
                        )}
                        <div style={{ padding: "12px 14px 14px" }}>
                          <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, lineHeight: 1.35, marginBottom: 6, color: COLORS.textPrimary }}>
                            <button onClick={() => onNavigate(`blog/${r.slug}`)} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontFamily: "inherit", fontWeight: "inherit", fontSize: "inherit", padding: 0, textAlign: "left", lineHeight: "inherit" }}>
                              {r.title[lang]}
                            </button>
                          </h4>
                          <span style={{ fontSize: 11, color: COLORS.textMuted }}>{estimateReadingTime(r.content[lang], lang)}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })()}

            <div style={{ marginTop: 36, paddingTop: 28, borderTop: `2px solid ${COLORS.cardBorder}`, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => onNavigate("blog")} style={{ background: COLORS.gradient, border: "none", borderRadius: 10, padding: "12px 28px", color: "#fff", fontWeight: 600, fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", cursor: "pointer", boxShadow: "0 2px 8px rgba(247,147,26,0.25)" }}>
                ← {lang === "en" ? "All Articles" : "Tous les articles"}
              </button>
            </div>
          </article>
        ) : (
          <div>
            <div style={{ marginBottom: 32, animation: "fadeIn 0.5s ease" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, background: COLORS.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {lang === "en" ? "Bitcoin Blog for Canadians" : "Blog Bitcoin pour les Canadiens"}
                </h1>
                <CanadaFlag size={24} />
              </div>
              <p style={{ color: COLORS.textSub, fontSize: 15, lineHeight: 1.6 }}>
                {lang === "en"
                  ? "Educational articles about buying, storing, and understanding Bitcoin in Canada."
                  : "Articles éducatifs sur l'achat, le stockage et la compréhension du Bitcoin au Canada."}
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder={lang === "fr" ? "Rechercher des articles..." : "Search articles..."}
                style={{ width: "100%", maxWidth: 400, background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, padding: "10px 16px", color: COLORS.textPrimary, fontSize: 14, fontFamily: "'Inter', sans-serif", boxShadow: COLORS.shadow }} />
              {searchQuery.trim() && (
                <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 8 }}>
                  {filteredPosts.length} {lang === "fr" ? "résultat(s)" : "result(s)"}
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {filteredPosts.map(p => (
                <article key={p.slug} className="card-hover" style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 14, overflow: "hidden", boxShadow: COLORS.shadow }}>
                  {p.image && (
                    <button onClick={() => onNavigate(`blog/${p.slug}`)} style={{ display: "block", width: "100%", background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                      <img src={p.image} alt={p.imageAlt?.[lang] || ""} loading="lazy" style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
                    </button>
                  )}
                  <div style={{ padding: "22px 28px 26px" }}>
                    <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 10, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: COLORS.orange, display: "inline-block" }} aria-hidden="true" />
                        {new Date(p.date + "T00:00:00").toLocaleDateString(lang === "en" ? "en-CA" : "fr-CA", { year: "numeric", month: "long", day: "numeric" })}
                      </span>
                      <span style={{ color: COLORS.cardBorder }}>|</span>
                      <span>{estimateReadingTime(p.content[lang], lang)}</span>
                    </div>
                    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 19, color: COLORS.textPrimary, marginBottom: 10, lineHeight: 1.35 }}>
                      <button onClick={() => onNavigate(`blog/${p.slug}`)} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontFamily: "inherit", fontWeight: "inherit", fontSize: "inherit", padding: 0, textAlign: "left", lineHeight: "inherit" }}>
                        {p.title[lang]}
                      </button>
                    </h2>
                    <p style={{ fontSize: 14, color: COLORS.textSub, lineHeight: 1.7, marginBottom: 14 }}>
                      {p.description[lang]}
                    </p>
                    <button onClick={() => onNavigate(`blog/${p.slug}`)} style={{ background: COLORS.orangeLight, border: `1px solid ${COLORS.orange}33`, borderRadius: 8, color: COLORS.orange, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Inter', sans-serif", padding: "6px 14px" }}>
                      {lang === "en" ? "Read article" : "Lire l'article"} →
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div style={{ marginTop: 32 }}>
              <NewsletterSignup lang={lang} colors={COLORS} />
            </div>
          </div>
        )}
      </main>

      <BackToTop />

      <footer style={{ borderTop: `1px solid ${COLORS.cardBorder}`, padding: "36px 24px 28px", background: COLORS.headerBg, marginTop: 48 }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: COLORS.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }} aria-hidden="true">₿</div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: COLORS.textSub, fontSize: 14, letterSpacing: "-0.2px" }}>BTCPLANNER.CA</span>
            <CanadaFlag size={14} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginBottom: 16, flexWrap: "wrap" }}>
            {[
              { label: lang === "en" ? "Terms of Use" : "Conditions d'utilisation", page: "terms" },
              { label: lang === "en" ? "Privacy Policy" : "Politique de confidentialité", page: "privacy" },
            ].map(link => (
              <button key={link.label} onClick={() => onNavigate(link.page)} style={{ background: "none", border: "none", color: COLORS.textMuted, fontSize: 12, cursor: "pointer", fontFamily: "'Inter', sans-serif", padding: "4px 0", fontWeight: 500, transition: "color 0.2s" }}>
                {link.label}
              </button>
            ))}
          </div>
          <div style={{ width: 40, height: 2, background: COLORS.gradient, margin: "0 auto 14px", borderRadius: 1 }} aria-hidden="true" />
          <div style={{ fontSize: 11, color: COLORS.textMuted, textAlign: "center", lineHeight: 1.7 }}>
            {lang === "en"
              ? "btcplanner.ca is for educational purposes only — not financial advice."
              : "btcplanner.ca est à des fins éducatives uniquement — pas un conseil financier."}
          </div>
        </div>
      </footer>
    </div>
  );
}
