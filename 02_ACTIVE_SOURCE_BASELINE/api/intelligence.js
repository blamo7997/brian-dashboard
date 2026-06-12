import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("brian_co_digital_products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return res.status(200).json({ products: data });
    }

    if (req.method === "POST") {
      const body = req.body || {};

      const { data, error } = await supabase
        .from("brian_co_digital_products")
        .insert({
          name: body.name,
          category: body.category,
          description: body.description,
          tier: body.tier,
          price: body.price,
          currency: body.currency || "USD",
          features: body.features || [],
          accessibility_features: body.accessibility_features || [],
          localization_features: body.localization_features || [],
          competitor_targets: body.competitor_targets || [],
          status: "draft_pending_founder_review"
        })
        .select();

      if (error) throw error;

      return res.status(200).json({ ok: true, product: data[0] });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({
      error: "Intelligence route failed",
      detail: error.message
    });
  }
}