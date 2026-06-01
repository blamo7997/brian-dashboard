const products = [
  {
    title: "Brian & Co Concierge AI Premium",
    description: "Luxury AI concierge assistant with adaptive recommendations, multilingual support, accessibility intelligence, and premium ecommerce guidance.",
    price: "49.99",
    type: "Digital"
  },
  {
    title: "Brian & Co Creator Studio",
    description: "AI-powered creator toolkit with content generation, luxury branding assistance, captions, product campaigns, and media workflows.",
    price: "99.99",
    type: "Digital"
  },
  {
    title: "Brian & Co CommerceOS Elite",
    description: "Advanced ecommerce intelligence platform with analytics, automation, adaptive UX, and AI-enhanced operational systems.",
    price: "299.99",
    type: "Digital"
  }
];

export default async function handler(req, res) {
  try {
    const shop = process.env.SHOPIFY_STORE_DOMAIN;
    const token = process.env.SHOPIFY_ADMIN_API_TOKEN;

    if (!shop || !token) {
      return res.status(500).json({
        ok: false,
        message: "Missing Shopify environment variables."
      });
    }

    const created = [];

    for (const item of products) {
      const response = await fetch(
        `https://${shop}/admin/api/2025-04/products.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": token
          },
          body: JSON.stringify({
            product: {
              title: item.title,
              body_html: `<p>${item.description}</p>`,
              vendor: "Brian & Co",
              product_type: item.type,
              status: "active",
              variants: [{ price: item.price }]
            }
          })
        }
      );

      const data = await response.json();

      created.push({
        title: item.title,
        response: data
      });
    }

    res.status(200).json({
      ok: true,
      created
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
}
