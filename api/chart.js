export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=43200');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.COINGECKO_API_KEY;
  const keyParam = apiKey ? `&x_cg_demo_api_key=${apiKey}` : '';

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=cad&days=200${keyParam}`
    );
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: 'CoinGecko API error' });
    }

    const prices = data.prices.map(p => p[1]);
    const last200 = prices.slice(-200);
    const ma200 = Math.round(last200.reduce((a, b) => a + b, 0) / last200.length);

    return res.status(200).json({ ma200 });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch chart data' });
  }
}
