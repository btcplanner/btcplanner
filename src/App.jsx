import { useState, useEffect, useCallback } from "react";

const translations = {
  en: {
    disclaimer: {
      title: "BTC Planner",
      body: 'This site is for <strong>informational and educational purposes only</strong>. Nothing here is financial advice. Do your own research and consult a qualified advisor before making investment decisions.',
      accept: "I Understand",
    },
    riskBanner: {
      label: "Risk Warning: ",
      text: "Crypto assets are volatile. You may lose your entire investment. This site is for educational purposes only.",
    },
    header: { slogan: "Canada's Bitcoin guide" },
    tabs: { dashboard: "Home", dca: "DCA", learn: "Learn", tools: "Tools", affiliates: "Start" },
    dashboard: {
      welcome: "Welcome to BTC Planner",
      subtitle: "Canada's all-in-one Bitcoin starting point — learn about buying, storing, and stacking BTC.",
      priceLabel: "BTC Price (CAD)",
      change24: "24h Change",
      vsYesterday: "vs yesterday",
      fearGreed: "Fear & Greed",
      sentiment: "Market sentiment",
      satoshi: "1 Satoshi",
      satUnit: "Smallest BTC unit",
      loading: "Loading...",
      perfTitle: "BTC Price Performance (CAD)",
      perfLoading: "Loading...",
      ma200: "200-Day Moving Average",
      perfDisclaimer: "Past performance is not indicative of future results.",
      halvingTitle: "Bitcoin Halving Countdown",
      halvingDesc: "Approximately every 4 years (every 210,000 blocks), the Bitcoin mining reward is cut in half. This event is called \"the halving.\" It reduces the rate of new Bitcoin entering circulation. Historically, each halving has reduced the supply of new BTC while existing demand remained or grew.",
      halvingNext: "Next Halving (Est.)",
      halvingBlock: "~April 2028 — Block 1,050,000",
      halvingReward: "Reward drops from 3.125 BTC to 1.5625 BTC per block",
      halvingLearn: "Learn more about Bitcoin",
      halvingLink: "How Bitcoin works (bitcoin.org)",
      originsTitle: "Bitcoin Origins",
      originsP1: 'Bitcoin was introduced in 2008 by the pseudonymous <strong>Satoshi Nakamoto</strong>, who published a whitepaper titled "Bitcoin: A Peer-to-Peer Electronic Cash System." On January 3, 2009, the first block (the "genesis block") was mined, containing the text: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks."',
      originsP2: "Satoshi Nakamoto's identity remains unknown. They communicated through email and forum posts, and stopped public communication in late 2010.",
      originsLink: "Read the Bitcoin Whitepaper (PDF)",
      powerTitle: "Bitcoin Power Law Model",
      powerScale: "Log scale",
      powerDesc: "The Bitcoin Power Law is a mathematical model that maps Bitcoin's price over time on a logarithmic scale. It suggests that Bitcoin's long-term price has followed a corridor driven by network adoption. On a log-log chart, Bitcoin's price has traced a relatively straight line since inception, through multiple market cycles.",
      powerActual: "Actual price",
      powerModel: "Power Law model",
      powerLink: "View the interactive Bitcoin Power Law chart",
      powerDisclaimer: "The Power Law is a mathematical model, not a guarantee. Past patterns do not predict future performance.",
      stepsTitle: "Getting Started in 3 Steps",
      step1Title: "Buy Bitcoin",
      step1Body: "Use a Canadian-friendly exchange to purchase Bitcoin. Fund via Interac e-Transfer or bank deposit.",
      step2Title: "Set up",
      step2Link: "DCA (Dollar Cost Averaging)",
      step2Body: "DCA means buying a fixed dollar amount of Bitcoin on a regular schedule — weekly, bi-weekly, or monthly — regardless of the current price. Over time, this averages out your purchase price.",
      step3Title: "Move to cold storage",
      step3Body: "Use a hardware wallet to store your Bitcoin offline.",
      step3Keys: "Your keys, your Bitcoin",
      step3Warn: " — keeping coins on an exchange means a third party controls your private keys.",
    },
    dca: {
      title: "DCA Calculator",
      subtitle: "Dollar Cost Averaging — buy a fixed amount of Bitcoin on a regular schedule.",
      planTitle: "Your DCA Plan",
      amountLabel: "Amount (CAD $)",
      placeholder: "Enter amount",
      freqLabel: "Frequency",
      weekly: "Weekly",
      monthly: "Monthly",
      duration: "Duration",
      years: "years",
      totalInvested: "Total Invested",
      cadOver: "CAD over",
      projectedValue: "Projected Value*",
      returnModel: "return (historical avg. model)",
      disclaimer: "Projections are based on Bitcoin's historical average growth and are not a guarantee of future returns. Bitcoin is volatile. Only invest what you can afford to lose. This is not financial advice.",
    },
    learn: {
      title: "Bitcoin 101",
      subtitle: "Key information for Canadians considering Bitcoin.",
      taxTitle: "Canadian Bitcoin Tax Basics",
      capitalGains: "Capital Gains",
      capitalGainsVal: "50% of gains included in taxable income",
      taxableEvents: "Taxable Events",
      taxableEventsVal: "Selling, trading, or spending BTC",
      holding: "Holding",
      holdingVal: "Not taxable until you sell or trade",
      taxTools: "Tax Tools",
      taxToolsVal: "Koinly, CoinTracker (CRA compatible)",
    },
    tools: {
      satsTitle: "Sats Converter",
      satsLabel: "CAD Amount ($)",
      satsPlaceholder: "Enter amount",
      satsPrompt: "Enter an amount above",
      satoshis: "satoshis",
      sentimentTitle: "Market Sentiment",
      fgIndex: "Fear & Greed Index",
      extremeFear: "Extreme Fear",
      extremeGreed: "Extreme Greed",
      chatTitle: "BTC Planner AI Guide",
      chatOnline: "Online",
      chatWelcome: "I'm the BTC Planner AI guide — here to help you learn about Bitcoin. I'm an educational tool only, not a financial advisor. Ask me anything like 'what is a hardware wallet?' or 'how does DCA work?'",
      chatPlaceholder: "Ask anything about Bitcoin...",
      chatSend: "Send",
      chatError: "Connection issue — try again in a moment!",
    },
    start: {
      title: "Get Started",
      subtitle: "Tools and services available to Canadian Bitcoin users.",
      disclosure: "Some links on btcplanner.ca are affiliate links. If you sign up through our link, we may receive a commission at no extra cost to you.",
    },
    footer: {
      terms: "Terms of Use",
      privacy: "Privacy Policy",
      affiliate: "Affiliate Disclosure",
      risk: "Risk Warning",
      footerText: "btcplanner.ca is for educational purposes only — not financial advice. Cryptocurrency investments involve significant risk including loss of capital. BTC Planner is not a registered investment advisor. Consult a qualified financial advisor.",
    },
    faqs: [
      { q: "Is Bitcoin legal in Canada?", a: "Yes. Bitcoin is legal in Canada. The CRA treats it as a commodity. Capital gains tax applies when you sell. 50% of gains are included in your taxable income." },
      { q: "What is cold storage?", a: "Cold storage refers to keeping Bitcoin offline using a hardware wallet such as Trezor or Ledger. This reduces the risk of online theft. Private keys never touch the internet." },
      { q: "What is DCA (Dollar Cost Averaging)?", a: "DCA means buying a fixed dollar amount of Bitcoin on a regular schedule (e.g. weekly or monthly) regardless of the current price. Over time, this averages out your cost basis." },
      { q: "How much Bitcoin can I buy?", a: "Bitcoin is divisible to 8 decimal places. The smallest unit (0.00000001 BTC) is called a satoshi. You can buy any amount — there is no minimum beyond what your exchange requires." },
      { q: "How are Bitcoin taxes handled in Canada?", a: "Every sale, trade, or use of Bitcoin is a taxable event in Canada. Keep records of every transaction with date, CAD value, and amount. Tools like Koinly or CoinTracker integrate with Canadian exchanges and are CRA compatible." },
    ],
  },
  fr: {
    disclaimer: {
      title: "BTC Planner",
      body: 'Ce site est à des fins <strong>informatives et éducatives uniquement</strong>. Rien ici ne constitue un conseil financier. Faites vos propres recherches et consultez un conseiller qualifié avant de prendre des décisions d\'investissement.',
      accept: "Je comprends",
    },
    riskBanner: {
      label: "Avertissement : ",
      text: "Les cryptoactifs sont volatils. Vous pourriez perdre la totalité de votre investissement. Ce site est à des fins éducatives uniquement.",
    },
    header: { slogan: "Le guide Bitcoin du Canada" },
    tabs: { dashboard: "Accueil", dca: "DCA", learn: "Apprendre", tools: "Outils", affiliates: "Commencer" },
    dashboard: {
      welcome: "Bienvenue sur BTC Planner",
      subtitle: "Le point de départ Bitcoin tout-en-un du Canada — apprenez à acheter, stocker et accumuler du BTC.",
      priceLabel: "Prix BTC (CAD)",
      change24: "Variation 24h",
      vsYesterday: "vs hier",
      fearGreed: "Peur et Cupidité",
      sentiment: "Sentiment du marché",
      satoshi: "1 Satoshi",
      satUnit: "Plus petite unité BTC",
      loading: "Chargement...",
      perfTitle: "Performance du prix BTC (CAD)",
      perfLoading: "Chargement...",
      ma200: "Moyenne mobile 200 jours",
      perfDisclaimer: "Les performances passées ne garantissent pas les résultats futurs.",
      halvingTitle: "Compte à rebours du halving",
      halvingDesc: "Environ tous les 4 ans (tous les 210 000 blocs), la récompense de minage Bitcoin est divisée par deux. Cet événement est appelé le « halving ». Il réduit le taux de nouveaux Bitcoins mis en circulation. Historiquement, chaque halving a réduit l'offre de nouveaux BTC tandis que la demande existante est restée stable ou a augmenté.",
      halvingNext: "Prochain halving (est.)",
      halvingBlock: "~Avril 2028 — Bloc 1 050 000",
      halvingReward: "La récompense passe de 3,125 BTC à 1,5625 BTC par bloc",
      halvingLearn: "En savoir plus sur Bitcoin",
      halvingLink: "Comment fonctionne Bitcoin (bitcoin.org)",
      originsTitle: "Origines du Bitcoin",
      originsP1: 'Le Bitcoin a été introduit en 2008 par le pseudonyme <strong>Satoshi Nakamoto</strong>, qui a publié un livre blanc intitulé « Bitcoin: A Peer-to-Peer Electronic Cash System ». Le 3 janvier 2009, le premier bloc (le « bloc genèse ») a été miné, contenant le texte : « The Times 03/Jan/2009 Chancellor on brink of second bailout for banks. »',
      originsP2: "L'identité de Satoshi Nakamoto reste inconnue. Ils ont communiqué par courriel et forums, et ont cessé toute communication publique fin 2010.",
      originsLink: "Lire le livre blanc Bitcoin (PDF)",
      powerTitle: "Modèle de loi de puissance du Bitcoin",
      powerScale: "Échelle log",
      powerDesc: "La loi de puissance du Bitcoin est un modèle mathématique qui cartographie le prix du Bitcoin dans le temps sur une échelle logarithmique. Il suggère que la croissance du prix à long terme a suivi un corridor lié à l'adoption du réseau. Sur un graphique log-log, le prix du Bitcoin a tracé une ligne relativement droite depuis sa création, à travers de multiples cycles de marché.",
      powerActual: "Prix réel",
      powerModel: "Modèle loi de puissance",
      powerLink: "Voir le graphique interactif de la loi de puissance",
      powerDisclaimer: "La loi de puissance est un modèle mathématique, pas une garantie. Les tendances passées ne prédisent pas les performances futures.",
      stepsTitle: "Commencer en 3 étapes",
      step1Title: "Acheter du Bitcoin",
      step1Body: "Utilisez une plateforme d'échange disponible au Canada. Alimentez par virement Interac ou dépôt bancaire.",
      step2Title: "Configurer le",
      step2Link: "DCA (investissement progressif)",
      step2Body: "Le DCA consiste à acheter un montant fixe de Bitcoin selon un calendrier régulier — hebdomadaire, bimensuel ou mensuel — quel que soit le prix actuel. Au fil du temps, cela lisse votre prix d'achat.",
      step3Title: "Passer au stockage à froid",
      step3Body: "Utilisez un portefeuille matériel pour stocker votre Bitcoin hors ligne.",
      step3Keys: "Vos clés, votre Bitcoin",
      step3Warn: " — garder vos coins sur une plateforme signifie qu'un tiers contrôle vos clés privées.",
    },
    dca: {
      title: "Calculateur DCA",
      subtitle: "Investissement progressif — achetez un montant fixe de Bitcoin selon un calendrier régulier.",
      planTitle: "Votre plan DCA",
      amountLabel: "Montant (CAD $)",
      placeholder: "Entrez un montant",
      freqLabel: "Fréquence",
      weekly: "Hebdomadaire",
      monthly: "Mensuel",
      duration: "Durée",
      years: "ans",
      totalInvested: "Total investi",
      cadOver: "CAD sur",
      projectedValue: "Valeur projetée*",
      returnModel: "rendement (modèle moy. hist.)",
      disclaimer: "Les projections sont basées sur la croissance moyenne historique du Bitcoin et ne garantissent pas les rendements futurs. Le Bitcoin est volatil. N'investissez que ce que vous pouvez vous permettre de perdre. Ceci n'est pas un conseil financier.",
    },
    learn: {
      title: "Bitcoin 101",
      subtitle: "Informations clés pour les Canadiens qui s'intéressent au Bitcoin.",
      taxTitle: "Fiscalité Bitcoin au Canada",
      capitalGains: "Gains en capital",
      capitalGainsVal: "50 % des gains inclus dans le revenu imposable",
      taxableEvents: "Événements imposables",
      taxableEventsVal: "Vente, échange ou utilisation de BTC",
      holding: "Détention",
      holdingVal: "Non imposable tant que vous ne vendez pas",
      taxTools: "Outils fiscaux",
      taxToolsVal: "Koinly, CoinTracker (compatibles ARC)",
    },
    tools: {
      satsTitle: "Convertisseur Sats",
      satsLabel: "Montant CAD ($)",
      satsPlaceholder: "Entrez un montant",
      satsPrompt: "Entrez un montant ci-dessus",
      satoshis: "satoshis",
      sentimentTitle: "Sentiment du marché",
      fgIndex: "Indice Peur et Cupidité",
      extremeFear: "Peur extrême",
      extremeGreed: "Cupidité extrême",
      chatTitle: "Guide IA BTC Planner",
      chatOnline: "En ligne",
      chatWelcome: "Je suis le guide IA de BTC Planner — je suis là pour vous aider à apprendre sur le Bitcoin. Je suis un outil éducatif uniquement, pas un conseiller financier. Posez-moi n'importe quelle question !",
      chatPlaceholder: "Posez une question sur le Bitcoin...",
      chatSend: "Envoyer",
      chatError: "Problème de connexion — réessayez dans un moment !",
    },
    start: {
      title: "Commencer",
      subtitle: "Outils et services disponibles pour les utilisateurs Bitcoin canadiens.",
      disclosure: "Certains liens sur btcplanner.ca sont des liens d'affiliation. Si vous vous inscrivez via notre lien, nous pouvons recevoir une commission sans frais supplémentaires pour vous.",
    },
    footer: {
      terms: "Conditions d'utilisation",
      privacy: "Politique de confidentialité",
      affiliate: "Divulgation d'affiliation",
      risk: "Avertissement de risque",
      footerText: "btcplanner.ca est à des fins éducatives uniquement — pas un conseil financier. Les investissements en cryptomonnaie comportent des risques importants, y compris la perte de capital. BTC Planner n'est pas un conseiller en placement inscrit. Consultez un conseiller financier qualifié.",
    },
    faqs: [
      { q: "Le Bitcoin est-il légal au Canada ?", a: "Oui. Le Bitcoin est légal au Canada. L'ARC le traite comme une marchandise. L'impôt sur les gains en capital s'applique lors de la vente. 50 % des gains sont inclus dans votre revenu imposable." },
      { q: "Qu'est-ce que le stockage à froid ?", a: "Le stockage à froid consiste à garder du Bitcoin hors ligne à l'aide d'un portefeuille matériel comme Trezor ou Ledger. Cela réduit le risque de vol en ligne. Les clés privées ne touchent jamais Internet." },
      { q: "Qu'est-ce que le DCA ?", a: "Le DCA consiste à acheter un montant fixe de Bitcoin selon un calendrier régulier (par exemple hebdomadaire ou mensuel), quel que soit le prix actuel. Au fil du temps, cela lisse votre coût moyen." },
      { q: "Combien de Bitcoin puis-je acheter ?", a: "Le Bitcoin est divisible jusqu'à 8 décimales. La plus petite unité (0,00000001 BTC) s'appelle un satoshi. Vous pouvez acheter n'importe quel montant — il n'y a pas de minimum au-delà de ce que votre plateforme exige." },
      { q: "Comment sont imposés les Bitcoin au Canada ?", a: "Chaque vente, échange ou utilisation de Bitcoin est un événement imposable au Canada. Gardez des registres de chaque transaction avec la date, la valeur en CAD et le montant. Des outils comme Koinly ou CoinTracker s'intègrent aux plateformes canadiennes et sont compatibles avec l'ARC." },
    ],
  },
};

