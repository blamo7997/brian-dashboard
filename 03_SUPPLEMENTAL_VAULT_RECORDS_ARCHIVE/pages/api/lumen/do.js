import { routeInsideLumenAction } from "../../../lumen-os/packages/inside-lumen/inside-lumen-action-router.mjs";
import { appendUserChat } from "../../../lumen-os/packages/user-memory/user-memory-engine.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const userId = req.headers["x-lumen-user-id"] || req.body?.userId || "anonymous";
  const role = req.body?.role || "user";
  const text = String(req.body?.text || "");

  appendUserChat({
    userId,
    role,
    text,
    source: "inside-lumen-command",
    metadata: { route: "/api/lumen/do" },
    consent: req.body?.consent !== false
  });

  const result = await routeInsideLumenAction({
    text,
    userId,
    role,
    detailRequested: req.body?.detailRequested === true
  });

  return res.status(200).json(result);
}
