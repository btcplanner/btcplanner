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

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 36 }} aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()}>
      <h2 id={title.replace(/\s+/g, "-").toLowerCase()} style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
        fontSize: 18, color: COLORS.textPrimary, marginBottom: 12,
        paddingBottom: 8, borderBottom: `2px solid ${COLORS.orange}`,
      }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children }) {
  return <p style={{ fontSize: 14, color: COLORS.textSub, lineHeight: 1.8, marginBottom: 10 }}>{children}</p>;
}

function B({ children }) {
  return <li style={{ fontSize: 14, color: COLORS.textSub, lineHeight: 1.8, marginBottom: 6, marginLeft: 20 }}>{children}</li>;
}

function Strong({ children }) {
  return <strong style={{ color: COLORS.textPrimary }}>{children}</strong>;
}

function WarnBox({ children }) {
  return (
    <div role="alert" style={{
      background: COLORS.orangeLight, border: `1px solid ${COLORS.orange}`,
      borderLeft: `4px solid ${COLORS.orange}`, borderRadius: 8,
      padding: "14px 18px", marginBottom: 20, fontSize: 13,
      color: COLORS.textSub, lineHeight: 1.7,
    }}>
      {children}
    </div>
  );
}

const today = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });

export default function TermsPage({ onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.textPrimary, fontFamily: "'Inter', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } ul { padding-left: 0; list-style: disc; }`}</style>

      <header style={{ borderBottom: `1px solid ${COLORS.cardBorder}`, padding: "14px 24px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: COLORS.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }} aria-hidden="true">₿</div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, color: COLORS.textPrimary }}>BTCPLANNER.CA</span>
        </div>
        <button onClick={onBack} aria-label="Return to main site" style={{ background: COLORS.orange, border: "none", borderRadius: 8, padding: "8px 16px", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
          ← Back
        </button>
      </header>

      <div style={{ background: "#fff", borderBottom: `1px solid ${COLORS.cardBorder}`, padding: "32px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 8, color: COLORS.textPrimary }}>Terms of Use & Disclaimer</h1>
          <p style={{ fontSize: 13, color: COLORS.textMuted }}>Effective Date: {today} · btcplanner.ca · Vancouver, BC, Canada</p>
        </div>
      </div>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "36px 24px" }}>

        <WarnBox>
          <Strong>Risk Warning: </Strong>
          Cryptocurrency investments are speculative and volatile. You could lose some or all of your invested capital. Nothing on this website constitutes financial, investment, legal, or tax advice. Consult a qualified financial advisor before making investment decisions.
        </WarnBox>

        <Section title="1. Acceptance of Terms">
          <P>By accessing or using btcplanner.ca (the "Site"), its tools, calculators, AI chat features, educational content, or any related services (collectively, the "Services"), you agree to be bound by these Terms of Use. If you do not agree, you must immediately stop using the Site.</P>
          <P>These Terms constitute a legally binding agreement between you and BTC Planner. We reserve the right to modify these Terms at any time. Continued use of the Site following any changes constitutes your acceptance of the revised Terms.</P>
        </Section>

        <Section title="2. Educational Purposes Only">
          <P><Strong>All content on btcplanner.ca</Strong> — including articles, tools, calculators, AI chatbot responses, price data, DCA projections, and affiliate recommendations — is provided for <Strong>informational and educational purposes only</Strong>. Nothing on this Site constitutes:</P>
          <ul style={{ marginBottom: 12 }}>
            <B>Financial advice or investment advice of any kind</B>
            <B>A recommendation to buy, sell, hold, or trade Bitcoin or any cryptocurrency</B>
            <B>Legal, tax, or accounting advice</B>
            <B>A solicitation or offer to buy or sell any security or investment product</B>
            <B>An endorsement of any particular investment strategy</B>
          </ul>
          <P><Strong>No Advisor Relationship.</Strong> BTC Planner is not a registered investment advisor, portfolio manager, financial planner, or securities dealer under any applicable Canadian provincial or federal securities legislation. Your use of this Site does not create an advisor-client or fiduciary relationship.</P>
          <P><Strong>AI Chat Disclaimer.</Strong> The AI chat assistant is an automated educational tool. Its responses may contain errors, do not constitute professional advice, and should not be the basis for any financial decision. Verify AI-generated information with qualified professionals.</P>
        </Section>

        <Section title="3. Cryptocurrency Risk Factors">
          <P>Before using any information on this Site, consider the following risks:</P>
          <ul style={{ marginBottom: 12 }}>
            <B><Strong>Loss of Capital:</Strong> The value of Bitcoin can decrease significantly. You may lose your entire investment.</B>
            <B><Strong>Volatility:</Strong> Bitcoin prices can fluctuate substantially in short timeframes.</B>
            <B><Strong>No Government Protection:</Strong> Bitcoin is not insured or guaranteed by CDIC, FCAC, or any Canadian government body.</B>
            <B><Strong>Regulatory Risk:</Strong> The regulatory environment for cryptocurrency in Canada is evolving and may change.</B>
            <B><Strong>Security Risk:</Strong> Cryptocurrency can be permanently lost due to hacking, theft, or loss of private keys. There is no recourse to recover lost funds.</B>
            <B><Strong>Tax Implications:</Strong> CRA treatment of cryptocurrency may change. Consult a qualified Canadian tax professional.</B>
            <B><Strong>Past Performance:</Strong> Historical Bitcoin price data shown on this Site is not indicative of future results.</B>
          </ul>
        </Section>

        <Section title="4. DCA Calculator & Projections">
          <P>The DCA calculator and projected return figures on this Site are based on historical data and mathematical modeling only. These projections are hypothetical, illustrative, and do not account for taxes, fees, or other costs. They are not predictions or guarantees of future returns.</P>
        </Section>

        <Section title="5. Affiliate Disclosure">
          <P>BTC Planner participates in affiliate marketing programs. We may receive financial compensation when you sign up for products or services through links on this Site. Affiliate commissions are earned at no additional cost to you. Our financial interest in commissions may influence which products are featured.</P>
        </Section>

        <Section title="6. Third-Party Content & Links">
          <P>This Site contains links to third-party websites, exchanges, and services. BTC Planner does not control, endorse, or assume responsibility for any third-party content. Real-time price data is sourced from CoinGecko and alternative.me APIs and is provided "as is."</P>
        </Section>

        <Section title="7. Limitation of Liability">
          <P>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE CANADIAN LAW, BTC PLANNER SHALL NOT BE LIABLE FOR any direct, indirect, incidental, special, or consequential damages; any financial losses; any decisions made in reliance on Site content; or any inaccuracies in AI chatbot responses or calculator outputs.</P>
        </Section>

        <Section title="8. Indemnification">
          <P>You agree to indemnify and hold harmless BTC Planner and its operators from any claims, liabilities, damages, or expenses arising out of your use of the Site, violation of these Terms, or any investment decisions you make based on Site content.</P>
        </Section>

        <Section title="9. Governing Law">
          <P>These Terms are governed by the laws of British Columbia and the federal laws of Canada. Any disputes shall be subject to the exclusive jurisdiction of the courts of British Columbia, Canada.</P>
        </Section>

        <Section title="10. Eligibility">
          <P>This Site is intended for users 18 years of age or older. By using the Site, you confirm you are at least 18 years old.</P>
        </Section>

        <Section title="11. Contact">
          <P>Questions about these Terms? Contact us at <Strong>hello@btcplanner.ca</Strong></P>
          <P>BTC Planner · Vancouver, British Columbia, Canada · btcplanner.ca</P>
        </Section>

        <WarnBox>
          <Strong>By using btcplanner.ca you acknowledge that you have read, understood, and agreed to these Terms. You accept that all content is for educational purposes only and does not constitute financial advice. You understand that cryptocurrency investments carry risk including loss of capital.</Strong>
        </WarnBox>

        <div style={{ fontSize: 12, color: COLORS.textMuted, textAlign: "center", marginTop: 24 }}>
          Last updated: {today} · <button onClick={onBack} style={{ background: "none", border: "none", color: COLORS.orange, cursor: "pointer", fontSize: 12, fontFamily: "'Inter', sans-serif", textDecoration: "underline", padding: 0 }}>Return to btcplanner.ca</button>
        </div>
      </main>
    </div>
  );
}
