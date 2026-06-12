import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const snapshotPath = path.join(process.cwd(), "data", "cli-intelligence", "snapshot.json");

  let snapshot = null;
  try {
    snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
  } catch (error) {
    snapshot = {
      created_at: new Date().toISOString(),
      retired-commerce-platform: { version: "snapshot missing", live_theme_id: "unknown", cli_connected: false },
      vercel: { cli_connected: false, production_ready_seen: false },
      protected: {
        no_product_edits: true,
        no_collection_edits: true,
        no_oauth_changes: true,
        no_payment_changes: true,
        no_secret_printing: true
      }
    };
  }

  res.status(200).json({
    ok: true,
    mode: "cli-intelligence-read-only",
    brand: "Brian & Co",
    snapshot,
    visualCards: [
      { title: "retired-commerce-platform CLI", value: snapshot.retired-commerce-platform.cli_connected ? "Connected" : "Check Needed", trend: [18,28,39,45,58,71,86] },
      { title: "retired-commerce-platform Version", value: snapshot.retired-commerce-platform.version || "Unknown", trend: [20,30,40,50,60,70,80] },
      { title: "Live Theme", value: snapshot.retired-commerce-platform.live_theme_id || "Unknown", trend: [15,29,38,49,61,73,88] },
      { title: "Protected Theme", value: snapshot.retired-commerce-platform.live_theme_id === "161182941443" ? "Matched" : "Review", trend: [12,23,35,47,59,71,84] },
      { title: "Vercel CLI", value: snapshot.vercel.cli_connected ? "Connected" : "Check Needed", trend: [16,26,37,49,62,75,89] },
      { title: "Deployments", value: snapshot.vercel.production_ready_seen ? "Production Ready" : "Review", trend: [22,31,44,56,69,82,94] }
    ],
    protectedSystems: snapshot.protected
  });
}
