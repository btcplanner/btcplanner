export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=43200');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.COINGECKO_API_KEY;
  const keyParam = apiKey ? `&x_cg_demo_api_key=${apiKey}` : '';

  const now = new Date();
  const y3Ts = Math.floor(new Date(now.getFullYear() - 3, now.getMonth(), now.getDate()).getTime() / 1000);
  const y5Ts = Math.floor(new Date(now.getFullYear() - 5, now.getMonth(), now.getDate()).getTime() / 1000);

  try {
    const [maRes, y3Res, y5Res] = await Promise.allSettled([
      fetch(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=cad&days=200${keyParam}`
      ).then(r => r.ok ? r.json() : null),
      fetch(
        `https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=CAD&ts=${y3Ts}`
      ).then(r => r.ok ? r.json() : null),
      fetch(
        `https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=CAD&ts=${y5Ts}`
      ).then(r => r.ok ? r.json() : null),
    ]);

    const maData = maRes.status === 'fulfilled' ? maRes.value : null;
    const y3Data = y3Res.status === 'fulfilled' ? y3Res.value : null;
    const y5Data = y5Res.status === 'fulfilled' ? y5Res.value : null;

    let ma200 = null;
    let currentPrice = null;
    if (maData?.prices?.length) {
      const prices = maData.prices.map(p => p[1]);
      currentPrice = prices[prices.length - 1];
      const last200 = prices.slice(-200);
      ma200 = Math.round(last200.reduce((a, b) => a + b, 0) / last200.length);
    }

    const y3Price = y3Data?.BTC?.CAD ?? null;
    const y5Price = y5Data?.BTC?.CAD ?? null;

    return res.status(200).json({
      ma200,
      change_3y: (currentPrice && y3Price) ? ((currentPrice - y3Price) / y3Price) * 100 : null,
      change_5y: (currentPrice && y5Price) ? ((currentPrice - y5Price) / y5Price) * 100 : null,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch chart data' });
  }
}
