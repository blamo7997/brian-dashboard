import { buildAdaptiveVoiceProfile } from "../../../lumen-os/packages/adaptive-voice/adaptive-voice-engine.mjs";

export default function handler(req, res) {
  const result = buildAdaptiveVoiceProfile({
    userId: req.body?.userId || req.headers["x-lumen-user-id"] || "anonymous",
    role: req.body?.role || "user",
    text: req.body?.text || "",
    country: req.body?.country || "",
    region: req.body?.region || "",
    locality: req.body?.locality || "",
    explicitPreferences: req.body?.preferences || {}
  });

  return res.status(200).json({ ok: true, result });
}
