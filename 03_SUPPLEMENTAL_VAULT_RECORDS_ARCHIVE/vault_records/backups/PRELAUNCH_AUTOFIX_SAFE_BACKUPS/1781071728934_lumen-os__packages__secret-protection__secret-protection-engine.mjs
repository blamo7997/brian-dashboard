import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.resolve("./lumen-os/data/secret-protection");

const SECRET_PATTERNS = [
  { name: "openai-key", regex: /sk-[A-Za-z0-9_\-]{20,}/g },
  { name: "bearer-token", regex: /Bearer\s+[A-Za-z0-9._\-]{20,}/gi },
  { name: "api-key-assignment", regex: /(api[_-]?key\s*[:=]\s*)["']?[^"'\s]{12,}/gi },
  { name: "secret-assignment", regex: /(secret\s*[:=]\s*)["']?[^"'\s]{12,}/gi },
  { name: "password-assignment", regex: /(password\s*[:=]\s*)["']?[^"'\s]{8,}/gi },
  { name: "token-assignment", regex: /(token\s*[:=]\s*)["']?[^"'\s]{12,}/gi },
  { name: "private-key-block", regex: /-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g }
];

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) return results;

  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (/node_modules|\.git|\.next/.test(full)) continue;

    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, results);
    else results.push(full);
  }

  return results;
}

function redact(text = "") {
  let output = String(text || "");
  for (const pattern of SECRET_PATTERNS) {
    output = output.replace(pattern.regex, match => {
      if (/^Bearer/i.test(match)) return "Bearer ********";
      if (match.includes("=")) return match.split("=")[0] + "=********";
      if (match.includes(":")) return match.split(":")[0] + ":********";
      return "********";
    });
  }
  return output;
}

export function scanForSecrets({
  roots = ["./lumen-os", "./pages", "./app", "./src", "./lib", "./components", "./reports", "./backups"],
  reason = "manual"
} = {}) {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = roots.filter(fs.existsSync).flatMap(root => walk(root));
  const findings = [];

  for (const file of files) {
    let text = "";
    try { text = fs.readFileSync(file, "utf8"); } catch { continue; }

    for (const pattern of SECRET_PATTERNS) {
      const matches = [...text.matchAll(pattern.regex)];
      if (matches.length) {
        findings.push({
          file,
          type: pattern.name,
          count: matches.length,
          severity: "critical-review",
          valueShown: false,
          redactedPreview: redact(matches[0][0]).slice(0, 120)
        });
      }
    }
  }

  const report = {
    scanId: `secret_scan_${Date.now()}`,
    generated: new Date().toISOString(),
    reason,
    fileCount: files.length,
    findings,
    status: findings.length ? "guardian-review-required" : "passed",
    rule: "Never expose raw secret values."
  };

  fs.writeFileSync(path.join(OUT_DIR, `${report.scanId}.json`), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, "latest-secret-scan.json"), JSON.stringify(report, null, 2));
  return report;
}

export function redactSensitiveText(text = "") {
  return redact(text);
}
