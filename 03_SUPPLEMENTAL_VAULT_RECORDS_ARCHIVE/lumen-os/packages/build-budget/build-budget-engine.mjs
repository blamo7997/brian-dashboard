import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("./lumen-os/data/build-budget");

export function inspectBuildBudget() {
  fs.mkdirSync(OUT, { recursive: true });

  const packageJson = fs.existsSync("./package.json")
    ? JSON.parse(fs.readFileSync("./package.json", "utf8"))
    : {};

  const pageApiCount = fs.existsSync("./pages/api")
    ? fs.readdirSync("./pages/api", { recursive: true }).filter(x => /\.(js|ts)$/.test(String(x))).length
    : 0;

  const pageCount = fs.existsSync("./pages")
    ? fs.readdirSync("./pages", { recursive: true }).filter(x => /\.(js|jsx|ts|tsx)$/.test(String(x))).length
    : 0;

  const report = {
    generated: new Date().toISOString(),
    scripts: packageJson.scripts || {},
    dependencyCount: Object.keys(packageJson.dependencies || {}).length,
    devDependencyCount: Object.keys(packageJson.devDependencies || {}).length,
    pageApiCount,
    pageCount,
    recommendation: "Keep launch fast; run build validation after changes, but do not block normal startup with repeated full builds."
  };

  fs.writeFileSync(path.join(OUT, "latest-build-budget.json"), JSON.stringify(report, null, 2));
  return report;
}
