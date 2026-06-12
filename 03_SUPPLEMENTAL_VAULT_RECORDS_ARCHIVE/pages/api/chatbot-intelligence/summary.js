import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const snapshotPath = path.join(process.cwd(), "data", "chatbot-intelligence", "snapshot.json");

  let snapshot;
  try {
    snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
  } catch {
    snapshot = {
      created_at: new Date().toISOString(),
      mode: "snapshot-missing",
      metrics: {},
      intents: [],
      recommendations: [],
      protected: {
        no_product_edits: true,
        no_collection_edits: true,
        no_oauth_changes: true,
        no_payment_changes: true,
        no_secret_printing: true,
        consent_required_for_sensitive_data: true
      }
    };
  }

  res.status(200).json({
    ok: true,
    mode: "chatbot-intelligence-read-only",
    brand: "Brian & Co",
    snapshot,
    visualCards: [
      { title: "Conversations Today", value: snapshot.metrics.conversations_today || "Prepared", trend: [10,18,27,39,52,66,82] },
      { title: "Messages Today", value: snapshot.metrics.messages_today || "Prepared", trend: [12,23,31,45,58,73,89] },
      { title: "Active Conversations", value: snapshot.metrics.active_conversations || "Prepared", trend: [8,17,25,38,51,64,77] },
      { title: "Unanswered Requests", value: snapshot.metrics.unanswered_requests || "Prepared", trend: [35,31,27,22,18,14,10] },
      { title: "Escalations", value: snapshot.metrics.escalations || "Prepared", trend: [20,18,15,13,11,9,7] },
      { title: "Conversion Assistance", value: snapshot.metrics.conversion_assist || "Prepared", trend: [9,19,33,44,59,75,91] }
    ],
    intentPanels: snapshot.intents,
    recommendationPanels: snapshot.recommendations,
    protectedSystems: snapshot.protected
  });
}