function DisclaimerModal({ onAccept, t }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999, padding: 16,
    }} role="dialog" aria-modal="true" aria-label={t.disclaimer.title}>
      <div style={{
        background: "#fff", border: "1px solid #E5E7EB",
        borderRadius: 16, maxWidth: 400, width: "100%",
        padding: "28px 24px", boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "#F7931A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0 }} aria-hidden="true">₿</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: "#1D1D1B" }}>{t.disclaimer.title}</div>
        </div>
        <div style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.8, marginBottom: 24 }} dangerouslySetInnerHTML={{ __html: t.disclaimer.body }} />
        <button onClick={onAccept} style={{
          width: "100%", background: "#F7931A", border: "none", borderRadius: 10,
          padding: "14px 0", color: "#fff", fontWeight: 700, fontSize: 15,
          fontFamily: "'Space Grotesk', sans-serif", cursor: "pointer",
        }}>
          {t.disclaimer.accept}
        </button>
      </div>
    </div>
  );
}

function RiskBanner({ t }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div role="alert" style={{
      background: "#FFF7ED", borderBottom: "1px solid #F7931A",
      padding: "8px 24px", display: "flex", alignItems: "center",
      justifyContent: "space-between", gap: 12,
    }}>
      <div style={{ fontSize: 12, color: "#4B5563", lineHeight: 1.5 }}>
        <span style={{ color: "#F7931A", fontWeight: 600 }}>{t.riskBanner.label}</span>
        {t.riskBanner.text}
      </div>
      <button onClick={() => setVisible(false)} aria-label="Dismiss risk warning" style={{ background: "none", border: "none", color: "#9CA3AF", fontSize: 18, cursor: "pointer", flexShrink: 0 }}>✕</button>
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
    category: { en: "Bitcoin Exchanges for Canadians", fr: "Plateformes d'échange Bitcoin pour les Canadiens" },
    items: [
      { name: "Kraken", desc: { en: "Global exchange with advanced trading and low fees.", fr: "Plateforme mondiale avec trading avancé et frais réduits." }, url: "https://invite.kraken.com/JDNW/rvqfaxbg", color: "#7B61FF" },
      { name: "Newton", desc: { en: "Canadian exchange with zero-commission trading and Interac funding.", fr: "Plateforme canadienne sans commission avec financement Interac." }, url: "https://www.newton.co", color: "#00C281" },
      { name: "Shakepay", desc: { en: "Buy and earn Bitcoin with instant Interac deposits in Canada.", fr: "Achetez et gagnez du Bitcoin avec des dépôts Interac instantanés au Canada." }, url: "https://shakepay.me/r/K0D39LJ", color: "#F7931A" },
      { name: "Coinbase", desc: { en: "One of the world's largest exchanges with a simple interface.", fr: "L'une des plus grandes plateformes au monde avec une interface simple." }, url: "https://coinbase.com/join/LJZZEMM?src=ios-link", color: "#0052FF" },
    ]
  },
  {
    category: { en: "Bitcoin-Backed Loans", fr: "Prêts adossés au Bitcoin" },
    items: [
      { name: "Ledn", desc: { en: "Borrow against your Bitcoin without selling it — keep your stack and access liquidity.", fr: "Empruntez contre votre Bitcoin sans le vendre — gardez votre stack et accédez à des liquidités." }, url: "https://www.ledn.io", color: "#1A1A2E" },
    ]
  },
  {
    category: { en: "Cold Storage", fr: "Stockage à froid" },
    items: [
      { name: "Trezor", desc: { en: "Open-source hardware wallet for secure offline Bitcoin storage.", fr: "Portefeuille matériel open-source pour le stockage hors ligne sécurisé." }, url: "https://www.trezor.io", color: "#00854D" },
      { name: "Ledger", desc: { en: "Hardware wallet with mobile app support and broad asset coverage.", fr: "Portefeuille matériel avec application mobile et large couverture d'actifs." }, url: "https://shop.ledger.com/?r=a8b2555293e6", color: "#000000" },
    ]
  }
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

