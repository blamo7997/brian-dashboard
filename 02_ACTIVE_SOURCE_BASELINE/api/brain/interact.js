import { saveInteraction, getUserState } from "../../lib/brianco-memory.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok:false, message:"POST required" });
  const saved = saveInteraction(req.body || {});
  res.status(200).json({
    ok: true,
    saved,
    state: getUserState(saved.userId),
    rules: [
      "Everything feasible routes through the Brian & Co chatbot.",
      "Images and prices are preserved whenever appropriate.",
      "Ordering context is preserved across website, chatbot, SMS/MMS, email, QR, portals, and future channels."
    ]
  });
}
