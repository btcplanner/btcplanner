const AB_KEY = "btcplanner_ab_variant";
const AB_RESULTS_KEY = "btcplanner_ab_results";

function getVariant() {
  try {
    const stored = localStorage.getItem(AB_KEY);
    if (stored) return stored;
  } catch {}
  const variant = Math.random() < 0.5 ? "a" : "b";
  try { localStorage.setItem(AB_KEY, variant); } catch {}
  return variant;
}

function trackImpression(testId) {
  try {
    const results = JSON.parse(localStorage.getItem(AB_RESULTS_KEY) || "{}");
    if (!results[testId]) results[testId] = { impressions: 0, variant: getVariant() };
    results[testId].impressions++;
    localStorage.setItem(AB_RESULTS_KEY, JSON.stringify(results));
  } catch {}
}

export const titleVariants = {
  "how-to-buy-bitcoin-in-canada-2026": {
    a: { en: "How to Buy Bitcoin in Canada (2026 Guide)", fr: "Comment acheter du Bitcoin au Canada (Guide 2026)" },
    b: { en: "Buy Bitcoin in Canada: Step-by-Step for Beginners", fr: "Acheter du Bitcoin au Canada : étape par étape pour débutants" },
  },
  "bitcoin-dca-strategy-canada": {
    a: { en: "Dollar Cost Averaging (DCA) Bitcoin in Canada", fr: "L'investissement progressif (DCA) en Bitcoin au Canada" },
    b: { en: "Bitcoin DCA Strategy: How Canadians Auto-Invest in BTC", fr: "Stratégie DCA Bitcoin : investir automatiquement au Canada" },
  },
  "bitcoin-etfs-canada": {
    a: { en: "Bitcoin ETFs in Canada: Complete Guide for 2026", fr: "FNB Bitcoin au Canada : guide complet pour 2026" },
    b: { en: "Best Bitcoin ETFs in Canada — TFSA & RRSP Guide", fr: "Meilleurs FNB Bitcoin au Canada — Guide CELI et REER" },
  },
  "bitcoin-vs-gics-canada": {
    a: { en: "Bitcoin vs. GICs in Canada: Comparing Your Options", fr: "Bitcoin vs CPG au Canada : comparer vos options" },
    b: { en: "Bitcoin or GICs? What Canadian Investors Should Know", fr: "Bitcoin ou CPG ? Ce que les investisseurs canadiens doivent savoir" },
  },
  "clarity-act-bitcoin-canada": {
    a: { en: "The Clarity Act and What It Means for Bitcoin in Canada", fr: "La Loi sur la clarté et ce qu'elle signifie pour le Bitcoin au Canada" },
    b: { en: "Canada's Clarity Act: How New Crypto Rules Affect You", fr: "La Loi sur la clarté du Canada : comment les nouvelles règles crypto vous affectent" },
  },
  "bitcoin-strategic-reserves-stablecoins": {
    a: { en: "Strategic Bitcoin Reserves and the Rise of Stablecoins", fr: "Réserves stratégiques de Bitcoin et l'essor des stablecoins" },
    b: { en: "Why Nations Are Stockpiling Bitcoin — And What It Means for You", fr: "Pourquoi les nations accumulent du Bitcoin — et ce que ça signifie pour vous" },
  },
};

export function getAbTitle(slug, lang) {
  const variants = titleVariants[slug];
  if (!variants) return null;
  const variant = getVariant();
  trackImpression(`title_${slug}`);
  return variants[variant]?.[lang] || null;
}
