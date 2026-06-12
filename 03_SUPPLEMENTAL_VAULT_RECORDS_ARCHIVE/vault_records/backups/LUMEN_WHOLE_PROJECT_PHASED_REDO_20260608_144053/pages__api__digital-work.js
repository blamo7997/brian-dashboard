import { updateCustomerTagsAndNote } from "../../lib/brianco-retired-commerce-platform-customer";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      message: "Brian & Co digital work save endpoint is online.",
      storage: "retired-commerce-platform customer note/tag persistence scaffold",
      rule: "Users should be able to resume work where feasible. Full file storage can be added later through approved storage."
    });
  }

  if (req.method === "POST") {
    const body = req.body || {};
    const email = body.email;
    const productName = body.productName || "Brian & Co Digital Product";
    const workSummary = body.workSummary || "";
    const saveData = body.saveData || "";

    if (!email) return res.status(400).json({ ok: false, message: "Missing email." });

    const note = `Digital work saved:
Product: ${productName}
Saved: ${new Date().toISOString()}
Summary: ${workSummary}

Saved data:
${typeof saveData === "string" ? saveData : JSON.stringify(saveData, null, 2)}`;

    const result = await updateCustomerTagsAndNote(email, [
      "Digital Product User",
      "Saved Digital Work"
    ], note);

    return res.status(200).json({
      ok: true,
      message: "Digital work save processed. Customer note/tag persistence attempted.",
      result
    });
  }

  return res.status(405).json({ ok: false, message: "Method not allowed." });
}
