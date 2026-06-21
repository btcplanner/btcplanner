export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.COINGECKO_API_KEY;
  const keyParam = apiKey ? `&x_cg_demo_api_key=${apiKey}` : '';

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false${keyParam}`
    );
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: 'CoinGecko API error' });
    }

    const md = data.market_data;
    return res.status(200).json({
      cad: md.current_price.cad,
      usd: md.current_price.usd,
      change_24h: md.price_change_percentage_24h,
      change_7d: md.price_change_percentage_7d,
      change_30d: md.price_change_percentage_30d,
      change_1y: md.price_change_percentage_1y,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch price data' });
  }
}
