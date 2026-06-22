export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.COINGECKO_API_KEY;
  const keyParam = apiKey ? `&x_cg_demo_api_key=${apiKey}` : '';

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=cad&days=1825${keyParam}`
    );
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: 'CoinGecko API error' });
    }

    const prices = data.prices.map(p => p[1]);
    const timestamps = data.prices.map(p => p[0]);
    const currentPrice = prices[prices.length - 1];
    const now = timestamps[timestamps.length - 1];
    const last200 = prices.slice(-200);
    const ma200 = last200.reduce((a, b) => a + b, 0) / last200.length;

    const MS_PER_DAY = 86400000;
    const y3Cutoff = now - 1095 * MS_PER_DAY;
    const y5Cutoff = now - 1825 * MS_PER_DAY;
    let y3Price = null;
    let y5Price = null;
    for (let i = 0; i < timestamps.length; i++) {
      if (y5Price === null && timestamps[i] >= y5Cutoff) y5Price = prices[i];
      if (y3Price === null && timestamps[i] >= y3Cutoff) y3Price = prices[i];
      if (y3Price !== null && y5Price !== null) break;
    }

    return res.status(200).json({
      ma200: Math.round(ma200),
      change_3y: y3Price ? ((currentPrice - y3Price) / y3Price) * 100 : null,
      change_5y: y5Price ? ((currentPrice - y5Price) / y5Price) * 100 : null,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch chart data' });
  }
}
