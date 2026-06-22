export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=43200');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.COINGECKO_API_KEY;
  const keyParam = apiKey ? `&x_cg_demo_api_key=${apiKey}` : '';

  function formatDate(d) {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }

  const now = new Date();
  const y3Date = new Date(now);
  y3Date.setFullYear(y3Date.getFullYear() - 3);
  const y5Date = new Date(now);
  y5Date.setFullYear(y5Date.getFullYear() - 5);

  try {
    const [maRes, y3Res, y5Res] = await Promise.allSettled([
      fetch(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=cad&days=200${keyParam}`
      ).then(r => r.ok ? r.json() : null),
      fetch(
        `https://api.coingecko.com/api/v3/coins/bitcoin/history?id=bitcoin&date=${formatDate(y3Date)}&localization=false${keyParam}`
      ).then(r => r.ok ? r.json() : null),
      fetch(
        `https://api.coingecko.com/api/v3/coins/bitcoin/history?id=bitcoin&date=${formatDate(y5Date)}&localization=false${keyParam}`
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

    const y3Price = y3Data?.market_data?.current_price?.cad ?? null;
    const y5Price = y5Data?.market_data?.current_price?.cad ?? null;

    return res.status(200).json({
      ma200,
      change_3y: (currentPrice && y3Price) ? ((currentPrice - y3Price) / y3Price) * 100 : null,
      change_5y: (currentPrice && y5Price) ? ((currentPrice - y5Price) / y5Price) * 100 : null,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch chart data' });
  }
}
