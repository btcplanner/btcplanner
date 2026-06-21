import { useState, useEffect, useCallback } from "react";

function DisclaimerModal({ onAccept }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999, padding: 16,
    }}>
      <div style={{
        background: "#fff", border: "1px solid #E5E7EB",
        borderRadius: 16, maxWidth: 400, width: "100%",
        padding: "28px 24px", boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "#F7931A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0 }}>₿</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: "#1D1D1B" }}>BTC Planner</div>
        </div>

        <div style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.8, marginBottom: 24 }}>
          This site is for <strong style={{ color: "#1D1D1B" }}>informational and educational purposes only</strong>. Nothing here is financial advice. Always do your own research and consult a qualified advisor before making investment decisions.
        </div>

        <button onClick={onAccept} style={{
          width: "100%", background: "#F7931A", border: "none", borderRadius: 10,
          padding: "14px 0", color: "#fff", fontWeight: 700, fontSize: 15,
          fontFamily: "'Space Grotesk', sans-serif", cursor: "pointer",
        }}>
          I Understand
        </button>
      </div>
    </div>
  );
}

function RiskBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div style={{
      background: "#FFF7ED", borderBottom: "1px solid #F7931A",
      padding: "8px 24px", display: "flex", alignItems: "center",
      justifyContent: "space-between", gap: 12,
    }}>
      <div style={{ fontSize: 12, color: "#4B5563", lineHeight: 1.5 }}>
        <span style={{ color: "#F7931A", fontWeight: 600 }}>Risk Warning: </span>
        Crypto assets are highly volatile. You may lose your entire investment. This site is for educational purposes only — not financial advice.
      </div>
      <button onClick={() => setVisible(false)} style={{ background: "none", border: "none", color: "#9CA3AF", fontSize: 18, cursor: "pointer", flexShrink: 0 }}>✕</button>
    </div>
  );
}

const COLORS = {
  bg: "#FFFFFF",
  card: "#F9FAFB",
  cardBorder: "#E5E7EB",
  orange: "#F7931A",
  orangeLight: "#FFF7ED",
  green: "#10B981",
  red: "#EF4444",
  textPrimary: "#1D1D1B",
  textMuted: "#6B7280",
  textSub: "#4B5563",
};

const affiliates = [
  {
    category: "Bitcoin Exchanges for Canadians",
    items: [
      { name: "Kraken", desc: "Global exchange with advanced trading, staking, and low fees.", url: "https://www.kraken.com", color: "#7B61FF" },
      { name: "Newton", desc: "Canadian exchange with zero-commission trading and Interac funding.", url: "https://www.newton.co", color: "#00C281" },
      { name: "Shakepay", desc: "Buy and earn Bitcoin with instant Interac deposits in Canada.", url: "https://www.shakepay.com", color: "#F7931A" },
      { name: "Coinbase", desc: "One of the world's largest exchanges with a simple interface.", url: "https://www.coinbase.com", color: "#0052FF" },
    ]
  },
  {
    category: "Bitcoin-Backed Loans",
    items: [
      { name: "Ledn", desc: "Borrow against your Bitcoin without selling it — keep your stack and access liquidity.", url: "https://www.ledn.io", color: "#1A1A2E" },
    ]
  },
  {
    category: "Cold Storage",
    items: [
      { name: "Trezor", desc: "Open-source hardware wallet for secure offline Bitcoin storage.", url: "https://www.trezor.io", color: "#00854D" },
      { name: "Ledger", desc: "Hardware wallet with mobile app support and broad asset coverage.", url: "https://www.ledger.com", color: "#000000" },
    ]
  }
];

const dcaData = [
  { year: 2019, value: 1 }, { year: 2020, value: 3.2 },
  { year: 2021, value: 18.4 }, { year: 2022, value: 9.1 },
  { year: 2023, value: 14.6 }, { year: 2024, value: 38.2 },
  { year: 2025, value: 71.4 },
];

