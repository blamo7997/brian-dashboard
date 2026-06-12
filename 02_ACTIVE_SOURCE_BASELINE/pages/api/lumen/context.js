import { gatherLumenContext } from "../../../lumen-os/packages/context-retrieval/context-retrieval-engine.mjs";

export default function handler(req, res) {
  const result = gatherLumenContext({
    userId: req.body?.userId || req.headers["x-lumen-user-id"] || req.query?.userId || "anonymous",
    query: req.body?.query || req.query?.query || "",
    limit: Number(req.body?.limit || req.query?.limit || 20)
  });

  return res.status(200).json({ ok: true, result });
}
