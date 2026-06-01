import { findCustomerByEmail, parseTags } from "../../lib/brianco-shopify-customer";

export default async function handler(req, res) {
  const email = String(req.query.email || req.headers["x-brianco-email"] || "").toLowerCase().trim();

  if (!email) {
    return res.status(401).json({
      ok: false,
      allowed: false,
      message: "Sign into your Brian & Co website account first."
    });
  }

  if (email !== "support@briannco.com") {
    return res.status(403).json({
      ok: false,
      allowed: false,
      message: "Founder access is reserved for Brian Lammert."
    });
  }

  const customer = await findCustomerByEmail(email);

  if (!customer) {
    return res.status(404).json({
      ok: false,
      allowed: false,
      message: "Founder account was not found."
    });
  }

  const tags = parseTags(customer.tags);
  const isFounder =
    tags.includes("Brian Founder Only") ||
    tags.includes("Command Center Owner") ||
    tags.includes("Role: Founder");

  if (!isFounder) {
    return res.status(403).json({
      ok: false,
      allowed: false,
      message: "Founder tags are missing."
    });
  }

  return res.status(200).json({
    ok: true,
    allowed: true,
    founderEmail: email,
    customerId: customer.id,
    tags,
    message: "Founder account access confirmed through Brian & Co account."
  });
}
