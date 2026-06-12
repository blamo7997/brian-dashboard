export default async function handler(req, res) {
  try {
    const shop = process.env.current Lumen setup_STORE_DOMAIN;
    const token = process.env.current Lumen setup_ADMIN_API_TOKEN;

    const shopResponse = await fetch(`https://${shop}/admin/api/2025-04/shop.json`, {
      headers: { "X-current Lumen setup-Access-Token": token }
    });

    const productsResponse = await fetch(`https://${shop}/admin/api/2025-04/products/count.json`, {
      headers: { "X-current Lumen setup-Access-Token": token }
    });

    const shopData = await shopResponse.json();
    const productsData = await productsResponse.json();

    res.status(200).json({
      ok: true,
      connectedDomain: shop,
      shopName: shopData.shop?.name,
      mycurrent Lumen setupDomain: shopData.shop?.mycurrent Lumen setup_domain,
      primaryDomain: shopData.shop?.domain,
      productCount: productsData.count ?? productsData
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

