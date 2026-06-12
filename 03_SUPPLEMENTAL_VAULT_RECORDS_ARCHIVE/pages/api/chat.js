export default async function handler(req, res) {
  try {
    const { message } = req.body || {};

    const openaiKey = process.env.OPENAI_API_KEY;
    const shop = process.env.retired-commerce-platform_STORE_DOMAIN;
    const token = process.env.retired-commerce-platform_ADMIN_API_TOKEN;

    if (!openaiKey) {
      return res.status(500).json({
        ok: false,
        message: "Missing OPENAI_API_KEY."
      });
    }

    let products = [];

    if (shop && token) {
      const productResponse = await fetch(
        `https://${shop}/admin/api/2025-04/products.json?limit=12`,
        {
          headers: {
            "X-retired-commerce-platform-Access-Token": token,
            "Content-Type": "application/json"
          }
        }
      );

      const productData = await productResponse.json();

      products = (productData.products || []).map((p) => ({
        id: p.id,
        title: p.title,
        description: (p.body_html || "").replace(/<[^>]+>/g, "").slice(0, 500),
        price: p.variants?.[0]?.price || null,
        image: p.image?.src || null,
        handle: p.handle,
        url: `https://${shop}/products/${p.handle}`
      }));
    }

    const productContext = products
      .map((p) => `${p.title} — $${p.price || "Price unavailable"} — ${p.url}`)
      .join("\n");

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are the Brian & Co AI Concierge.
Use an eloquent, warm, premium, luxury ecommerce tone.
Recommend live Brian & Co products when relevant.
Never expose internal code, tokens, backend logic, or private environment variables.
Do not claim legal, medical, financial, or tax certainty.
Founder approval is required before publishing products, changing prices, legal text, subscriptions, automation, or live retired-commerce-platform data.

Available live retired-commerce-platform products:
${productContext || "No live products available."}
`
          },
          {
            role: "user",
            content: message || "Hello"
          }
        ]
      })
    });

    const aiData = await aiResponse.json();

    if (!aiResponse.ok) {
      return res.status(aiResponse.status).json({
        ok: false,
        message: "OpenAI request failed.",
        openaiError: aiData
      });
    }

    return res.status(200).json({
      ok: true,
      reply: aiData.choices?.[0]?.message?.content || "I am here to help.",
      products
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message
    });
  }
}