const powerLawData = [
  { year: 2012, actual: 5, model: 3 },
  { year: 2013, actual: 100, model: 20 },
  { year: 2014, actual: 750, model: 80 },
  { year: 2015, actual: 300, model: 250 },
  { year: 2016, actual: 600, model: 700 },
  { year: 2017, actual: 14000, model: 2000 },
  { year: 2018, actual: 3700, model: 5000 },
  { year: 2019, actual: 7200, model: 10000 },
  { year: 2020, actual: 9500, model: 18000 },
  { year: 2021, actual: 47000, model: 30000 },
  { year: 2022, actual: 19500, model: 45000 },
  { year: 2023, actual: 30000, model: 60000 },
  { year: 2024, actual: 62000, model: 80000 },
  { year: 2025, actual: 105000, model: 110000 },
];

const faqs = [
  { q: "Is Bitcoin legal in Canada?", a: "Yes. Bitcoin is fully legal in Canada. The CRA treats it as a commodity — capital gains tax applies when you sell. 50% of gains are included in your taxable income." },
  { q: "What's the safest way to store Bitcoin?", a: "Cold storage (hardware wallet like Trezor or Ledger) is the gold standard. Never leave large amounts on an exchange. 'Not your keys, not your coins.'" },
  { q: "What is DCA (Dollar Cost Averaging)?", a: "DCA means buying a fixed dollar amount of Bitcoin on a regular schedule (e.g. $100/week) regardless of the current price. By spreading your purchases over time, you buy more Bitcoin when the price is low and less when it's high, which averages out your cost basis over the long term." },
  { q: "How much Bitcoin should I buy?", a: "Most advisors suggest only investing what you can afford to lose entirely. Common starting points: 1–5% of investable assets for conservative, up to 10–20% for higher risk tolerance." },
  { q: "What about crypto taxes in Canada?", a: "Every sale, trade, or use of Bitcoin is a taxable event. Keep records of every transaction with date, CAD value, and amount. Tools like Koinly or CoinTracker integrate with Canadian exchanges." },
];

function CanadaFlag({ size = 20 }) {
  return <span style={{ fontSize: size, lineHeight: 1, display: "inline-block", verticalAlign: "middle" }} role="img" aria-label="Canada">🇨🇦</span>;
}

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

function PowerLawChart({ data }) {
  const maxVal = Math.max(...data.map(d => Math.max(d.actual, d.model)));
  const logScale = (v) => Math.log10(Math.max(v, 1)) / Math.log10(maxVal) * 100;
  return (
    <div style={{ position: "relative", height: 140, padding: "8px 0" }}>
      <svg width="100%" height="100%" viewBox="0 0 400 140" preserveAspectRatio="none">
        <polyline
          fill="none" stroke={COLORS.orange} strokeWidth="2" strokeDasharray="6,4" opacity="0.6"
          points={data.map((d, i) => `${(i / (data.length - 1)) * 390 + 5},${140 - logScale(d.model) * 1.3 - 5}`).join(" ")}
        />
        <polyline
          fill="none" stroke={COLORS.orange} strokeWidth="2.5"
          points={data.map((d, i) => `${(i / (data.length - 1)) * 390 + 5},${140 - logScale(d.actual) * 1.3 - 5}`).join(" ")}
        />
        {data.map((d, i) => (
          <circle key={i}
            cx={(i / (data.length - 1)) * 390 + 5}
            cy={140 - logScale(d.actual) * 1.3 - 5}
            r="3" fill={COLORS.orange}
          />
        ))}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: COLORS.textMuted, marginTop: 4, padding: "0 4px" }}>
        {data.filter((_, i) => i % 2 === 0).map(d => (
          <span key={d.year}>{d.year}</span>
        ))}
      </div>
    </div>
  );
}

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

function handleAmountInput(value, setter) {
  if (value === "") {
    setter("");
    return;
  }
  const num = parseInt(value, 10);
  if (!isNaN(num) && num >= 0) {
    setter(num);
  }
}

