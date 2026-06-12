import { localEntitlement } from "../../lib/lumen-local-gates";

export default async function handler(req, res) {
  const entitlement = localEntitlement({
    email: req.query.email || req.body?.email || req.headers["x-brianco-email"],
    role: req.query.role || req.body?.role || "customer",
    tags: req.query.tags || req.body?.tags || req.headers["x-brianco-tags"]
  });

  return res.status(200).json({
    ok: true,
    service: "account-entitlements",
    ...entitlement
  });
}
