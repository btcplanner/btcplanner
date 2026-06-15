import { useState, useEffect, useCallback } from "react";

// ── DISCLAIMER MODAL ──────────────────────────────────────────────
function DisclaimerModal({ onAccept }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999, padding: 16,
    }}>
      <div style={{
        background: "#111827", border: "1px solid #1E2A3B",
        borderRadius: 16, maxWidth: 520, width: "100%",
        padding: "32px 28px", boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: "#F7931A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0 }}>₿</div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: "#F5F5F0" }}>BTC Planner</div>
            <div style={{ fontSize: 11, color: "#6B7280" }}>Important Notice Before You Continue</div>
          </div>
        </div>

        {/* Risk warning box */}
        <div style={{ background: "#1a0a00", border: "1px solid #7C4A0D", borderRadius: 10, padding: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#F7931A", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>⚠️ Risk Warning</div>
          <div style={{ fontSize: 13, color: "#D1D5DB", lineHeight: 1.7 }}>
            Cryptocurrency investments are <strong style={{ color: "#F5F5F0" }}>highly speculative and volatile</strong>. You could lose some or all of your invested capital. Bitcoin has no guaranteed value and is not insured or protected by any Canadian government body, CDIC, or financial regulator.
          </div>
        </div>

        {/* Disclaimer text */}
        <div style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.8, marginBottom: 24 }}>
          <p style={{ marginBottom: 10 }}>
            <strong style={{ color: "#F5F5F0" }}>Not Financial Advice.</strong> All content on btcplanner.ca — including tools, calculators, AI chat responses, and educational materials — is provided for <strong style={{ color: "#F5F5F0" }}>informational and educational purposes only</strong>. Nothing on this site constitutes financial, investment, legal, or tax advice.
          </p>
          <p style={{ marginBottom: 10 }}>
            <strong style={{ color: "#F5F5F0" }}>No Advisor Relationship.</strong> BTC Planner is not a registered investment advisor, financial planner, or securities dealer under any Canadian provincial or federal law. Using this site does not create an advisor-client relationship.
          </p>
          <p>
            <strong style={{ color: "#F5F5F0" }}>Do Your Own Research.</strong> Always consult a qualified financial advisor before making any investment decisions. Past performance of Bitcoin is not indicative of future results.
          </p>
        </div>

        {/* Affiliate disclosure */}
        <div style={{ background: "#0A0F1E", borderRadius: 8, padding: 12, marginBottom: 24, fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>
          <strong style={{ color: "#9CA3AF" }}>Affiliate Disclosure:</strong> This site contains affiliate links. BTC Planner may earn a commission if you sign up through our links, at no additional cost to you.
        </div>

        {/* Accept button */}
        <button onClick={onAccept} style={{
          width: "100%", background: "#F7931A", border: "none", borderRadius: 10,
          padding: "14px 0", color: "#000", fontWeight: 700, fontSize: 15,
          fontFamily: "'Space Grotesk', sans-serif", cursor: "pointer",
          letterSpacing: "0.02em",
        }}>
          I Understand — Enter BTC Planner
        </button>

        <div style={{ textAlign: "center", marginTop: 12, fontSize: 11, color: "#4B5563" }}>
          By continuing you agree to our Terms of Use and acknowledge these risks.
        </div>
      </div>
    </div>
  );
}

// ── RISK BANNER (persistent top bar) ─────────────────────────────
function RiskBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div style={{
      background: "#1a0a00", borderBottom: "1px solid #7C4A0D",
      padding: "8px 24px", display: "flex", alignItems: "center",
      justifyContent: "space-between", gap: 12,
    }}>
      <div style={{ fontSize: 12, color: "#D1D5DB", lineHeight: 1.5 }}>
        <span style={{ color: "#F7931A", fontWeight: 600 }}>⚠️ Risk Warning: </span>
        Crypto assets are highly volatile and unregulated. You may lose your entire investment. This site is for educational purposes only — not financial advice.
      </div>
      <button onClick={() => setVisible(false)} style={{ background: "none", border: "none", color: "#6B7280", fontSize: 18, cursor: "pointer", flexShrink: 0 }}>✕</button>
    </div>
  );
}

