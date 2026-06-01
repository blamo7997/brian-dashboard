import { getUserState } from "../../lib/brianco-memory.js";

export default async function handler(req, res) {
  const userId = req.query.userId || "guest";
  res.status(200).json({ ok:true, state: getUserState(userId) });
}
