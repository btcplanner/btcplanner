const COLORS = {
  bg: "#0A0F1E",
  card: "#111827",
  cardBorder: "#1E2A3B",
  orange: "#F7931A",
  green: "#10B981",
  maple: "#FF0000",
  textPrimary: "#F5F5F0",
  textMuted: "#6B7280",
  textSub: "#9CA3AF",
};

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
        fontSize: 18, color: COLORS.textPrimary, marginBottom: 12,
        paddingBottom: 8, borderBottom: `2px solid ${COLORS.orange}`,
      }}>
        {title}
      </div>
      {children}
    </div>
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
    <div style={{
      background: "#1a0a00", border: `1px solid ${COLORS.orange}`,
      borderLeft: `4px solid ${COLORS.orange}`, borderRadius: 8,
      padding: "14px 18px", marginBottom: 20, fontSize: 13,
      color: "#D1D5DB", lineHeight: 1.7,
    }}>
      {children}
    </div>
  );
}

function InfoBox({ children }) {
  return (
    <div style={{
      background: "#0a1628", border: "1px solid #3B82F6",
      borderLeft: "4px solid #3B82F6", borderRadius: 8,
      padding: "14px 18px", marginBottom: 20, fontSize: 13,
      color: "#D1D5DB", lineHeight: 1.7,
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

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${COLORS.cardBorder}`, padding: "14px 24px", background: "#080D1A", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: COLORS.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>₿</div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, color: COLORS.textPrimary }}>BTC PLANNER</span>
        </div>
        <button onClick={onBack} style={{ background: COLORS.orange, border: "none", borderRadius: 8, padding: "8px 16px", color: "#000", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
          ← Back to App
        </button>
      </div>

      {/* Page title */}
      <div style={{ background: "#080D1A", borderBottom: `1px solid ${COLORS.cardBorder}`, padding: "32px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 700, marginBottom: 8 }}>Terms of Use & Disclaimer</div>
          <div style={{ fontSize: 13, color: COLORS.textMuted }}>Effective Date: {today} · btcplanner.ca · Vancouver, BC, Canada</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "36px 24px" }}>

        <WarnBox>
          <strong style={{ color: COLORS.orange }}>⚠️ Important Risk Warning: </strong>
          Cryptocurrency investments are highly speculative and volatile. You could lose some or all of your invested capital. Nothing on this website constitutes financial, investment, legal, or tax advice. Always consult a qualified financial advisor before making any investment decisions.
        </WarnBox>

        <Section title="1. Acceptance of Terms">
          <P>By accessing or using btcplanner.ca (the "Site"), its tools, calculators, AI chat features, educational content, or any related services (collectively, the "Services"), you agree to be bound by these Terms of Use. If you do not agree, you must immediately stop using the Site.</P>
          <P>These Terms constitute a legally binding agreement between you and BTC Planner. We reserve the right to modify these Terms at any time. Continued use of the Site following any changes constitutes your acceptance of the revised Terms.</P>
        </Section>

        <Section title="2. Not Financial Advice — Educational Purposes Only">
          <P><Strong>ALL content on btcplanner.ca</Strong> — including articles, tools, calculators, AI chatbot responses, price data, DCA projections, and affiliate recommendations — is provided for <Strong>informational and educational purposes only</Strong>. Nothing on this Site constitutes:</P>
          <ul style={{ marginBottom: 12 }}>
            <B>Financial advice or investment advice of any kind</B>
            <B>A recommendation to buy, sell, hold, or trade Bitcoin or any cryptocurrency</B>
            <B>Legal, tax, or accounting advice</B>
            <B>A solicitation or offer to buy or sell any security or investment product</B>
            <B>An endorsement of any particular investment strategy</B>
          </ul>
          <P><Strong>No Advisor Relationship.</Strong> BTC Planner is not a registered investment advisor, portfolio manager, financial planner, or securities dealer under any applicable Canadian provincial or federal securities legislation, including the Securities Act (British Columbia) or the Securities Act (Ontario). Your use of this Site does not create an advisor-client or fiduciary relationship.</P>
          <P><Strong>AI Chat Disclaimer.</Strong> The AI chat assistant is an automated educational tool. Its responses may contain errors, do not constitute professional advice, and should not be the basis for any financial decision. Always verify AI-generated information with qualified professionals.</P>
        </Section>

        <Section title="3. Cryptocurrency Risk Warning">
          <P>Before using any information on this Site, you should carefully consider the following risks:</P>
          <ul style={{ marginBottom: 12 }}>
            <B><Strong>Total Loss of Capital:</Strong> The value of Bitcoin can decrease to zero. You may lose your entire investment.</B>
            <B><Strong>Extreme Volatility:</Strong> Bitcoin prices can fluctuate dramatically in very short timeframes.</B>
            <B><Strong>No Government Protection:</Strong> Bitcoin is not insured or guaranteed by CDIC, FCAC, or any Canadian government body.</B>
            <B><Strong>Regulatory Risk:</Strong> The regulatory environment for crypto in Canada is evolving and may change adversely.</B>
            <B><Strong>Security Risk:</Strong> Cryptocurrency can be permanently lost due to hacking, theft, or loss of private keys. There is no recourse to recover lost funds.</B>
            <B><Strong>Tax Risk:</Strong> CRA treatment of cryptocurrency may change. Consult a qualified Canadian tax professional.</B>
            <B><Strong>Past Performance:</Strong> Historical Bitcoin price data shown on this Site is not indicative of future results.</B>
          </ul>
        </Section>

        <Section title="4. DCA Calculator & Projections Disclaimer">
          <P>The DCA calculator and projected return figures on this Site are based on historical data and mathematical modeling only. These projections are hypothetical, illustrative, and do not account for taxes, fees, or other costs. They are not predictions or guarantees of future returns.</P>
        </Section>

        <Section title="5. Affiliate Disclosure">
          <P>BTC Planner participates in affiliate marketing programs. We may receive financial compensation when you sign up for products or services through links on this Site. Affiliate commissions are earned at no additional cost to you. Our financial interest in commissions may influence which products are featured. We only recommend services we genuinely believe are reputable.</P>
        </Section>

        <Section title="6. Third-Party Content & Links">
          <P>This Site contains links to third-party websites, exchanges, and services. BTC Planner does not control, endorse, or assume responsibility for any third-party content. Real-time price data is sourced from CoinGecko and alternative.me APIs and is provided "as is" — do not make financial decisions based solely on this data.</P>
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
          <Strong>By using btcplanner.ca you acknowledge that you have read, understood, and agreed to these Terms. You accept that all content is for educational purposes only and does not constitute financial advice. You understand that cryptocurrency investments carry significant risk including total loss of capital.</Strong>
        </WarnBox>

        <div style={{ fontSize: 12, color: COLORS.textMuted, textAlign: "center", marginTop: 24 }}>
          Last updated: {today} · <a href="#" onClick={onBack} style={{ color: COLORS.orange, textDecoration: "none" }}>Return to btcplanner.ca</a>
        </div>
      </div>
    </div>
  );
}
