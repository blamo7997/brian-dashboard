import fs from "fs";
import path from "path";

const root = process.cwd();
const recordsDir = path.join(root, "data", "legal-live", "records");
const approvalsDir = path.join(root, "data", "legal-live", "approvals");
const historyDir = path.join(root, "data", "legal-live", "history");

function ensure() {
  for (const d of [recordsDir, approvalsDir, historyDir]) {
    if (!fs.existsSync(/*turbopackIgnore: true*/ d)) fs.mkdirSync(/*turbopackIgnore: true*/ d, { recursive: true });
  }
}

function findFile(dir, id) {
  const file = path.join(dir, `${id}.json`);
  return fs.existsSync(/*turbopackIgnore: true*/ file) ? file : null;
}

export default function handler(req, res) {
  ensure();

  if (req.method !== "POST") return res.status(405).json({ ok:false });

  const now = new Date().toISOString();
  const { recordId, action, note } = req.body || {};
  if (!recordId || !action) return res.status(400).json({ ok:false, error:"recordId and action required" });

  const recordFile = findFile(recordsDir, recordId);
  if (!recordFile) return res.status(404).json({ ok:false, error:"Record not found" });

  const record = JSON.parse(fs.readFileSync(/*turbopackIgnore: true*/ recordFile, "utf8"));

  if (action === "founder_approve") {
    record.founderApproval = true;
    record.status = record.legalApproval ? "approved_for_release" : "pending_legal_review";
  }

  if (action === "legal_approve") {
    record.legalApproval = true;
    record.legalReviewStatus = "legal_review_approved";
    record.status = record.founderApproval ? "approved_for_release" : "pending_founder_review";
  }

  if (action === "reject") {
    record.status = "rejected";
    record.publicReleaseApproved = false;
  }

  if (action === "approve_public_release") {
    if (!record.founderApproval || !record.legalApproval) {
      return res.status(409).json({ ok:false, error:"Founder and legal approval required first." });
    }
    record.publicReleaseApproved = true;
    record.status = "approved_for_release";
  }

  record.updated = now;
  fs.writeFileSync(/*turbopackIgnore: true*/ recordFile, JSON.stringify(record, null, 2));

  const event = {
    id: `history-${Date.now()}`,
    created: now,
    recordId,
    action,
    note: note || "",
    protected: true
  };

  fs.writeFileSync(/*turbopackIgnore: true*/ path.join(historyDir, `${event.id}.json`), JSON.stringify(event, null, 2));

  return res.status(200).json({ ok:true, record, event });
}

