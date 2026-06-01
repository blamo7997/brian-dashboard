import { saveEvent } from "../../lib/brianco-memory.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok:false, message:"POST required" });
  res.status(200).json({ ok:true, saved: saveEvent(req.body || {}) });
}