function CanadaFlag({ size = 20 }) {
  return <span style={{ fontSize: size, lineHeight: 1, display: "inline-block", verticalAlign: "middle" }} role="img" aria-label="Canada">🇨🇦</span>;
}

function PowerLawChart({ data, t }) {
  const maxVal = Math.max(...data.map(d => Math.max(d.actual, d.model)));
  const logScale = (v) => Math.log10(Math.max(v, 1)) / Math.log10(maxVal) * 100;
  return (
    <div style={{ position: "relative", height: 140, padding: "8px 0" }} role="img" aria-label="Bitcoin Power Law chart showing price vs model from 2012 to 2025">
      <svg width="100%" height="100%" viewBox="0 0 400 140" preserveAspectRatio="none" aria-hidden="true">
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
        }} aria-hidden="true" />
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
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("btcplanner_lang") || "en"; } catch { return "en"; }
  });
  const t = translations[lang];
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(() => {
    try { return sessionStorage.getItem("btcplanner_disclaimer") === "1"; } catch { return false; }
  });
  const [btcPrice, setBtcPrice] = useState(null);
  const [priceChange, setPriceChange] = useState(null);
  const [priceChanges, setPriceChanges] = useState(null);
  const [movingAvg200, setMovingAvg200] = useState(null);
  const [fearGreed, setFearGreed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dcaAmount, setDcaAmount] = useState(100);
  const [dcaFreq, setDcaFreq] = useState("weekly");
  const [dcaYears, setDcaYears] = useState(3);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [openFaq, setOpenFaq] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", text: t.tools.chatWelcome }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const [satsAmount, setSatsAmount] = useState(100);

  const toggleLang = () => {
    const next = lang === "en" ? "fr" : "en";
    setLang(next);
    try { localStorage.setItem("btcplanner_lang", next); } catch {}
  };

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        const [priceRes, fgRes, chartRes] = await Promise.all([
          fetch("https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false", { signal: controller.signal }),
          fetch("https://api.alternative.me/fng/", { signal: controller.signal }),
          fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=cad&days=1825&interval=daily", { signal: controller.signal })
        ]);
        const priceData = await priceRes.json();
        const fgData = await fgRes.json();
        const md = priceData.market_data;
        setBtcPrice({ cad: md.current_price.cad, usd: md.current_price.usd });
        setPriceChange(md.price_change_percentage_24h?.toFixed(2));
        setPriceChanges({
          d1: md.price_change_percentage_24h,
          d7: md.price_change_percentage_7d,
          d30: md.price_change_percentage_30d,
          y1: md.price_change_percentage_1y,
          y3: null,
          y5: null,
        });
        setFearGreed({ value: fgData.data[0].value, label: fgData.data[0].value_classification });
        try {
          const chartData = await chartRes.json();
          if (chartData.prices && chartData.prices.length > 0) {
            const prices = chartData.prices.map(p => p[1]);
            const last200 = prices.slice(-200);
            const avg = last200.reduce((a, b) => a + b, 0) / last200.length;
            setMovingAvg200(avg);
            const currentPrice = prices[prices.length - 1];
            const y3Price = prices.length > 1095 ? prices[prices.length - 1095] : null;
            const y5Price = prices.length > 1825 ? prices[0] : null;
            setPriceChanges(prev => ({
              ...prev,
              y3: y3Price ? ((currentPrice - y3Price) / y3Price) * 100 : null,
              y5: y5Price ? ((currentPrice - y5Price) / y5Price) * 100 : null,
            }));
          }
        } catch {}
      } catch (e) {
        if (e.name !== "AbortError") {
          // Leave values as null — UI will show dashes
        }
      }
      setLoading(false);
    }
    fetchData();
    return () => controller.abort();
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

  const chatSystemPrompt = `You are a Bitcoin education assistant on BTCPlanner.ca, a Canadian Bitcoin information site. Your role is strictly educational.${lang === "fr" ? " Respond in French." : ""}

CRITICAL RULES:
1. NEVER tell anyone to buy, sell, or hold Bitcoin or any asset. You are NOT a financial advisor.
2. NEVER predict prices or say Bitcoin will go up or down.
3. NEVER recommend specific investment amounts or portfolio allocations.
4. If anyone asks "should I buy Bitcoin?" — explain what Bitcoin is and how it works, then say: "I cannot give investment advice. Please consult a licensed financial advisor."
5. End any response touching on investment decisions with: "This is educational information only — not financial advice."
6. Mention Canadian context (CRA taxes, CAD, Canadian exchanges) where relevant.
7. Keep answers concise (2-4 sentences) and factual.
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
      const reply = data.content?.[0]?.text || (lang === "fr" ? "Désolé, je n'ai pas pu obtenir de réponse. Réessayez !" : "Sorry, I couldn't get a response. Try again!");
      setChatMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setChatMessages(prev => [...prev, { role: "assistant", text: t.tools.chatError }]);
    }
    setChatLoading(false);
  }

  const fgColor = fearGreed ? (fearGreed.value > 60 ? COLORS.green : fearGreed.value > 40 ? COLORS.orange : COLORS.red) : COLORS.textMuted;
  const tabs = [
    { id: "dashboard", label: t.tabs.dashboard },
    { id: "dca", label: t.tabs.dca },
    { id: "learn", label: t.tabs.learn },
    { id: "tools", label: t.tabs.tools },
    { id: "affiliates", label: t.tabs.affiliates },
  ];

  const faqs = t.faqs;

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.textPrimary, fontFamily: "'Inter', sans-serif" }} lang={lang}>
      {!disclaimerAccepted && <DisclaimerModal t={t} onAccept={() => {
        setDisclaimerAccepted(true);
        try { sessionStorage.setItem("btcplanner_disclaimer", "1"); } catch {}
      }} />}
      <RiskBanner t={t} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        input, select { outline: none; }
        button:hover { opacity: 0.85; cursor: pointer; }
        a:hover { opacity: 0.85; }
        :focus-visible { outline: 2px solid ${COLORS.orange}; outline-offset: 2px; }
      `}</style>

      <header style={{ borderBottom: `1px solid ${COLORS.cardBorder}`, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: COLORS.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0 }} aria-hidden="true">
            ₿
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: COLORS.textPrimary, letterSpacing: "-0.3px" }}>
                BTCPLANNER.CA
              </span>
              <CanadaFlag size={18} />
            </div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, letterSpacing: "0.04em" }}>
              {t.header.slogan}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={toggleLang} aria-label={lang === "en" ? "Passer au français" : "Switch to English"} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "6px 12px", fontSize: 13, fontWeight: 600, color: COLORS.textPrimary, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            {lang === "en" ? "FR" : "EN"}
          </button>
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
      </header>

      <nav style={{ display: "flex", borderBottom: `1px solid ${COLORS.cardBorder}`, background: "#fff" }} aria-label="Main navigation">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} aria-current={activeTab === tab.id ? "page" : undefined} style={{
            flex: 1, padding: "12px 0", background: "none", border: "none",
            color: activeTab === tab.id ? COLORS.orange : COLORS.textMuted,
            borderBottom: activeTab === tab.id ? `2px solid ${COLORS.orange}` : "2px solid transparent",
            fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
            whiteSpace: "nowrap", textAlign: "center",
          }}>
            {tab.label}
          </button>
        ))}
      </nav>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>

        {activeTab === "dashboard" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 700 }}>{t.dashboard.welcome}</h1>
                <CanadaFlag size={24} />
              </div>
              <p style={{ color: COLORS.textSub, fontSize: 14 }}>{t.dashboard.subtitle}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
              <StatCard label={t.dashboard.priceLabel} value={loading ? t.dashboard.loading : btcPrice ? `$${btcPrice.cad.toLocaleString()}` : "—"} sub={btcPrice ? `$${btcPrice.usd.toLocaleString()} USD` : ""} color={COLORS.orange} pulse={!!btcPrice} />
              <StatCard label={t.dashboard.change24} value={loading ? "—" : priceChange != null ? `${priceChange > 0 ? "+" : ""}${priceChange}%` : "—"} sub={t.dashboard.vsYesterday} color={priceChange != null ? (Number(priceChange) > 0 ? COLORS.green : COLORS.red) : COLORS.textMuted} />
              <StatCard label={t.dashboard.fearGreed} value={loading ? "—" : fearGreed ? `${fearGreed.value} — ${fearGreed.label}` : "—"} sub={t.dashboard.sentiment} color={fgColor} />
              <StatCard label={t.dashboard.satoshi} value={loading ? "—" : btcPrice ? `$${((1 / 100_000_000) * btcPrice.cad).toFixed(6)}` : "—"} sub={t.dashboard.satUnit} color={COLORS.orange} />
            </div>

            <section style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24, marginBottom: 16 }} aria-label={t.dashboard.perfTitle}>
              <h2 style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 16, fontSize: 16 }}>{t.dashboard.perfTitle}</h2>
              {priceChanges ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))", gap: 12, marginBottom: 16 }}>
                  {[
                    { label: "24h", val: priceChanges.d1 },
                    { label: "7d", val: priceChanges.d7 },
                    { label: "30d", val: priceChanges.d30 },
                    { label: "1y", val: priceChanges.y1 },
                    { label: "3y", val: priceChanges.y3 },
                    { label: "5y", val: priceChanges.y5 },
                  ].map(p => (
                    <div key={p.label} style={{ background: "#fff", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "12px 14px", textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{p.label}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: p.val != null ? (p.val >= 0 ? COLORS.green : COLORS.red) : COLORS.textMuted }}>
                        {p.val != null ? `${p.val >= 0 ? "+" : ""}${p.val.toFixed(1)}%` : "—"}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 16 }}>{t.dashboard.perfLoading}</div>
              )}
              {movingAvg200 && (
                <div style={{ background: COLORS.orangeLight, borderRadius: 8, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: COLORS.textSub }}>{t.dashboard.ma200}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: COLORS.orange }}>${Math.round(movingAvg200).toLocaleString()} CAD</span>
                </div>
              )}
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 10 }}>{t.dashboard.perfDisclaimer}</div>
            </section>

            <section style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24, marginBottom: 16 }} aria-label={t.dashboard.halvingTitle}>
              <h2 style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 12, fontSize: 16 }}>{t.dashboard.halvingTitle}</h2>
              <p style={{ fontSize: 14, color: COLORS.textSub, lineHeight: 1.7, marginBottom: 16 }}>
                {t.dashboard.halvingDesc}
              </p>
              <div style={{ background: COLORS.orangeLight, borderRadius: 8, padding: 16, marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.dashboard.halvingNext}</div>
                <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: COLORS.orange }}>
                  {t.dashboard.halvingBlock}
                </div>
                <div style={{ fontSize: 13, color: COLORS.textSub, marginTop: 6 }}>
                  {t.dashboard.halvingReward}
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 13 }}>
                <button onClick={() => { setActiveTab("learn"); window.scrollTo(0, 0); }} style={{ background: "none", border: "none", color: COLORS.orange, textDecoration: "underline", cursor: "pointer", padding: 0, fontFamily: "'Inter', sans-serif", fontSize: 13 }}>
                  {t.dashboard.halvingLearn} →
                </button>
                <a href="https://www.bitcoin.org/en/how-it-works" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.orange, textDecoration: "underline" }}>
                  {t.dashboard.halvingLink} →
                </a>
              </div>
            </section>

            <section style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24, marginBottom: 16 }} aria-label={t.dashboard.originsTitle}>
              <h2 style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 12, fontSize: 16 }}>{t.dashboard.originsTitle}</h2>
              <div style={{ fontSize: 14, color: COLORS.textSub, lineHeight: 1.7, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: t.dashboard.originsP1 }} />
              <p style={{ fontSize: 14, color: COLORS.textSub, lineHeight: 1.7, marginBottom: 16 }}>
                {t.dashboard.originsP2}
              </p>
              <a href="https://bitcoin.org/bitcoin.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: COLORS.orange, textDecoration: "underline" }}>
                {t.dashboard.originsLink} →
              </a>
            </section>

            <section style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24, marginBottom: 24 }} aria-label={t.dashboard.powerTitle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <h2 style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", fontSize: 16 }}>{t.dashboard.powerTitle}</h2>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>{t.dashboard.powerScale}</div>
              </div>
              <p style={{ fontSize: 13, color: COLORS.textSub, marginBottom: 8, lineHeight: 1.7 }}>
                {t.dashboard.powerDesc}
              </p>
              <PowerLawChart data={powerLawData} t={t} />
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8, fontSize: 12, color: COLORS.textMuted }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 16, height: 2, background: COLORS.orange, display: "inline-block", borderRadius: 1 }} aria-hidden="true" /> {t.dashboard.powerActual}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 16, height: 2, background: COLORS.orange, opacity: 0.5, display: "inline-block", borderRadius: 1, borderTop: "1px dashed", borderBottom: "1px dashed" }} aria-hidden="true" /> {t.dashboard.powerModel}
                </span>
              </div>
              <div style={{ marginTop: 10 }}>
                <a href="https://charts.bitbo.io/long-term-power-law/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: COLORS.orange, textDecoration: "underline" }}>
                  {t.dashboard.powerLink} →
                </a>
              </div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 6 }}>
                {t.dashboard.powerDisclaimer}
              </div>
            </section>

            <section style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }} aria-label={t.dashboard.stepsTitle}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <h2 style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", fontSize: 16 }}>{t.dashboard.stepsTitle}</h2>
                <CanadaFlag size={16} />
              </div>
              {[
                { step: "1", title: t.dashboard.step1Title, body: <>{t.dashboard.step1Body} <a href="https://invite.kraken.com/JDNW/rvqfaxbg" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.orange, textDecoration: "underline" }}>Kraken</a> · <a href="https://coinbase.com/join/LJZZEMM?src=ios-link" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.orange, textDecoration: "underline" }}>Coinbase</a> · <a href="https://shakepay.me/r/K0D39LJ" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.orange, textDecoration: "underline" }}>Shakepay</a></> },
                { step: "2", title: <>{t.dashboard.step2Title} <button onClick={() => { setActiveTab("dca"); window.scrollTo(0, 0); }} style={{ background: "none", border: "none", color: COLORS.orange, textDecoration: "underline", fontWeight: 600, fontSize: "inherit", fontFamily: "inherit", cursor: "pointer", padding: 0 }}>{t.dashboard.step2Link}</button></>, body: t.dashboard.step2Body },
                { step: "3", title: t.dashboard.step3Title, body: <>{t.dashboard.step3Body} <a href="https://www.trezor.io" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.orange, textDecoration: "underline" }}>Trezor</a> · <a href="https://shop.ledger.com/?r=a8b2555293e6" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.orange, textDecoration: "underline" }}>Ledger</a>. <a href="https://bitcoin.org/en/secure-your-wallet" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.orange, textDecoration: "underline" }}>{t.dashboard.step3Keys}</a>{t.dashboard.step3Warn}</> },
              ].map(s => (
                <div key={s.step} style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "flex-start" }}>
                  <div style={{ minWidth: 32, height: 32, borderRadius: "50%", background: COLORS.orange, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "#fff" }} aria-hidden="true">{s.step}</div>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{s.title}</div>
                    <div style={{ fontSize: 14, color: COLORS.textSub, lineHeight: 1.6 }}>{s.body}</div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}

        {activeTab === "dca" && (
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{t.dca.title}</h2>
            <p style={{ color: COLORS.textSub, fontSize: 14, marginBottom: 24 }}>{t.dca.subtitle}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }}>
                <div style={{ fontWeight: 600, marginBottom: 20, fontFamily: "'Space Grotesk', sans-serif" }}>{t.dca.planTitle}</div>
                <div style={{ marginBottom: 16 }}>
                  <label htmlFor="dca-amount" style={{ fontSize: 13, color: COLORS.textMuted, display: "block", marginBottom: 6 }}>{t.dca.amountLabel}</label>
                  <input id="dca-amount" type="text" inputMode="numeric" value={dcaAmount === "" ? "" : dcaAmount} onChange={e => handleAmountInput(e.target.value, setDcaAmount)} placeholder={t.dca.placeholder}
                    style={{ width: "100%", background: "#fff", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "10px 14px", color: COLORS.textPrimary, fontSize: 16, fontFamily: "'Space Grotesk', sans-serif" }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label htmlFor="dca-freq" style={{ fontSize: 13, color: COLORS.textMuted, display: "block", marginBottom: 6 }}>{t.dca.freqLabel}</label>
                  <select id="dca-freq" value={dcaFreq} onChange={e => setDcaFreq(e.target.value)}
                    style={{ width: "100%", background: "#fff", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "10px 14px", color: COLORS.textPrimary, fontSize: 14 }}>
                    <option value="weekly">{t.dca.weekly}</option>
                    <option value="monthly">{t.dca.monthly}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="dca-years" style={{ fontSize: 13, color: COLORS.textMuted, display: "block", marginBottom: 6 }}>{t.dca.duration}: {dcaYears} {t.dca.years}</label>
                  <input id="dca-years" type="range" min={1} max={10} value={dcaYears} onChange={e => setDcaYears(Number(e.target.value))}
                    style={{ width: "100%", accentColor: COLORS.orange }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: COLORS.textMuted }}>
                    <span>1</span><span>5</span><span>10</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24, flex: 1 }}>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{t.dca.totalInvested}</div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.textPrimary, fontFamily: "'Space Grotesk', sans-serif" }}>{dcaResult.totalInvested}</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>{t.dca.cadOver} {dcaYears} {t.dca.years}</div>
                </div>
                <div style={{ background: COLORS.orangeLight, border: `1px solid ${COLORS.orange}55`, borderRadius: 12, padding: 24, flex: 1 }}>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{t.dca.projectedValue}</div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.orange, fontFamily: "'Space Grotesk', sans-serif" }}>{dcaResult.projectedValue}</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>{dcaResult.multiplier}x {t.dca.returnModel}</div>
                </div>
              </div>
            </div>

            <div role="note" style={{ background: COLORS.orangeLight, border: `1px solid ${COLORS.orange}44`, borderRadius: 8, padding: 16, fontSize: 12, color: COLORS.textSub }}>
              <strong>{lang === "en" ? "Disclaimer:" : "Avertissement :"}</strong> {t.dca.disclaimer}
            </div>
          </div>
        )}

        {activeTab === "learn" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700 }}>{t.learn.title}</h2>
              <CanadaFlag size={20} />
            </div>
            <p style={{ color: COLORS.textSub, fontSize: 14, marginBottom: 24 }}>{t.learn.subtitle}</p>

            <div style={{ marginBottom: 24 }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, marginBottom: 10, overflow: "hidden" }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} style={{
                    width: "100%", background: "none", border: "none", padding: "16px 20px", textAlign: "left",
                    color: COLORS.textPrimary, fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 15,
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}>
                    {faq.q}
                    <span style={{ color: COLORS.orange, fontSize: 20, fontWeight: 300, marginLeft: 12 }} aria-hidden="true">{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "0 20px 16px", color: COLORS.textSub, fontSize: 14, lineHeight: 1.7, borderTop: `1px solid ${COLORS.cardBorder}`, paddingTop: 16 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <section style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }} aria-label={t.learn.taxTitle}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <h3 style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>{t.learn.taxTitle}</h3>
                <CanadaFlag size={16} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { label: t.learn.capitalGains, val: t.learn.capitalGainsVal },
                  { label: t.learn.taxableEvents, val: t.learn.taxableEventsVal },
                  { label: t.learn.holding, val: t.learn.holdingVal },
                  { label: t.learn.taxTools, val: t.learn.taxToolsVal },
                ].map(item => (
                  <div key={item.label} style={{ background: "#fff", borderRadius: 8, padding: 14, border: `1px solid ${COLORS.cardBorder}` }}>
                    <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: COLORS.textPrimary }}>{item.val}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

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
                <section style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24, marginBottom: 24 }} aria-label={t.tools.satsTitle}>
                  <h2 style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 16, fontSize: 16 }}>{t.tools.satsTitle}</h2>
                  <div style={{ marginBottom: 16 }}>
                    <label htmlFor="sats-amount" style={{ fontSize: 13, color: COLORS.textMuted, display: "block", marginBottom: 6 }}>{t.tools.satsLabel}</label>
                    <input id="sats-amount" type="text" inputMode="numeric" value={satsAmount === "" ? "" : satsAmount} onChange={e => handleAmountInput(e.target.value, setSatsAmount)} placeholder={t.tools.satsPlaceholder}
                      style={{ width: "100%", background: "#fff", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "10px 14px", color: COLORS.textPrimary, fontSize: 16, fontFamily: "'Space Grotesk', sans-serif" }} />
                  </div>
                  <div style={{ background: COLORS.orangeLight, borderRadius: 8, padding: 16, textAlign: "center" }} aria-live="polite">
                    <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 4 }}>{numSats > 0 ? `$${numSats} CAD =` : t.tools.satsPrompt}</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.orange, fontFamily: "'Space Grotesk', sans-serif" }}>{numSats > 0 ? `${cadToSats} sats` : "—"}</div>
                    {numSats > 0 && <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>{t.tools.satoshis}</div>}
                  </div>
                </section>

                <section style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }} aria-label={t.tools.sentimentTitle}>
                  <h2 style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 12, fontSize: 16 }}>{t.tools.sentimentTitle}</h2>
                  {fearGreed ? (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 13, color: COLORS.textMuted }}>{t.tools.fgIndex}</span>
                        <span style={{ fontSize: 13, color: fgColor, fontWeight: 600 }}>{fearGreed.label}</span>
                      </div>
                      <div style={{ background: "#E5E7EB", borderRadius: 6, height: 12, overflow: "hidden" }} role="meter" aria-valuenow={fearGreed.value} aria-valuemin={0} aria-valuemax={100} aria-label={t.tools.fgIndex}>
                        <div style={{ width: `${fearGreed.value}%`, height: "100%", background: `linear-gradient(90deg, ${COLORS.red}, ${COLORS.orange}, ${COLORS.green})`, borderRadius: 6, transition: "width 1s ease" }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: COLORS.textMuted }}>
                        <span>{t.tools.extremeFear}</span><span>{fearGreed.value}/100</span><span>{t.tools.extremeGreed}</span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontSize: 14, color: COLORS.textMuted }}>—</div>
                  )}
                </section>
              </div>

              <section className="chat-window" style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, display: "flex", flexDirection: "column", minHeight: 380 }} aria-label={t.tools.chatTitle}>
                <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.cardBorder}`, display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff", fontWeight: 700 }} aria-hidden="true">₿</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{t.tools.chatTitle}</div>
                    <div style={{ fontSize: 11, color: COLORS.green }}>{t.tools.chatOnline}</div>
                  </div>
                </div>
                <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }} aria-live="polite">
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
                    <div style={{ display: "flex", gap: 4, padding: "8px 14px", background: "#fff", border: `1px solid ${COLORS.cardBorder}`, borderRadius: "16px 16px 16px 4px", width: "fit-content" }} aria-label={lang === "en" ? "Loading response" : "Chargement"}>
                      {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.textMuted, animation: `pulse ${0.6 + i * 0.2}s infinite` }} />)}
                    </div>
                  )}
                </div>
                <div style={{ padding: 12, borderTop: `1px solid ${COLORS.cardBorder}`, display: "flex", gap: 8 }}>
                  <label htmlFor="chat-input" className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>{t.tools.chatPlaceholder}</label>
                  <input id="chat-input" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()}
                    placeholder={t.tools.chatPlaceholder}
                    style={{ flex: 1, background: "#fff", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "10px 14px", color: COLORS.textPrimary, fontSize: 13, fontFamily: "'Inter', sans-serif" }} />
                  <button onClick={sendChat} style={{ background: COLORS.orange, border: "none", borderRadius: 8, padding: "10px 16px", color: "#fff", fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
                    {t.tools.chatSend}
                  </button>
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === "affiliates" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700 }}>{t.start.title}</h2>
              <CanadaFlag size={20} />
            </div>
            <p style={{ color: COLORS.textSub, fontSize: 14, marginBottom: 24 }}>{t.start.subtitle}</p>

            {affiliates.map((cat, ci) => (
              <section key={ci} style={{ marginBottom: 32 }} aria-label={cat.category[lang]}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: COLORS.textMuted, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>{cat.category[lang]}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {cat.items.map((item, ii) => (
                    <a key={ii} href={item.url} target="_blank" rel="noopener noreferrer" style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, textDecoration: "none", color: "inherit" }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: item.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0 }} aria-hidden="true">{item.name[0]}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.textPrimary }}>{item.name}</div>
                        <div style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.4 }}>{item.desc[lang]}</div>
                      </div>
                      <span style={{ color: COLORS.orange, fontSize: 18, flexShrink: 0 }} aria-hidden="true">→</span>
                    </a>
                  ))}
                </div>
              </section>
            ))}

            <div role="note" style={{ background: COLORS.orangeLight, border: `1px solid ${COLORS.orange}44`, borderRadius: 8, padding: 16, fontSize: 12, color: COLORS.textSub }}>
              <strong>{lang === "en" ? "Affiliate Disclosure:" : "Divulgation d'affiliation :"}</strong> {t.start.disclosure}
            </div>
          </div>
        )}

      </main>

      <footer style={{ borderTop: `1px solid ${COLORS.cardBorder}`, padding: "28px 24px", background: COLORS.card, marginTop: 40 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: COLORS.textMuted, fontSize: 14 }}>BTCPLANNER.CA</span>
            <CanadaFlag size={14} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 12, flexWrap: "wrap" }}>
            {[
              { label: t.footer.terms, page: "terms" },
              { label: t.footer.privacy, page: "privacy" },
              { label: t.footer.affiliate, page: "terms" },
              { label: t.footer.risk, page: "terms" },
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
            {t.footer.footerText}
          </div>
        </div>
      </footer>
    </div>
  );
}
