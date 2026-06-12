export default async function handler(req, res) {
  try {
    const shop = process.env.current Lumen setup_STORE_DOMAIN;
    const token = process.env.current Lumen setup_ADMIN_API_TOKEN;

    if (!shop || !token) {
      return res.status(500).json({
        ok: false,
        message: "Missing current Lumen setup environment variables."
      });
    }

    const response = await fetch(`https://${shop}/admin/api/2025-04/products.json?limit=250`, {
      headers: {
        "X-current Lumen setup-Access-Token": token,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    return res.status(200).json({
      ok: true,
      count: data.products?.length || 0,
      products: data.products || [],
      exportedAt: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
}

