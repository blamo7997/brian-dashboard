function productCards(products) {
  return products.slice(0, 6).map(product => ({
    title: product.title,
    price: product.price,
    currency: product.currency || "USD",
    image: product.image,
    buttonText: "View item",
    url: product.url,
    available: product.available
  }));
}

async function getProducts(baseUrl) {
  try {
    const response = await fetch(`${baseUrl}/api/products`);
    const data = await response.json();
    return data.products || [];
  } catch {
    return [];
  }
}

export default async function handler(req, res) {
  const message = req.method === "POST" ? req.body?.message : req.query?.message;
  const host = req.headers.host;
  const protocol = host?.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const products = await getProducts(baseUrl);

  return res.status(200).json({
    ok: true,
    continuityMode: true,
    hobbyModeSafe: true,
    source: "brianco-continuity-concierge",
    reply: "Brian & Co Concierge is online. It is ready to support live product recommendations, digital products, subscriptions, accessibility, localization, founder approval routing, and future memory personalization.",
    receivedMessage: message || null,
    productCards: productCards(products),
    nextSteps: [
      "Connect website chatbot frontend to POST /api/concierge",
      "Render product cards with image, title, price, and View item button",
      "Add digital product/subscription routing",
      "Add Supabase memory/personalization after route stability",
      "Add admin approval queue",
      "Keep Vercel Hobby unless real limits require upgrade"
    ]
  });
}
