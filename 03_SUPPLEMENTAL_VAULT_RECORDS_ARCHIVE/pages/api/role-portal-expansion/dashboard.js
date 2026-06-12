import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const file = path.join(process.cwd(), "data", "role-portal-expansion.json");
  let data = {};
  try {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    data = { status: "missing" };
  }

  res.status(200).json({
    ok: true,
    route: "role-portal-expansion",
    generated: new Date().toISOString(),
    data
  });
}