const COLORS = {
  bg: "#0A0F1E",
  card: "#111827",
  cardBorder: "#1E2A3B",
  orange: "#F7931A",
  orangeDim: "#7C4A0D",
  blue: "#3B82F6",
  green: "#10B981",
  red: "#EF4444",
  maple: "#FF0000",
  textPrimary: "#F5F5F0",
  textMuted: "#6B7280",
  textSub: "#9CA3AF",
};

const affiliates = [
  {
    category: "🇨🇦 Canadian Exchanges",
    items: [
      { name: "Shakepay", desc: "Best for Canadians — buy BTC via e-Transfer, no fees on first $200", commission: "$30/referral", url: "#shakepay", badge: "Top Pick" },
      { name: "Newton", desc: "Zero-commission trading, FINTRAC registered, CDIC eligible cash", commission: "$25/referral", url: "#newton", badge: null },
      { name: "Bull Bitcoin", desc: "Bitcoin-only, non-custodial. For those who want self-sovereignty", commission: "$20/referral", url: "#bullbitcoin", badge: "BTC Only" },
      { name: "Kraken", desc: "Global exchange, low fees, trusted since 2011. Available in Canada", commission: "20% lifetime fees", url: "#kraken", badge: null },
    ]
  },
  {
    category: "🔐 Cold Storage Wallets",
    items: [
      { name: "Ledger Nano X", desc: "Industry standard hardware wallet. Bluetooth enabled, stores 5,500+ assets", commission: "10% (~$12/sale)", url: "#ledger", badge: "Most Popular" },
      { name: "Trezor Model T", desc: "Open-source firmware, touchscreen, no Bluetooth (air-gapped option)", commission: "10% (~$15/sale)", url: "#trezor", badge: null },
      { name: "Coldcard Mk4", desc: "Bitcoin-only. The most secure wallet on the market. For serious stackers", commission: "8% (~$14/sale)", url: "#coldcard", badge: "Max Security" },
    ]
  },
  {
    category: "📈 DCA Platforms",
    items: [
      { name: "Swan Bitcoin", desc: "Automated weekly/monthly buys, low fees, phenomenal education resources", commission: "$100/referral", url: "#swan", badge: "💰 Best Commission" },
      { name: "River", desc: "Low fees, automatic recurring buys, US-focused but ships globally", commission: "$50/referral", url: "#river", badge: null },
    ]
  }
];

const dcaData = [
  { year: 2019, value: 1 }, { year: 2020, value: 3.2 },
  { year: 2021, value: 18.4 }, { year: 2022, value: 9.1 },
  { year: 2023, value: 14.6 }, { year: 2024, value: 38.2 },
  { year: 2025, value: 71.4 },
];

const faqs = [
  { q: "Is Bitcoin legal in Canada?", a: "Yes. Bitcoin is fully legal in Canada. The CRA treats it as a commodity — capital gains tax applies when you sell. 50% of gains are included in your taxable income." },
  { q: "What's the safest way to store Bitcoin?", a: "Cold storage (hardware wallet like Ledger or Trezor) is the gold standard. Never leave large amounts on an exchange. 'Not your keys, not your coins.'" },
  { q: "What is DCA (Dollar Cost Averaging)?", a: "Buying a fixed dollar amount of Bitcoin on a regular schedule (e.g. $100/week) regardless of price. It removes emotion from investing and smooths out volatility over time." },
  { q: "How much Bitcoin should I buy?", a: "Most advisors suggest only investing what you can afford to lose entirely. Common starting points: 1–5% of investable assets for conservative, up to 10–20% for higher risk tolerance." },
  { q: "What about crypto taxes in Canada?", a: "Every sale, trade, or use of Bitcoin is a taxable event. Keep records of every transaction with date, CAD value, and amount. Tools like Koinly or CoinTracker integrate with Canadian exchanges." },
];

// Maple leaf SVG component
function MapleLeaf({ size = 22, color = "#FF0000", opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color} opacity={opacity} style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M50,5 L55,30 L80,20 L65,40 L95,45 L70,55 L80,80 L55,65 L50,95 L45,65 L20,80 L30,55 L5,45 L35,40 L20,20 L45,30 Z" />
    </svg>
  );
}

