const COLORS = {
  bg: "#0A0F1E",
  card: "#111827",
  cardBorder: "#1E2A3B",
  orange: "#F7931A",
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

function SubSection({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.orange, marginBottom: 8 }}>{title}</div>
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

function GreenBox({ children }) {
  return (
    <div style={{
      background: "#061a10", border: "1px solid #10B981",
      borderLeft: "4px solid #10B981", borderRadius: 8,
      padding: "14px 18px", marginBottom: 20, fontSize: 13,
      color: "#D1D5DB", lineHeight: 1.7,
    }}>
      {children}
    </div>
  );
}

const today = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });

export default function PrivacyPage({ onBack }) {
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
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 700, marginBottom: 8 }}>Privacy Policy</div>
          <div style={{ fontSize: 13, color: COLORS.textMuted }}>Effective Date: {today} · Last Updated: {today} · btcplanner.ca</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "36px 24px" }}>

        <InfoBox>
          <Strong>At BTC Planner, we take your privacy seriously.</Strong> This policy explains what we collect, how we use it, and your rights. The short version: we collect minimal data, we don't sell it, and you can ask us to delete it at any time.
        </InfoBox>

        <Section title="1. Who We Are">
          <P>BTC Planner operates btcplanner.ca, a Bitcoin education and planning resource for Canadians, based in Vancouver, British Columbia, Canada.</P>
          <P>For privacy-related questions or requests, contact our Privacy Officer at <Strong>hello@btcplanner.ca</Strong></P>
        </Section>

        <Section title="2. Information We Collect">
          <SubSection title="2.1 Information You Provide Directly">
            <P>We may collect information you voluntarily provide:</P>
            <ul style={{ marginBottom: 12 }}>
              <B>Email address — if you subscribe to our newsletter or contact us</B>
              <B>Name — if provided when contacting us</B>
              <B>Messages — submitted through contact forms or AI chat</B>
            </ul>
            <P>You can browse all content and use most tools without providing any personal information.</P>
          </SubSection>

          <SubSection title="2.2 Information Collected Automatically">
            <P>When you visit btcplanner.ca, certain information is collected automatically:</P>
            <ul style={{ marginBottom: 12 }}>
              <B>IP address and general geographic location (country/city level)</B>
              <B>Browser type, version, and language</B>
              <B>Device type and operating system</B>
              <B>Pages visited, time on page, and navigation paths</B>
              <B>Referring website and affiliate links clicked</B>
              <B>Date and time of your visit</B>
            </ul>
          </SubSection>

          <SubSection title="2.3 AI Chat Data">
            <P>If you use our AI chat assistant:</P>
            <ul style={{ marginBottom: 12 }}>
              <B>Your messages are transmitted to Anthropic (our AI provider) to generate responses</B>
              <B>Do not share sensitive information, financial account details, passwords, or private keys in chat</B>
              <B>Chat conversations may be processed by Anthropic per their privacy policy at anthropic.com/privacy</B>
              <B>We do not permanently store your chat history on our servers</B>
            </ul>
          </SubSection>

          <SubSection title="2.4 What We Do NOT Collect">
            <GreenBox>
              We do not collect Bitcoin wallet addresses, private keys, financial account details, banking information, credit card numbers, or government identification numbers.
            </GreenBox>
          </SubSection>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul style={{ marginBottom: 12 }}>
            <B>To provide, operate, and improve the Site and its features</B>
            <B>To understand how visitors use our Site (analytics)</B>
            <B>To send newsletters — only if you have opted in</B>
            <B>To respond to your questions or support requests</B>
            <B>To track affiliate link clicks for commission reporting</B>
            <B>To detect and prevent fraud or security incidents</B>
            <B>To comply with applicable Canadian laws and regulations</B>
          </ul>
          <P>We do not use your information for automated decision-making that produces significant legal effects on you.</P>
        </Section>

        <Section title="4. Legal Basis (PIPEDA)">
          <P>BTC Planner complies with Canada's <Strong>Personal Information Protection and Electronic Documents Act (PIPEDA)</Strong> and British Columbia's <Strong>Personal Information Protection Act (PIPA BC)</Strong>.</P>
          <P>We process your personal information based on: <Strong>consent</Strong> (for newsletters — withdrawable at any time), <Strong>legitimate interests</Strong> (for analytics and Site improvement), and <Strong>legal obligation</Strong> (where required by Canadian law).</P>
        </Section>

        <Section title="5. Cookies & Tracking">
          <SubSection title="5.1 Cookies We Use">
            <ul style={{ marginBottom: 12 }}>
              <B><Strong>Essential cookies:</Strong> Required for the Site to function (e.g. remembering your disclaimer acceptance). Cannot be disabled.</B>
              <B><Strong>Analytics cookies:</Strong> Google Analytics — anonymous usage data to help us improve the Site.</B>
              <B><Strong>Affiliate tracking cookies:</Strong> Placed when you click affiliate links so we can receive commissions.</B>
            </ul>
          </SubSection>
          <SubSection title="5.2 Managing Cookies">
            <P>You can control cookies through your browser settings. You can also opt out of Google Analytics at <Strong>tools.google.com/dlpage/gaoptout</Strong>. Disabling cookies may affect some Site functionality.</P>
          </SubSection>
        </Section>

        <Section title="6. Third-Party Services">
          <SubSection title="Google Analytics">
            <P>We use Google Analytics with IP anonymization enabled. Your full IP address is never stored. Opt out at tools.google.com/dlpage/gaoptout.</P>
          </SubSection>
          <SubSection title="Anthropic (AI Chat)">
            <P>Our AI chat is powered by Anthropic's Claude API. Messages you send are processed by Anthropic. Review their privacy policy at anthropic.com/privacy.</P>
          </SubSection>
          <SubSection title="Affiliate Partners">
            <P>When you click affiliate links (Shakepay, Newton, Ledger, Trezor, Swan Bitcoin, Kraken, etc.) you are redirected to third-party sites with their own privacy policies. We are not responsible for their data practices.</P>
          </SubSection>
          <SubSection title="Price Data APIs">
            <P>We use CoinGecko and alternative.me for market data. These are read-only calls — no personal information is shared with these services.</P>
          </SubSection>
          <GreenBox>
            <Strong>We do not sell, rent, trade, or transfer your personal information to third parties for their marketing purposes. Period.</Strong>
          </GreenBox>
        </Section>

        <Section title="7. Data Retention">
          <ul style={{ marginBottom: 12 }}>
            <B>Newsletter emails: Retained until you unsubscribe</B>
            <B>Contact form submissions: Up to 2 years for record-keeping</B>
            <B>Analytics data: 26 months (Google Analytics default), then auto-deleted</B>
            <B>AI chat data: Not stored on our servers; subject to Anthropic's retention policies</B>
            <B>Affiliate click data: Up to 90 days as required by affiliate programs</B>
          </ul>
        </Section>

        <Section title="8. Data Security">
          <P>We protect your information using HTTPS encryption, Cloudflare DDoS protection and Web Application Firewall, and secure access-controlled hosting. However, no internet transmission method is 100% secure.</P>
          <P>In the event of a data breach posing real risk of significant harm, we will notify you and the Office of the Privacy Commissioner of Canada as required by PIPEDA.</P>
        </Section>

        <Section title="9. Your Privacy Rights">
          <SubSection title="9.1 Under PIPEDA (Canadian Residents)">
            <ul style={{ marginBottom: 12 }}>
              <B><Strong>Right to Access:</Strong> Request a copy of the personal information we hold about you</B>
              <B><Strong>Right to Correction:</Strong> Request that inaccurate information be corrected</B>
              <B><Strong>Right to Withdraw Consent:</Strong> Withdraw consent for processing at any time</B>
              <B><Strong>Right to Complain:</Strong> File a complaint with the Office of the Privacy Commissioner at priv.gc.ca</B>
            </ul>
            <P>To exercise these rights, email <Strong>hello@btcplanner.ca</Strong>. We respond within 30 days.</P>
          </SubSection>
          <SubSection title="9.2 Under GDPR (EEA Residents)">
            <P>You additionally have the right to erasure, data portability, to object to processing, and to restrict processing. Email <Strong>hello@btcplanner.ca</Strong> with "GDPR Request" in the subject line.</P>
          </SubSection>
          <SubSection title="9.3 Unsubscribe">
            <P>Click "Unsubscribe" in any email, or email <Strong>hello@btcplanner.ca</Strong> with "Unsubscribe" in the subject line. We process requests within 10 business days as required by CASL.</P>
          </SubSection>
        </Section>

        <Section title="10. Children's Privacy">
          <P>btcplanner.ca is not directed at children under 18. We do not knowingly collect information from minors. If you believe a child has provided us information, contact <Strong>hello@btcplanner.ca</Strong> and we will delete it promptly.</P>
        </Section>

        <Section title="11. CASL Compliance">
          <P>We comply with Canada's Anti-Spam Legislation (CASL). We only send commercial emails with your consent, every email clearly identifies us as the sender and includes an unsubscribe link, and we honour unsubscribe requests within 10 business days.</P>
        </Section>

        <Section title="12. Changes to This Policy">
          <P>We may update this Privacy Policy from time to time. When we make material changes, we will update the effective date above and notify you where required by law. Continued use of the Site after changes constitutes acceptance of the updated policy.</P>
        </Section>

        <Section title="13. Contact & Complaints">
          <P><Strong>BTC Planner — Privacy Officer</Strong><br />
          Email: hello@btcplanner.ca<br />
          Vancouver, British Columbia, Canada<br />
          btcplanner.ca</P>
          <P>If you are not satisfied with our response, you may contact the <Strong>Office of the Privacy Commissioner of Canada</Strong> at priv.gc.ca or 1-800-282-1376.</P>
        </Section>

        <InfoBox>
          Summary: We collect minimal data, we don't sell it, we use it only to improve btcplanner.ca, and you can ask us to delete it at any time. Questions? <Strong>hello@btcplanner.ca</Strong>
        </InfoBox>

        <div style={{ fontSize: 12, color: COLORS.textMuted, textAlign: "center", marginTop: 24 }}>
          Last updated: {today} · <a href="#" onClick={onBack} style={{ color: COLORS.orange, textDecoration: "none" }}>Return to btcplanner.ca</a>
        </div>
      </div>
    </div>
  );
}
