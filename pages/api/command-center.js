export default async function handler(req, res) {
  return res.status(403).json({
    ok: false,
    locked: true,
    message: "Brian & Co Command Center is private and founder-account gated. Public access is disabled.",
    allowedFounderEmail: "support@briannco.com",
    next: "Access must be routed through Brian's approved website-account session, not a public Vercel URL."
  });
}
