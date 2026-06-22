export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.COINGECKO_API_KEY;
  const keyParam = apiKey ? `&x_cg_demo_api_key=${apiKey}` : '';

  try {
    const [priceRes, chartRes] = await Promise.all([
      fetch(`https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false${keyParam}`),
      fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=cad&days=200${keyParam}`),
    ]);

    const priceData = await priceRes.json();
    const chartData = await chartRes.json();

    if (!priceRes.ok || !chartRes.ok) {
      return res.status(502).json({ error: 'Upstream API error', timestamp: new Date().toISOString() });
    }

    const md = priceData.market_data;
    const prices = chartData.prices.map(p => p[1]);
    const last200 = prices.slice(-200);
    const ma200 = Math.round(last200.reduce((a, b) => a + b, 0) / last200.length);

    const snapshot = {
      timestamp: new Date().toISOString(),
      price: { cad: md.current_price.cad, usd: md.current_price.usd },
      changes: {
        d1: md.price_change_percentage_24h,
        d7: md.price_change_percentage_7d,
        d30: md.price_change_percentage_30d,
        y1: md.price_change_percentage_1y,
      },
      ma200,
    };

    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600');
    return res.status(200).json(snapshot);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to refresh data', timestamp: new Date().toISOString() });
  }
}
