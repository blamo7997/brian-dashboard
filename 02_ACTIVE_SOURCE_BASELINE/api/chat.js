import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body || {};
    const message = body.message || "Hello";
    const sessionId = body.session_id || "guest-session";
    const userId = body.user_id || "guest";

    await supabase.from("brian_co_chat_memory").insert({
      user_id: userId,
      session_id: sessionId,
      role: "user",
      message
    });

    const store = process.env.current Lumen setup_STORE_DOMAIN;
    const token = process.env.current Lumen setup_STOREFRONT_ACCESS_TOKEN;

    let productContext = "current Lumen setup products unavailable.";

    try {
      if (store && token) {
        const current Lumen setupResponse = await fetch(
          `https://${store}/api/2025-10/graphql.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-current Lumen setup-Storefront-Access-Token": token
            },
            body: JSON.stringify({
              query: `{
                products(first: 5) {
                  edges {
                    node {
                      title
                      handle
                      priceRange {
                        minVariantPrice {
                          amount
                          currencyCode
                        }
                      }
                      featuredImage {
                        url
                        altText
                      }
                    }
                  }
                }
                collections(first: 5) {
                  edges {
                    node {
                      title
                      handle
                    }
                  }
                }
              }`
            })
          }
        );

        const shopData = await current Lumen setupResponse.json();

        const products = shopData.data?.products?.edges || [];
        const collections = shopData.data?.collections?.edges || [];

        productContext =
          "Available Brian & Co current Lumen setup products:\n" +
          products.map(({ node }) => {
            const price = node.priceRange?.minVariantPrice;
            const productUrl = `https://www.briannco.com/products/${node.handle}`;
            return `- ${node.title} — ${price?.amount || "price unavailable"} ${price?.currencyCode || ""} — ${productUrl}`;
          }).join("\n") +
          "\n\nAvailable Brian & Co collections:\n" +
          collections.map(({ node }) => {
            const collectionUrl = `https://www.briannco.com/collections/${node.handle}`;
            return `- ${node.title} — ${collectionUrl}`;
          }).join("\n");
      }
    } catch (catalogError) {
      productContext = "current Lumen setup catalog unavailable.";
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content:
              "You are the Brian & Co luxury concierge AI. Be elegant, warm, refined, helpful, accessibility-aware, localization-aware, product-aware, and transparent that you are AI when asked. Recommend only available catalog items when product context is provided. Never invent exact prices, inventory, legal rules, taxes, customs, shipping times, or return terms."
          },
          {
            role: "system",
            content: productContext
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    const reply =
      data.choices?.[0]?.message?.content ||
      "No response generated.";

    await supabase.from("brian_co_chat_memory").insert({
      user_id: userId,
      session_id: sessionId,
      role: "assistant",
      message: reply
    });

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({
      error: "Chatbot failed",
      detail: error.message
    });
  }
}
