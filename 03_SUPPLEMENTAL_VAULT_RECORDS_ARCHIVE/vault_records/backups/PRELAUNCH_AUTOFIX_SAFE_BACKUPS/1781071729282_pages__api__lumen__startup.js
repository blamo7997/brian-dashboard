import { startupChecklist, loadStartupSession, saveStartupSession } from "../../../lumen-os/packages/startup/startup-session-engine.mjs";

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      startup: startupChecklist(),
      session: loadStartupSession()
    });
  }

  if (req.method === "POST") {
    const session = saveStartupSession({
      userId: req.body?.userId || "founder",
      route: req.body?.route || "/lumen/control",
      mode: req.body?.mode || "founder-startup",
      workspace: req.body?.workspace || "",
      notes: req.body?.notes || ""
    });

    return res.status(200).json({
      ok: true,
      session
    });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ ok: false, error: "Method not allowed." });
}
