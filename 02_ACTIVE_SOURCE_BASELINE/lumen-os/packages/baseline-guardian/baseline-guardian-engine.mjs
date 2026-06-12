import fs from "node:fs";
import path from "node:path";
import { buildCapabilityIndex } from "../capability-index/capability-index-engine.mjs";
import { inspectWatchers } from "../watcher-supervisor/watcher-supervisor-engine.mjs";
import { inspectBuildBudget } from "../build-budget/build-budget-engine.mjs";

const OUT = path.resolve("./lumen-os/data/baseline-guardian");

export function runBaselineGuardian({ reason = "manual" } = {}) {
  fs.mkdirSync(OUT, { recursive: true });

  const capabilityIndex = buildCapabilityIndex();
  const watcherSupervisor = inspectWatchers();
  const buildBudget = inspectBuildBudget();

  const requiredBaseline = [
    "./lumen-os/packages/registry/registry-engine.mjs",
    "./lumen-os/packages/vault/vault-engine.mjs",
    "./lumen-os/packages/user-memory/user-memory-engine.mjs",
    "./lumen-os/packages/guardian/guardian-runtime.mjs",
    "./lumen-os/packages/inside-lumen/inside-lumen-action-router.mjs",
    "./pages/api/lumen/do.js",
    "./pages/lumen/control.js"
  ];

  const missing = requiredBaseline.filter(x => !fs.existsSync(x));

  const report = {
    generated: new Date().toISOString(),
    reason,
    status: missing.length ? "baseline-review-required" : "baseline-preserved",
    missing,
    capabilityIndex,
    watcherSupervisor,
    buildBudget,
    hardRule: {
      onlyChangeNecessary: true,
      noDuplicates: true,
      onlyAdditions: true,
      preserveBaseline: true,
      patchOnlyMissingHooks: true,
      createOnlyMissingFiles: true
    }
  };

  fs.writeFileSync(path.join(OUT, "latest-baseline-guardian.json"), JSON.stringify(report, null, 2));
  return report;
}
