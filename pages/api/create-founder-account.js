export default async function handler(req, res) {
  try {
    const shop = process.env.SHOPIFY_STORE_DOMAIN;
    const token = process.env.SHOPIFY_ADMIN_API_TOKEN;

    const founderEmail = "support@briannco.com";

    if (!shop || !token) {
      return res.status(500).json({
        ok: false,
        message: "Missing Shopify environment variables."
      });
    }

    const response = await fetch(`https://${shop}/admin/api/2025-04/customers.json`, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customer: {
          first_name: "Brian",
          last_name: "Lammert",
          email: founderEmail,
          verified_email: true,
          tags: "Brian Founder Only, Command Center Owner",
          note: "Founder-only Brian & Co website account for private command center access."
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        message: "Founder account creation failed. If this says access denied, your Shopify OAuth token needs write_customers scope.",
        shopifyErrors: data
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Founder account created for support@briannco.com only.",
      customer: {
        id: data.customer.id,
        email: data.customer.email,
        first_name: data.customer.first_name,
        last_name: data.customer.last_name,
        tags: data.customer.tags
      }
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
}
