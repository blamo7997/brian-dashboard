import fs from "fs";
import path from "path";

const root = process.cwd();
const recordsDir = path.join(root, "data", "legal-live", "records");
const approvalsDir = path.join(root, "data", "legal-live", "approvals");
const historyDir = path.join(root, "data", "legal-live", "history");

function ensure() {
  for (const d of [recordsDir, approvalsDir, historyDir]) {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  }
}

function readAll(dir) {
  ensure();
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".json"))
    .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")))
    .sort((a,b) => String(b.created || "").localeCompare(String(a.created || "")));
}

function safeName(value) {
  return String(value || "record").replace(/[^a-z0-9-_]/gi, "-").toLowerCase();
}

export default function handler(req, res) {
  ensure();

  if (req.method === "GET") {
    return res.status(200).json({
      records: readAll(recordsDir),
      approvals: readAll(approvalsDir),
      history: readAll(historyDir)
    });
  }

  if (req.method === "POST") {
    const now = new Date().toISOString();
    const body = req.body || {};
    const type = body.type || "legal-record";
    const id = `${Date.now()}-${safeName(body.title || type)}`;

    const record = {
      id,
      created: now,
      updated: now,
      type,
      title: body.title || "Untitled Brian & Co legal item",
      status: body.status || "pending_founder_review",
      risk: body.risk || "needs_review",
      owner: "Brian & Co / Brian Lammert",
      protected: true,
      legalReviewStatus: body.legalReviewStatus || "draft_pending_legal_review",
      summary: body.summary || "",
      notes: body.notes || "",
      approvalRequired: true,
      founderApproval: false,
      legalApproval: false,
      publicReleaseApproved: false
    };

    fs.writeFileSync(path.join(recordsDir, `${id}.json`), JSON.stringify(record, null, 2));

    const approval = {
      id: `approval-${id}`,
      recordId: id,
      created: now,
      status: "pending",
      requiredApprovals: ["founder", "legal_if_required"],
      nextStep: "Brian review"
    };

    fs.writeFileSync(path.join(approvalsDir, `${approval.id}.json`), JSON.stringify(approval, null, 2));

    return res.status(201).json({ ok: true, record, approval });
  }

  return res.status(405).json({ ok:false, error:"Method not allowed" });
}
