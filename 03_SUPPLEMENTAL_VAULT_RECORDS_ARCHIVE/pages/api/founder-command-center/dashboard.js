import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const file = path.join(process.cwd(), "data", "founder-command-center.json");
  let data = {};
  try {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    data = { status: "missing" };
  }

  res.status(200).json({
    ok: true,
    route: "founder-command-center",
    generated: new Date().toISOString(),
    data
  });
}
