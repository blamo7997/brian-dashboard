import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("./lumen-os/data/capability-index");

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (/node_modules|\.git|\.next|reports|backups/.test(full)) continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, results);
    else results.push(full);
  }
  return results;
}

export function buildCapabilityIndex() {
  fs.mkdirSync(OUT, { recursive: true });

  const packages = fs.existsSync("./lumen-os/packages")
    ? fs.readdirSync("./lumen-os/packages").filter(x => fs.statSync(path.join("./lumen-os/packages", x)).isDirectory())
    : [];

  const apis = fs.existsSync("./pages/api/lumen")
    ? fs.readdirSync("./pages/api/lumen").filter(x => /\.(js|ts)$/.test(x))
    : [];

  const watchers = fs.existsSync("./lumen-os/windows-launcher")
    ? fs.readdirSync("./lumen-os/windows-launcher").filter(x => /^Start-.*Watcher\.ps1$/i.test(x))
    : [];

  const docs = walk("./lumen-os/docs").filter(x => /\.(md|txt)$/i.test(x));

  const report = {
    generated: new Date().toISOString(),
    packageCount: packages.length,
    apiCount: apis.length,
    watcherCount: watchers.length,
    docCount: docs.length,
    packages,
    apis,
    watchers,
    docs,
    hardRule: "Use this index before adding anything. If capability exists, preserve and patch only missing hooks."
  };

  fs.writeFileSync(path.join(OUT, "latest-capability-index.json"), JSON.stringify(report, null, 2));
  return report;
}
