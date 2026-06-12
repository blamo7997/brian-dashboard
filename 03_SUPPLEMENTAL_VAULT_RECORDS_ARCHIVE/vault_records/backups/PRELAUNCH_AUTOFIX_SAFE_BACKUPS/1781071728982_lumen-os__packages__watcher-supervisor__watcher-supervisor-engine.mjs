import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("./lumen-os/data/watcher-supervisor");

export function inspectWatchers() {
  fs.mkdirSync(OUT, { recursive: true });

  const launcherDir = "./lumen-os/windows-launcher";
  const watchers = fs.existsSync(launcherDir)
    ? fs.readdirSync(launcherDir).filter(x => /^Start-.*Watcher\.ps1$/i.test(x))
    : [];

  const duplicatesByName = watchers
    .map(x => x.toLowerCase())
    .filter((name, index, arr) => arr.indexOf(name) !== index);

  const report = {
    generated: new Date().toISOString(),
    watcherCount: watchers.length,
    watchers,
    duplicateWatcherNames: [...new Set(duplicatesByName)],
    status: duplicatesByName.length ? "review-duplicates" : "healthy",
    rule: "Do not create new watchers if an existing watcher can be extended safely."
  };

  fs.writeFileSync(path.join(OUT, "latest-watcher-supervisor.json"), JSON.stringify(report, null, 2));
  return report;
}