export default function BTCPlanner({ onNavigate }) {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(() => {
    try { return sessionStorage.getItem("btcplanner_disclaimer") === "1"; } catch { return false; }
  });
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
    const amount = Number(dcaAmount) || 0;
    const periods = dcaFreq === "weekly" ? dcaYears * 52 : dcaYears * 12;
    const totalInvested = amount * periods;
    if (amount === 0) {
      return { totalInvested: "$0", projectedValue: "$0", multiplier: "0.0" };
    }
    const growthRate = dcaFreq === "weekly" ? 1.007 : 1.03;
    let value = 0;
    for (let i = 0; i < periods; i++) {
      value = (value + amount) * growthRate;
    }
    return {
      totalInvested: totalInvested.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }),
      projectedValue: value.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }),
      multiplier: (value / totalInvested).toFixed(1)
    };
  }, [dcaAmount, dcaFreq, dcaYears]);

  const dcaResult = calcDCA();
  const numSats = Number(satsAmount) || 0;
  const cadToSats = btcPrice ? Math.floor((numSats / btcPrice.cad) * 100_000_000).toLocaleString() : "—";

  const chatSystemPrompt = `You are a Bitcoin education assistant on BTCPlanner.ca, a Canadian Bitcoin information site. Your role is strictly educational.

CRITICAL RULES — never break these:
1. NEVER tell anyone to buy, sell, or hold Bitcoin or any asset. You are NOT a financial advisor.
2. NEVER predict prices or say Bitcoin will go up or down.
3. NEVER recommend specific investment amounts or percentages of someone's portfolio.
4. If anyone asks "should I buy Bitcoin?" or similar — explain what Bitcoin is and how it works, but always end with: "I cannot give investment advice. Please consult a licensed financial advisor before making any investment decisions."
5. Always end any response touching on investment decisions with: "This is educational information only — not financial advice. Please do your own research and consult a qualified advisor."
6. Mention Canadian context (CRA taxes, CAD, Shakepay/Newton/Bull Bitcoin) where relevant.
7. Keep answers concise (2-4 sentences) and friendly.
8. You can explain HOW things work (DCA, cold storage, wallets, exchanges). Never advise WHETHER someone should do them.`;

  async function sendChat() {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setChatInput("");
    setChatLoading(true);
    try {
      const history = chatMessages
        .filter((_, idx) => idx > 0)
        .map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: chatSystemPrompt,
          messages: [...history, { role: "user", content: userMsg }]
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "API error");
      }
      const reply = data.content?.[0]?.text || "Sorry, I couldn't get a response. Try again!";
      setChatMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setChatMessages(prev => [...prev, { role: "assistant", text: "Connection issue — try again in a moment!" }]);
    }
    setChatLoading(false);
  }

  const fgColor = fearGreed ? (fearGreed.value > 60 ? COLORS.green : fearGreed.value > 40 ? COLORS.orange : COLORS.red) : COLORS.textMuted;
  const tabs = [
    { id: "dashboard", label: "Home" },
    { id: "dca", label: "DCA" },
    { id: "learn", label: "Learn" },
    { id: "tools", label: "Tools" },
    { id: "affiliates", label: "Start" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.textPrimary, fontFamily: "'Inter', sans-serif" }}>
      {!disclaimerAccepted && <DisclaimerModal onAccept={() => {
        setDisclaimerAccepted(true);
        try { sessionStorage.setItem("btcplanner_disclaimer", "1"); } catch {}
      }} />}
      <RiskBanner />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        input, select { outline: none; }
        button:hover { opacity: 0.85; cursor: pointer; }
        a:hover { opacity: 0.85; }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ borderBottom: `1px solid ${COLORS.cardBorder}`, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: COLORS.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0 }}>
            ₿
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: COLORS.textPrimary, letterSpacing: "-0.3px" }}>
                BTC PLANNER
              </span>
              <CanadaFlag size={18} />
            </div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, letterSpacing: "0.04em" }}>
              btcplanner.ca — Canada's Bitcoin guide
            </div>
          </div>
        </div>

        {btcPrice && (
          <div style={{ textAlign: "right" }}>
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
      <div style={{ display: "flex", borderBottom: `1px solid ${COLORS.cardBorder}`, background: "#fff" }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            flex: 1, padding: "12px 0", background: "none", border: "none",
            color: activeTab === tab.id ? COLORS.orange : COLORS.textMuted,
            borderBottom: activeTab === tab.id ? `2px solid ${COLORS.orange}` : "2px solid transparent",
            fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
            whiteSpace: "nowrap", textAlign: "center",
          }}>
            {tab.label}
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
                <CanadaFlag size={24} />
              </div>
              <p style={{ color: COLORS.textSub, fontSize: 14 }}>Canada's all-in-one Bitcoin starting point — buy, store, and stack BTC the smart way.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
              <StatCard label="BTC Price (CAD)" value={loading ? "Loading..." : `$${btcPrice?.cad.toLocaleString()}`} sub={`$${btcPrice?.usd.toLocaleString()} USD`} color={COLORS.orange} pulse={true} />
              <StatCard label="24h Change" value={loading ? "—" : `${priceChange > 0 ? "+" : ""}${priceChange}%`} sub="vs yesterday" color={Number(priceChange) > 0 ? COLORS.green : COLORS.red} />
              <StatCard label="Fear & Greed" value={loading ? "—" : `${fearGreed?.value} — ${fearGreed?.label}`} sub="Market sentiment" color={fgColor} />
              <StatCard label="1 Satoshi" value={loading ? "—" : `$${((1 / 100_000_000) * (btcPrice?.cad || 0)).toFixed(6)}`} sub="Smallest BTC unit" color={COLORS.orange} />
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>Historical BTC Price (USD, approx.)</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>Yearly average</div>
              </div>
              <MiniChart data={dcaData} />
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 8 }}>Past performance is not indicative of future results. Always do your own research.</div>
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>Bitcoin Power Law Model</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>Log scale</div>
              </div>
              <div style={{ fontSize: 13, color: COLORS.textSub, marginBottom: 8, lineHeight: 1.7 }}>
                The Bitcoin Power Law is a mathematical model that maps Bitcoin's price over time on a logarithmic scale. It suggests that Bitcoin's long-term price growth follows a predictable corridor driven by network adoption, similar to how other technologies scale. On a log-log chart, Bitcoin's price has traced a remarkably straight line since its inception — even through dramatic boom and bust cycles. Proponents argue this reflects Bitcoin's nature as a network where value grows as a power function of time and adoption, much like Metcalfe's Law applied to money.
              </div>
              <PowerLawChart data={powerLawData} />
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8, fontSize: 12, color: COLORS.textMuted }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 16, height: 2, background: COLORS.orange, display: "inline-block", borderRadius: 1 }} /> Actual price
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 16, height: 2, background: COLORS.orange, opacity: 0.5, display: "inline-block", borderRadius: 1, borderTop: "1px dashed", borderBottom: "1px dashed" }} /> Power Law model
                </span>
              </div>
              <div style={{ marginTop: 10 }}>
                <a href="https://charts.bitbo.io/long-term-power-law/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: COLORS.orange, textDecoration: "underline" }}>
                  View the interactive Bitcoin Power Law chart →
                </a>
              </div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 6 }}>
                The Power Law is a theory, not a guarantee. Past mathematical patterns do not predict future performance. Always do your own research.
              </div>
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", fontSize: 16 }}>Getting Started in 3 Steps</span>
                <CanadaFlag size={16} />
              </div>
              {[
                { step: "1", title: "Buy Bitcoin", body: <>Use a Canadian-friendly exchange like <a href="https://www.kraken.com" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.orange, textDecoration: "underline" }}>Kraken</a> or <a href="https://www.coinbase.com" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.orange, textDecoration: "underline" }}>Coinbase</a>. Fund via Interac e-Transfer or bank deposit and purchase your first Bitcoin.</> },
                { step: "2", title: <>Set up <button onClick={() => setActiveTab("learn")} style={{ background: "none", border: "none", color: COLORS.orange, textDecoration: "underline", fontWeight: 600, fontSize: "inherit", fontFamily: "inherit", cursor: "pointer", padding: 0 }}>DCA (Dollar Cost Averaging)</button></>, body: "DCA means buying a fixed dollar amount of Bitcoin on a regular schedule — weekly, bi-weekly, or monthly — regardless of the current price. Over time, this averages out your purchase price, so you buy more when it's cheap and less when it's expensive." },
                { step: "3", title: "Move to cold storage", body: <>Get a hardware wallet (<a href="https://www.trezor.io" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.orange, textDecoration: "underline" }}>Trezor</a> or <a href="https://www.ledger.com" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.orange, textDecoration: "underline" }}>Ledger</a>) to store your Bitcoin offline. <a href="https://bitcoin.org/en/secure-your-wallet" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.orange, textDecoration: "underline" }}>Your keys, your Bitcoin</a> — keeping coins on an exchange means you don't truly own them.</> },
              ].map(s => (
                <div key={s.step} style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "flex-start" }}>
                  <div style={{ minWidth: 32, height: 32, borderRadius: "50%", background: COLORS.orange, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "#fff" }}>{s.step}</div>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{s.title}</div>
                    <div style={{ fontSize: 14, color: COLORS.textSub, lineHeight: 1.6 }}>{s.body}</div>
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
            <p style={{ color: COLORS.textSub, fontSize: 14, marginBottom: 24 }}>Dollar Cost Averaging — buy a fixed amount of Bitcoin on a schedule and watch your stack grow.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }}>
                <div style={{ fontWeight: 600, marginBottom: 20, fontFamily: "'Space Grotesk', sans-serif" }}>Your DCA Plan</div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, color: COLORS.textMuted, display: "block", marginBottom: 6 }}>Amount (CAD $)</label>
                  <input type="text" inputMode="numeric" value={dcaAmount === "" ? "" : dcaAmount} onChange={e => handleAmountInput(e.target.value, setDcaAmount)} placeholder="Enter amount"
                    style={{ width: "100%", background: "#fff", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "10px 14px", color: COLORS.textPrimary, fontSize: 16, fontFamily: "'Space Grotesk', sans-serif" }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, color: COLORS.textMuted, display: "block", marginBottom: 6 }}>Frequency</label>
                  <select value={dcaFreq} onChange={e => setDcaFreq(e.target.value)}
                    style={{ width: "100%", background: "#fff", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "10px 14px", color: COLORS.textPrimary, fontSize: 14 }}>
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
                <div style={{ background: COLORS.orangeLight, border: `1px solid ${COLORS.orange}55`, borderRadius: 12, padding: 24, flex: 1 }}>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Projected Value*</div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.orange, fontFamily: "'Space Grotesk', sans-serif" }}>{dcaResult.projectedValue}</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>{dcaResult.multiplier}x return (historical avg. model)</div>
                </div>
              </div>
            </div>

            <div style={{ background: COLORS.orangeLight, border: `1px solid ${COLORS.orange}44`, borderRadius: 8, padding: 16, fontSize: 12, color: COLORS.textSub }}>
              <strong>Disclaimer:</strong> Projections are based on Bitcoin's historical average growth and are not a guarantee of future returns. Bitcoin is highly volatile. Only invest what you can afford to lose. This is not financial advice.
            </div>
          </div>
        )}

        {/* LEARN */}
        {activeTab === "learn" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700 }}>Bitcoin 101</h2>
              <CanadaFlag size={20} />
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
                <span style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>Canadian Bitcoin Tax Basics</span>
                <CanadaFlag size={16} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { label: "Capital Gains", val: "50% of gains included in taxable income" },
                  { label: "Taxable Events", val: "Selling, trading, or spending BTC" },
                  { label: "HODLing", val: "Not taxable until you sell or trade" },
                  { label: "Tax Tools", val: "Koinly, CoinTracker (CRA compatible)" },
                ].map(t => (
                  <div key={t.label} style={{ background: "#fff", borderRadius: 8, padding: 14, border: `1px solid ${COLORS.cardBorder}` }}>
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
          <div>
            <style>{`
              @media (min-width: 640px) {
                .tools-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; }
                .chat-window { height: 500px !important; }
              }
            `}</style>
            <div className="tools-grid" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
                  <div style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 16 }}>Sats Converter</div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, color: COLORS.textMuted, display: "block", marginBottom: 6 }}>CAD Amount ($)</label>
                    <input type="text" inputMode="numeric" value={satsAmount === "" ? "" : satsAmount} onChange={e => handleAmountInput(e.target.value, setSatsAmount)} placeholder="Enter amount"
                      style={{ width: "100%", background: "#fff", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "10px 14px", color: COLORS.textPrimary, fontSize: 16, fontFamily: "'Space Grotesk', sans-serif" }} />
                  </div>
                  <div style={{ background: COLORS.orangeLight, borderRadius: 8, padding: 16, textAlign: "center" }}>
                    <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 4 }}>{numSats > 0 ? `$${numSats} CAD =` : "Enter an amount above"}</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.orange, fontFamily: "'Space Grotesk', sans-serif" }}>{numSats > 0 ? `${cadToSats} sats` : "—"}</div>
                    {numSats > 0 && <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>satoshis</div>}
                  </div>
                </div>

                <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }}>
                  <div style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 12 }}>Market Sentiment</div>
                  {fearGreed && (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 13, color: COLORS.textMuted }}>Fear & Greed Index</span>
                        <span style={{ fontSize: 13, color: fgColor, fontWeight: 600 }}>{fearGreed.label}</span>
                      </div>
                      <div style={{ background: "#E5E7EB", borderRadius: 6, height: 12, overflow: "hidden" }}>
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
              <div className="chat-window" style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, display: "flex", flexDirection: "column", minHeight: 380 }}>
                <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.cardBorder}`, display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff", fontWeight: 700 }}>₿</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>BTC Planner AI Guide</div>
                    <div style={{ fontSize: 11, color: COLORS.green }}>Online</div>
                  </div>
                </div>
                <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                  {chatMessages.map((msg, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                      <div style={{
                        maxWidth: "85%", padding: "10px 14px",
                        borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                        background: msg.role === "user" ? COLORS.orange : "#fff",
                        color: msg.role === "user" ? "#fff" : COLORS.textPrimary,
                        fontSize: 13, lineHeight: 1.6,
                        border: msg.role === "user" ? "none" : `1px solid ${COLORS.cardBorder}`,
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div style={{ display: "flex", gap: 4, padding: "8px 14px", background: "#fff", border: `1px solid ${COLORS.cardBorder}`, borderRadius: "16px 16px 16px 4px", width: "fit-content" }}>
                      {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.textMuted, animation: `pulse ${0.6 + i * 0.2}s infinite` }} />)}
                    </div>
                  )}
                </div>
                <div style={{ padding: 12, borderTop: `1px solid ${COLORS.cardBorder}`, display: "flex", gap: 8 }}>
                  <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()}
                    placeholder="Ask anything about Bitcoin..."
                    style={{ flex: 1, background: "#fff", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "10px 14px", color: COLORS.textPrimary, fontSize: 13, fontFamily: "'Inter', sans-serif" }} />
                  <button onClick={sendChat} style={{ background: COLORS.orange, border: "none", borderRadius: 8, padding: "10px 16px", color: "#fff", fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GET STARTED / AFFILIATES */}
        {activeTab === "affiliates" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700 }}>Get Started</h2>
              <CanadaFlag size={20} />
            </div>
            <p style={{ color: COLORS.textSub, fontSize: 14, marginBottom: 24 }}>Recommended tools and services for Canadian Bitcoin investors.</p>

            {affiliates.map((cat, ci) => (
              <div key={ci} style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textMuted, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>{cat.category}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {cat.items.map((item, ii) => (
                    <a key={ii} href={item.url} target="_blank" rel="noopener noreferrer" style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, textDecoration: "none", color: "inherit" }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: item.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0 }}>{item.name[0]}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.textPrimary }}>{item.name}</div>
                        <div style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.4 }}>{item.desc}</div>
                      </div>
                      <span style={{ color: COLORS.orange, fontSize: 18, flexShrink: 0 }}>→</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ background: COLORS.orangeLight, border: `1px solid ${COLORS.orange}44`, borderRadius: 8, padding: 16, fontSize: 12, color: COLORS.textSub }}>
              <strong>Affiliate Disclosure:</strong> Some links on btcplanner.ca are affiliate links. If you sign up through our link, we may receive a commission at no extra cost to you. We only recommend services we trust.
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${COLORS.cardBorder}`, padding: "28px 24px", background: COLORS.card, marginTop: 40 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: COLORS.textMuted, fontSize: 14 }}>BTC PLANNER</span>
            <CanadaFlag size={14} />
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
          <div style={{ fontSize: 11, color: COLORS.textMuted, textAlign: "center", lineHeight: 1.6 }}>
            btcplanner.ca is for educational purposes only — not financial advice. Cryptocurrency investments involve significant risk including total loss of capital.
            BTC Planner is not a registered investment advisor. Always consult a qualified financial advisor.
          </div>
        </div>
      </div>
    </div>
  );
}