// Mini bar chart component
function MiniChart({ data }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 60, padding: "8px 0" }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
          <div style={{
            width: "100%",
            height: `${(d.value / max) * 50}px`,
            background: i === data.length - 1 ? COLORS.orange : `${COLORS.orange}55`,
            borderRadius: "3px 3px 0 0",
            transition: "height 0.5s ease",
          }} />
          <span style={{ fontSize: 9, color: COLORS.textMuted, marginTop: 2 }}>{d.year}</span>
        </div>
      ))}
    </div>
  );
}

// Stat card
function StatCard({ label, value, sub, color, pulse }) {
  return (
    <div style={{
      background: COLORS.card,
      border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 12,
      padding: "20px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {pulse && (
        <div style={{
          position: "absolute", top: 16, right: 16,
          width: 8, height: 8, borderRadius: "50%",
          background: COLORS.green,
          boxShadow: `0 0 0 3px ${COLORS.green}33`,
          animation: "pulse 2s infinite",
        }} />
      )}
      <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: color || COLORS.textPrimary, fontFamily: "'Space Grotesk', sans-serif" }}>{value}</div>
      {sub && <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

export default function BTCPlanner({ onNavigate }) {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [btcPrice, setBtcPrice] = useState(null);
  const [priceChange, setPriceChange] = useState(null);
  const [fearGreed, setFearGreed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dcaAmount, setDcaAmount] = useState(100);
  const [dcaFreq, setDcaFreq] = useState("weekly");
  const [dcaYears, setDcaYears] = useState(3);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [openFaq, setOpenFaq] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", text: "Hey! I'm the BTC Planner AI guide — here to help you learn about Bitcoin. Remember I'm an educational tool only, not a financial advisor. Ask me anything like 'what is a hardware wallet?' or 'how does DCA work?'" }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const [satsAmount, setSatsAmount] = useState(100);

  useEffect(() => {
    async function fetchData() {
      try {
        const [priceRes, fgRes] = await Promise.all([
          fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=cad,usd&include_24hr_change=true"),
          fetch("https://api.alternative.me/fng/")
        ]);
        const priceData = await priceRes.json();
        const fgData = await fgRes.json();
        setBtcPrice({ cad: priceData.bitcoin.cad, usd: priceData.bitcoin.usd });
        setPriceChange(priceData.bitcoin.cad_24h_change?.toFixed(2));
        setFearGreed({ value: fgData.data[0].value, label: fgData.data[0].value_classification });
      } catch (e) {
        setBtcPrice({ cad: 142350, usd: 104800 });
        setPriceChange(2.4);
        setFearGreed({ value: 72, label: "Greed" });
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const calcDCA = useCallback(() => {
    const periods = dcaFreq === "weekly" ? dcaYears * 52 : dcaYears * 12;
    const totalInvested = dcaAmount * periods;
    const growthRate = dcaFreq === "weekly" ? 1.007 : 1.03;
    let value = 0;
    for (let i = 0; i < periods; i++) {
      value = (value + dcaAmount) * growthRate;
    }
    return {
      totalInvested: totalInvested.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }),
      projectedValue: value.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }),
      multiplier: (value / totalInvested).toFixed(1)
    };
  }, [dcaAmount, dcaFreq, dcaYears]);

  const dcaResult = calcDCA();
  const satsValue = btcPrice ? ((satsAmount / 100_000_000) * btcPrice.cad).toFixed(2) : "—";
  const cadToSats = btcPrice ? Math.floor((satsAmount / btcPrice.cad) * 100_000_000).toLocaleString() : "—";

  async function sendChat() {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setChatInput("");
    setChatLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: `You are a Bitcoin education assistant on BTCPlanner.ca, a Canadian Bitcoin information site. Your role is strictly educational.

CRITICAL RULES — never break these:
1. NEVER tell anyone to buy, sell, or hold Bitcoin or any asset. You are NOT a financial advisor.
2. NEVER predict prices or say Bitcoin will go up or down.
3. NEVER recommend specific investment amounts or percentages of someone's portfolio.
4. If anyone asks "should I buy Bitcoin?" or similar — explain what Bitcoin is and how it works, but always end with: "I cannot give investment advice. Please consult a licensed financial advisor before making any investment decisions."
5. Always end any response touching on investment decisions with: "This is educational information only — not financial advice. Please do your own research and consult a qualified advisor."
6. Mention Canadian context (CRA taxes, CAD, Shakepay/Newton/Bull Bitcoin) where relevant.
7. Keep answers concise (2-4 sentences) and friendly.
8. You can explain HOW things work (DCA, cold storage, wallets, exchanges). Never advise WHETHER someone should do them.`,
          messages: [
            ...chatMessages.filter((m, idx) => idx > 0).map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text })),
            { role: "user", content: userMsg }
          ]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't get a response. Try again!";
      setChatMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setChatMessages(prev => [...prev, { role: "assistant", text: "Connection issue — try again in a moment!" }]);
    }
    setChatLoading(false);
  }

  const fgColor = fearGreed ? (fearGreed.value > 60 ? COLORS.green : fearGreed.value > 40 ? COLORS.orange : COLORS.red) : COLORS.textMuted;
  const tabs = ["dashboard", "dca", "learn", "tools", "affiliates"];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.textPrimary, fontFamily: "'Inter', sans-serif" }}>
      {!disclaimerAccepted && <DisclaimerModal onAccept={() => setDisclaimerAccepted(true)} />}
      <RiskBanner />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @keyframes ticker { 0% { opacity:0.7; } 50% { opacity:1; } 100% { opacity:0.7; } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        input, select { outline: none; }
        button:hover { opacity: 0.85; cursor: pointer; }
        a:hover { opacity: 0.85; }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ borderBottom: `1px solid ${COLORS.cardBorder}`, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#080D1A" }}>

        {/* Logo lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Bitcoin circle icon */}
          <div style={{ width: 40, height: 40, borderRadius: 10, background: COLORS.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0 }}>
            ₿
          </div>

          {/* Wordmark + domain */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: COLORS.textPrimary, letterSpacing: "-0.3px" }}>
                BTC PLANNER
              </span>
              <MapleLeaf size={18} color={COLORS.maple} opacity={0.9} />
            </div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, letterSpacing: "0.04em" }}>
              btcplanner.ca — Canada's Bitcoin guide
            </div>
          </div>
        </div>

        {/* Live price ticker */}
        {btcPrice && (
          <div style={{ textAlign: "right", animation: "ticker 3s infinite" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.orange, fontFamily: "'Space Grotesk', sans-serif" }}>
              ${btcPrice.cad.toLocaleString()} CAD
            </div>
            <div style={{ fontSize: 12, color: priceChange > 0 ? COLORS.green : COLORS.red }}>
              {priceChange > 0 ? "▲" : "▼"} {Math.abs(priceChange)}% (24h)
            </div>
          </div>
        )}
      </div>

      {/* ── NAV ── */}
      <div style={{ display: "flex", borderBottom: `1px solid ${COLORS.cardBorder}`, background: "#080D1A", overflowX: "auto" }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: "12px 20px", background: "none", border: "none",
            color: activeTab === tab ? COLORS.orange : COLORS.textMuted,
            borderBottom: activeTab === tab ? `2px solid ${COLORS.orange}` : "2px solid transparent",
            fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
            textTransform: "capitalize", whiteSpace: "nowrap",
          }}>
            {tab === "dca" ? "DCA Calculator" : tab === "affiliates" ? "Get Started" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 700 }}>Welcome to BTC Planner</h1>
                <MapleLeaf size={24} color={COLORS.maple} />
              </div>
              <p style={{ color: COLORS.textSub, fontSize: 14 }}>Canada's all-in-one Bitcoin starting point — buy, store, and stack BTC the smart way.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
              <StatCard label="BTC Price (CAD)" value={loading ? "Loading…" : `$${btcPrice?.cad.toLocaleString()}`} sub={`$${btcPrice?.usd.toLocaleString()} USD`} color={COLORS.orange} pulse={true} />
              <StatCard label="24h Change" value={loading ? "—" : `${priceChange > 0 ? "+" : ""}${priceChange}%`} sub="vs yesterday" color={Number(priceChange) > 0 ? COLORS.green : COLORS.red} />
              <StatCard label="Fear & Greed" value={loading ? "—" : `${fearGreed?.value} — ${fearGreed?.label}`} sub="Market sentiment" color={fgColor} />
              <StatCard label="1 Satoshi" value={loading ? "—" : `$${((1 / 100_000_000) * (btcPrice?.cad || 0)).toFixed(6)}`} sub="Smallest BTC unit" color={COLORS.blue} />
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>Historical BTC Price (USD, approx.)</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>Yearly average</div>
              </div>
              <MiniChart data={dcaData} />
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 8 }}>Past performance is not indicative of future results. Always do your own research.</div>
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", fontSize: 16 }}>🚀 Getting Started in 3 Steps</span>
                <MapleLeaf size={14} color={COLORS.maple} opacity={0.7} />
              </div>
              {[
                { step: "1", title: "Buy your first Bitcoin", body: "Use a Canadian exchange like Shakepay or Newton. Fund via Interac e-Transfer. Start with as little as $20 CAD." },
                { step: "2", title: "Set up a DCA plan", body: "Automate weekly or monthly buys. Remove emotion. Stack consistently regardless of price." },
                { step: "3", title: "Move to cold storage", body: "Once you have $500+, get a hardware wallet (Ledger or Trezor). Your keys, your Bitcoin." },
              ].map(s => (
                <div key={s.step} style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "flex-start" }}>
                  <div style={{ minWidth: 32, height: 32, borderRadius: "50%", background: COLORS.orange, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "#000" }}>{s.step}</div>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{s.title}</div>
                    <div style={{ fontSize: 14, color: COLORS.textSub }}>{s.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DCA CALCULATOR */}
        {activeTab === "dca" && (
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 6 }}>DCA Calculator</h2>
            <p style={{ color: COLORS.textSub, fontSize: 14, marginBottom: 24 }}>Dollar Cost Averaging — buy a fixed amount on a schedule and watch your stack grow.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }}>
                <div style={{ fontWeight: 600, marginBottom: 20, fontFamily: "'Space Grotesk', sans-serif" }}>Your DCA Plan</div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, color: COLORS.textMuted, display: "block", marginBottom: 6 }}>Amount (CAD $)</label>
                  <input type="number" value={dcaAmount} onChange={e => setDcaAmount(Number(e.target.value))} min={10} max={10000}
                    style={{ width: "100%", background: "#0A0F1E", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "10px 14px", color: COLORS.textPrimary, fontSize: 16, fontFamily: "'Space Grotesk', sans-serif" }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, color: COLORS.textMuted, display: "block", marginBottom: 6 }}>Frequency</label>
                  <select value={dcaFreq} onChange={e => setDcaFreq(e.target.value)}
                    style={{ width: "100%", background: "#0A0F1E", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "10px 14px", color: COLORS.textPrimary, fontSize: 14 }}>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, color: COLORS.textMuted, display: "block", marginBottom: 6 }}>Duration: {dcaYears} years</label>
                  <input type="range" min={1} max={10} value={dcaYears} onChange={e => setDcaYears(Number(e.target.value))}
                    style={{ width: "100%", accentColor: COLORS.orange }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: COLORS.textMuted }}>
                    <span>1yr</span><span>5yr</span><span>10yr</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24, flex: 1 }}>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Total Invested</div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.textPrimary, fontFamily: "'Space Grotesk', sans-serif" }}>{dcaResult.totalInvested}</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>CAD over {dcaYears} year{dcaYears > 1 ? "s" : ""}</div>
                </div>
                <div style={{ background: COLORS.card, border: `1px solid ${COLORS.orange}55`, borderRadius: 12, padding: 24, flex: 1 }}>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Projected Value*</div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.orange, fontFamily: "'Space Grotesk', sans-serif" }}>{dcaResult.projectedValue}</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>{dcaResult.multiplier}x return (historical avg. model)</div>
                </div>
              </div>
            </div>

            <div style={{ background: "#0D1117", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: 16, fontSize: 12, color: COLORS.textMuted }}>
              ⚠️ <strong style={{ color: COLORS.textSub }}>Disclaimer:</strong> Projections are based on Bitcoin's historical average growth and are not a guarantee of future returns. Bitcoin is highly volatile. Only invest what you can afford to lose. This is not financial advice.
            </div>
          </div>
        )}

        {/* LEARN */}
        {activeTab === "learn" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700 }}>Bitcoin 101</h2>
              <MapleLeaf size={18} color={COLORS.maple} opacity={0.8} />
            </div>
            <p style={{ color: COLORS.textSub, fontSize: 14, marginBottom: 24 }}>Everything a Canadian beginner needs to know before buying their first sat.</p>

            <div style={{ marginBottom: 24 }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, marginBottom: 10, overflow: "hidden" }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                    width: "100%", background: "none", border: "none", padding: "16px 20px", textAlign: "left",
                    color: COLORS.textPrimary, fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 15,
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}>
                    {faq.q}
                    <span style={{ color: COLORS.orange, fontSize: 20, fontWeight: 300, marginLeft: 12 }}>{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "0 20px 16px", color: COLORS.textSub, fontSize: 14, lineHeight: 1.7, borderTop: `1px solid ${COLORS.cardBorder}`, paddingTop: 16 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>🇨🇦 Canadian Bitcoin Tax Basics</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { label: "Capital Gains", val: "50% of gains included in taxable income" },
                  { label: "Taxable Events", val: "Selling, trading, or spending BTC" },
                  { label: "HODLing", val: "Not taxable until you sell or trade" },
                  { label: "Tax Tools", val: "Koinly, CoinTracker (CRA compatible)" },
                ].map(t => (
                  <div key={t.label} style={{ background: "#0A0F1E", borderRadius: 8, padding: 14 }}>
                    <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.label}</div>
                    <div style={{ fontSize: 14, color: COLORS.textPrimary }}>{t.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TOOLS */}
        {activeTab === "tools" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
                <div style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 16 }}>⚡ Sats Converter</div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, color: COLORS.textMuted, display: "block", marginBottom: 6 }}>CAD Amount ($)</label>
                  <input type="number" value={satsAmount} onChange={e => setSatsAmount(Number(e.target.value))}
                    style={{ width: "100%", background: "#0A0F1E", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "10px 14px", color: COLORS.textPrimary, fontSize: 16, fontFamily: "'Space Grotesk', sans-serif" }} />
                </div>
                <div style={{ background: "#0A0F1E", borderRadius: 8, padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 4 }}>${satsAmount} CAD =</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.orange, fontFamily: "'Space Grotesk', sans-serif" }}>{cadToSats} sats</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>satoshis ⚡</div>
                </div>
              </div>

              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }}>
                <div style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 12 }}>🌡️ Market Sentiment</div>
                {fearGreed && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 13, color: COLORS.textMuted }}>Fear & Greed Index</span>
                      <span style={{ fontSize: 13, color: fgColor, fontWeight: 600 }}>{fearGreed.label}</span>
                    </div>
                    <div style={{ background: "#0A0F1E", borderRadius: 6, height: 12, overflow: "hidden" }}>
                      <div style={{ width: `${fearGreed.value}%`, height: "100%", background: `linear-gradient(90deg, ${COLORS.red}, ${COLORS.orange}, ${COLORS.green})`, borderRadius: 6, transition: "width 1s ease" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: COLORS.textMuted }}>
                      <span>Extreme Fear</span><span>{fearGreed.value}/100</span><span>Extreme Greed</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* AI Chat */}
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, display: "flex", flexDirection: "column", height: 500 }}>
              <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.cardBorder}`, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff", fontWeight: 700 }}>₿</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>BTC Planner AI Guide</div>
                  <div style={{ fontSize: 11, color: COLORS.green }}>● Online</div>
                </div>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                    <div style={{
                      maxWidth: "80%", padding: "10px 14px",
                      borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background: msg.role === "user" ? COLORS.orange : "#1E2A3B",
                      color: msg.role === "user" ? "#000" : COLORS.textPrimary,
                      fontSize: 13, lineHeight: 1.6,
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div style={{ display: "flex", gap: 4, padding: "8px 14px", background: "#1E2A3B", borderRadius: "16px 16px 16px 4px", width: "fit-content" }}>
                    {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.textMuted, animation: `pulse ${0.6 + i * 0.2}s infinite` }} />)}
                  </div>
                )}
              </div>
              <div style={{ padding: 12, borderTop: `1px solid ${COLORS.cardBorder}`, display: "flex", gap: 8 }}>
                <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()}
                  placeholder="Ask anything about Bitcoin…"
                  style={{ flex: 1, background: "#0A0F1E", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "10px 14px", color: COLORS.textPrimary, fontSize: 13, fontFamily: "'Inter', sans-serif" }} />
                <button onClick={sendChat} style={{ background: COLORS.orange, border: "none", borderRadius: 8, padding: "10px 16px", color: "#000", fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* GET STARTED / AFFILIATES */}
        {activeTab === "affiliates" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700 }}>Get Started</h2>
              <MapleLeaf size={18} color={COLORS.maple} opacity={0.8} />
            </div>
            <p style={{ color: COLORS.textSub, fontSize: 14, marginBottom: 24 }}>Curated tools for Canadian Bitcoiners. We may earn a commission — at no extra cost to you.</p>

            {affiliates.map((cat, ci) => (
              <div key={ci} style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textMuted, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>{cat.category}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {cat.items.map((item, ii) => (
                    <div key={ii} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontWeight: 600, fontSize: 15 }}>{item.name}</span>
                          {item.badge && <span style={{ fontSize: 11, background: `${COLORS.orange}22`, color: COLORS.orange, padding: "2px 8px", borderRadius: 20, fontWeight: 500 }}>{item.badge}</span>}
                        </div>
                        <div style={{ fontSize: 13, color: COLORS.textSub, marginBottom: 6, lineHeight: 1.5 }}>{item.desc}</div>
                        <div style={{ fontSize: 12, color: COLORS.green }}>💰 Commission: {item.commission}</div>
                      </div>
                      <a href={item.url} style={{ background: COLORS.orange, color: "#000", padding: "10px 18px", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: 13, whiteSpace: "nowrap", fontFamily: "'Space Grotesk', sans-serif" }}>
                        Get Started →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ background: "#0D1117", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: 16, fontSize: 12, color: COLORS.textMuted }}>
              <strong style={{ color: COLORS.textSub }}>Affiliate Disclosure:</strong> Some links on btcplanner.ca are affiliate links. If you sign up through our link, we may receive a commission at no extra cost to you. We only recommend services we trust.
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${COLORS.cardBorder}`, padding: "28px 24px", background: "#080D1A", marginTop: 40 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: COLORS.textMuted, fontSize: 14 }}>BTC PLANNER</span>
            <MapleLeaf size={14} color={COLORS.maple} opacity={0.6} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 12, flexWrap: "wrap" }}>
            {[
              { label: "Terms of Use", page: "terms" },
              { label: "Privacy Policy", page: "privacy" },
              { label: "Affiliate Disclosure", page: "terms" },
              { label: "Risk Warning", page: "terms" },
            ].map(link => (
              <button key={link.label} onClick={() => onNavigate && onNavigate(link.page)} style={{
                background: "none", border: "none", color: COLORS.textMuted,
                fontSize: 12, cursor: "pointer", textDecoration: "underline",
                textDecorationColor: COLORS.cardBorder, fontFamily: "'Inter', sans-serif",
                padding: 0,
              }}>
                {link.label}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "#4B5563", textAlign: "center", lineHeight: 1.6 }}>
            btcplanner.ca is for educational purposes only — not financial advice. Cryptocurrency investments involve significant risk including total loss of capital.
            BTC Planner is not a registered investment advisor. Always consult a qualified financial advisor. 🇨🇦
          </div>
        </div>
      </div>
    </div>
  );
}
