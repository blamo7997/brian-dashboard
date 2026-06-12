import { findCustomerByEmail, parseTags, updateCustomerTagsAndNote } from "../../lib/brianco-retired-commerce-platform-customer";

const roleTagMap = {
  founder: "Role: Founder",
  family: "Role: Family",
  girlfriend: "Role: Girlfriend",
  lawyer: "Role: Lawyer",
  investor: "Role: Investor",
  banker: "Role: Banker",
  artisan: "Role: Artisan",
  creator: "Role: Creator",
  influencer: "Role: Influencer",
  customer: "Role: Customer"
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    const email = req.query.email;
    if (!email) return res.status(400).json({ ok: false, message: "Missing email." });

    const customer = await findCustomerByEmail(email);

    if (!customer) {
      return res.status(404).json({
        ok: false,
        found: false,
        message: "Account not found yet. Create a Brian & Co account first.",
        email
      });
    }

    const tags = parseTags(customer.tags);
    const roles = Object.entries(roleTagMap)
      .filter(([role, tag]) => tags.includes(tag))
      .map(([role]) => role);

    return res.status(200).json({
      ok: true,
      found: true,
      email,
      customerId: customer.id,
      firstName: customer.first_name || "",
      lastName: customer.last_name || "",
      tags,
      roles,
      complimentaryAccess: tags.includes("Brian Approved Free Access"),
      founderGreenChecked: tags.includes("Founder Green Checked"),
      digitalProductAccess: tags.includes("Digital Product Access")
    });
  }

  if (req.method === "POST") {
    const founderKey = req.headers["x-brianco-founder-key"] || "";
    if (founderKey !== process.env.BRIANCO_FOUNDER_ACCESS_KEY) {
      return res.status(401).json({ ok: false, message: "Founder approval required." });
    }

    const body = req.body || {};
    const email = body.email;
    const role = body.role || "customer";
    const freeAccess = Boolean(body.freeAccess);
    const digitalProductAccess = Boolean(body.digitalProductAccess);

    if (!email) return res.status(400).json({ ok: false, message: "Missing email." });

    const tags = [
      roleTagMap[role] || "Role: Customer",
      "Founder Green Checked"
    ];

    if (freeAccess) tags.push("Brian Approved Free Access", "Complimentary Access");
    if (digitalProductAccess) tags.push("Digital Product Access");

    const note = `Founder entitlement update:
Role: ${role}
Free access: ${freeAccess}
Digital product access: ${digitalProductAccess}
Updated: ${new Date().toISOString()}
Rule: Native Brian & Co website/chatbot-first entitlement.`;

    const result = await updateCustomerTagsAndNote(email, tags, note);

    return res.status(200).json({
      ok: true,
      message: "Account entitlement processed through Brian's founder gate.",
      result
    });
  }

  return res.status(405).json({ ok: false, message: "Method not allowed." });
}
